import { connect } from "cloudflare:sockets";

export async function onRequestPost(context) {
  const { request, env } = context;

  let socket;
  let writer;
  let reader;

  try {
    // ─────────────────────────────────────────────
    // Read form submission
    // ─────────────────────────────────────────────
    const body = await request.json();

    const firstname = String(body.firstname || "").trim();
    const lastname = String(body.lastname || "").trim();
    const email = String(body.email || "").trim();
    const number = String(body.number || "").trim();
    const message = String(body.message || "").trim();

    // Honeypot spam protection
    if (body.website) {
      return json({ success: true });
    }

    // Validate required fields
    if (
      !firstname ||
      !lastname ||
      !email ||
      !number ||
      !message
    ) {
      return json(
        {
          success: false,
          error: "Please complete all required fields.",
        },
        400
      );
    }

    // Validate field lengths
    if (
      firstname.length > 80 ||
      lastname.length > 80 ||
      email.length > 254 ||
      number.length > 40 ||
      message.length > 5000
    ) {
      return json(
        {
          success: false,
          error: "One or more fields exceed the allowed length.",
        },
        400
      );
    }

    // Validate email address
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return json(
        {
          success: false,
          error: "Please enter a valid email address.",
        },
        400
      );
    }

    // Prevent email header injection
    if (/[\r\n]/.test(email)) {
      return json(
        {
          success: false,
          error: "Invalid email address.",
        },
        400
      );
    }

    // Validate SMTP configuration
    if (
      !env.SMTP_HOST ||
      !env.SMTP_USER ||
      !env.SMTP_PASSWORD
    ) {
      console.error("Missing SMTP environment variables.");

      return json(
        {
          success: false,
          error: "Email service is temporarily unavailable.",
        },
        500
      );
    }

    // ─────────────────────────────────────────────
    // Connect to Venture / Xneelo SMTP
    // ─────────────────────────────────────────────
    socket = connect(
      {
        hostname: env.SMTP_HOST,
        port: 465,
      },
      {
        secureTransport: "on",
      }
    );

    writer = socket.writable.getWriter();
    reader = socket.readable.getReader();

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    async function readResponse() {
      let response = "";

      while (true) {
        const { value, done } = await reader.read();

        if (done) break;

        response += decoder.decode(value, { stream: true });

        const lines = response.split("\r\n").filter(Boolean);
        const lastLine = lines[lines.length - 1];

        if (lastLine && /^\d{3} /.test(lastLine)) {
          break;
        }
      }

      return response;
    }

    async function send(command) {
      await writer.write(
        encoder.encode(command + "\r\n")
      );

      return await readResponse();
    }

    function expect(response, codes) {
      const code = Number(response.slice(0, 3));

      if (!codes.includes(code)) {
        throw new Error(`SMTP error: ${response}`);
      }
    }

    // ─────────────────────────────────────────────
    // SMTP authentication
    // ─────────────────────────────────────────────
    let response = await readResponse();
    expect(response, [220]);

    response = await send("EHLO venturetechnologies.co");
    expect(response, [250]);

    response = await send("AUTH LOGIN");
    expect(response, [334]);

    response = await send(btoa(env.SMTP_USER));
    expect(response, [334]);

    response = await send(btoa(env.SMTP_PASSWORD));
    expect(response, [235]);

    // ─────────────────────────────────────────────
    // Email recipients
    // ─────────────────────────────────────────────

    // Sender: Venture Technologies
    response = await send(
      `MAIL FROM:<${env.SMTP_USER}>`
    );
    expect(response, [250]);

    // Primary recipient: Studio Amberleigh
    response = await send(
      "RCPT TO:<studio.amberleigh@gmail.com>"
    );
    expect(response, [250, 251]);

    // Invisible BCC: Venture Technologies
    response = await send(
      "RCPT TO:<johan@venturetechnologies.co>"
    );
    expect(response, [250, 251]);

    response = await send("DATA");
    expect(response, [354]);

    // ─────────────────────────────────────────────
    // Build email
    // ─────────────────────────────────────────────
    const fullName = `${firstname} ${lastname}`;

    const safeName = cleanHeader(fullName);
    const safeEmail = cleanHeader(email);

    const subject =
      `New Studio Amberleigh Website Enquiry - ${safeName}`;

    const emailBody = [
      `From: Studio Amberleigh Website <${env.SMTP_USER}>`,
      `To: Studio Amberleigh <studio.amberleigh@gmail.com>`,
      `Reply-To: ${safeName} <${safeEmail}>`,
      `Subject: ${subject}`,
      "MIME-Version: 1.0",
      'Content-Type: text/plain; charset="UTF-8"',
      "",

      "NEW STUDIO AMBERLEIGH WEBSITE ENQUIRY",
      "========================================",
      "",

      "CUSTOMER DETAILS",
      "----------------------------------------",
      `First Name: ${firstname}`,
      `Surname: ${lastname}`,
      `Email: ${email}`,
      `Contact Number: ${number}`,
      "",

      "MESSAGE",
      "----------------------------------------",
      message,
      "",

      "========================================",
      "Sent via the Studio Amberleigh website",
      "Email delivery powered by Venture Technologies",
    ].join("\r\n");

    // SMTP dot-stuffing
    const smtpSafeBody = emailBody.replace(/^\./gm, "..");

    await writer.write(
      encoder.encode(smtpSafeBody + "\r\n.\r\n")
    );

    response = await readResponse();
    expect(response, [250]);

    // Close SMTP connection
    await writer.write(
      encoder.encode("QUIT\r\n")
    );

    try {
      await writer.close();
    } catch {
      // SMTP transaction already completed.
    }

    return json({
      success: true,
      message: "Your message has been sent successfully.",
    });

  } catch (error) {
    console.error(
      "STUDIO AMBERLEIGH CONTACT FORM SMTP ERROR:",
      error
    );

    try {
      if (writer) await writer.close();
    } catch {
      // Ignore cleanup errors.
    }

    return json(
      {
        success: false,
        error: "Something went wrong while sending.",
      },
      500
    );
  } finally {
    try {
      if (reader) reader.releaseLock();
    } catch {
      // Ignore cleanup errors.
    }
  }
}

function cleanHeader(value) {
  return String(value)
    .replace(/[\r\n]/g, " ")
    .trim();
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}