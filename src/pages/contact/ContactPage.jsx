import { useLayoutEffect, useRef, useState } from "react";
import "./ContactPage.css";

export function ContactPage() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const submitting = useRef(false);
  const pageRef = useRef(null);
  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page || typeof IntersectionObserver === "undefined") return undefined;
    const elements = [...page.querySelectorAll("[data-contact-reveal]")];
    let firstFrame;
    let secondFrame;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.dataset.contactReveal = "visible";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -20px 0px" });
    const onFocus = (event) => {
      const target = event.target.closest("[data-contact-reveal]");
      if (target) { target.dataset.contactReveal = "visible"; observer.unobserve(target); }
    };
    page.addEventListener("focusin", onFocus);
    const showAll = () => {
      observer.disconnect();
      elements.forEach((element) => { element.dataset.contactReveal = "visible"; });
    };
    elements.forEach((element) => { element.dataset.contactReveal = "pending"; });
    // Give the hidden starting position a paint before observing the new page.
    firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        elements.forEach((element) => observer.observe(element));
      });
    });
    return () => {
      page.removeEventListener("focusin", onFocus);
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      showAll();
    };
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form));
    submitting.current = true;
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "We couldn’t send your message. Please try again.",
        );
      }
      form.reset();
      setStatus("success");
    } catch (failure) {
      setError(
        failure instanceof Error
          ? failure.message
          : "Please try again or contact us directly.",
      );
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  }

  return (
    <main ref={pageRef} id="main" className="sa-contact" tabIndex={-1}>
      <section className="sa-contact-layout" aria-labelledby="contact-title">
        <div className="sa-contact-intro">
          <p data-contact-reveal className="sa-contact-eyebrow">
            A little hello. A world of possibility.
          </p>
          <h1 data-contact-reveal id="contact-title">
            Your next chapter
            <br />
            <em>starts here.</em>
          </h1>
          <p data-contact-reveal className="sa-contact-lead">
            A first lesson. A new ambition. A voice waiting to be heard.
          </p>
          <p data-contact-reveal className="sa-contact-description">
            Whether you’re interested in singing, piano or performing arts, we’d
            love to hear from you. Tell us a little about yourself and what
            you’d like to explore.
          </p>
          <div className="sa-contact-details">
            <div>
              <h2 data-contact-reveal>Let’s talk</h2>
              <a href="tel:+27767768331">+27 76 776 8331</a>
              <a href="mailto:studio.amberleigh@gmail.com">
                studio.amberleigh@gmail.com
              </a>
              <a
                className="sa-contact-text-link"
                href="https://wa.me/27767768331"
                target="_blank"
                rel="noopener noreferrer"
              >
                Say hello on WhatsApp <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div>
              <h2 data-contact-reveal>Find us in Hillcrest</h2>
              <address data-contact-reveal>
                Strangeways Office Park
                <br />6 Delamore Road, Hillcrest
                <br />
                KwaZulu-Natal
              </address>
              <a
                className="sa-contact-text-link"
                href="https://www.google.com/maps/search/?api=1&query=Strangeways+Office+Park+6+Delamore+Road+Hillcrest"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <p data-contact-reveal className="sa-contact-signoff">
            A space for your voice. A place for your potential.
          </p>
        </div>

        <div className="sa-contact-form-panel">
          <p data-contact-reveal className="sa-contact-eyebrow">Let’s begin</p>
          <h2 data-contact-reveal>
            Get in contact <em>with us.</em>
          </h2>
          <p data-contact-reveal className="sa-contact-form-note">All fields are required.</p>
          <form
            onSubmit={handleSubmit}
            className="sa-contact-form"
            aria-busy={status === "sending"}
          >
            <div data-contact-reveal className="sa-contact-field">
              <label htmlFor="contact-firstname">First name</label>
              <input
                id="contact-firstname"
                name="firstname"
                autoComplete="given-name"
                maxLength={80}
                required
              />
            </div>
            <div data-contact-reveal className="sa-contact-field">
              <label htmlFor="contact-lastname">Surname</label>
              <input
                id="contact-lastname"
                name="lastname"
                autoComplete="family-name"
                maxLength={80}
                required
              />
            </div>
            <div data-contact-reveal className="sa-contact-field">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                required
              />
            </div>
            <div data-contact-reveal className="sa-contact-field">
              <label htmlFor="contact-number">Number</label>
              <input
                id="contact-number"
                name="number"
                type="tel"
                autoComplete="tel"
                maxLength={40}
                required
              />
            </div>
            <div data-contact-reveal className="sa-contact-field sa-contact-field-wide">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                maxLength={5000}
                placeholder="Tell us what you have in mind…"
                required
              />
            </div>
            <div className="sa-contact-trap" aria-hidden="true">
              <label htmlFor="contact-website">Leave this field empty</label>
              <input
                id="contact-website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <div data-contact-reveal className="sa-contact-submit-row">
              <span>Your next step, in your own words.</span>
              <button type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send your message"}
                <span aria-hidden="true">↗</span>
              </button>
            </div>
            <div
              className="sa-contact-status"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              {status === "success" && (
                <p>
                  Thank you for saying hello. Your message has been sent — we
                  look forward to connecting with you.
                </p>
              )}
              {status === "error" && (
                <p className="sa-contact-error">
                  {error} You can also reach us by phone or WhatsApp.
                </p>
              )}
            </div>
          </form>
        </div>
      </section>
      <div data-contact-reveal className="sa-contact-endnote" aria-hidden="true">
        <span>Singing</span>
        <i>✧</i>
        <span>Piano</span>
        <i>✧</i>
        <span>Performing arts</span>
      </div>
    </main>
  );
}
