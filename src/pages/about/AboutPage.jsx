import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import directorPortrait from "../../assets/director.webp";
import microphonePortrait from "../../assets/image 3.webp";
import studioNotebook from "../../assets/gallery/25.webp";
import musicBackdrop from "../../assets/background.webp";
import "./AboutPage.css";

export function AboutPage() {
  const pageRef = useRef(null);
  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page || typeof IntersectionObserver === "undefined") return undefined;
    const elements = [...page.querySelectorAll("[data-about-reveal]")];
    let firstFrame;
    let secondFrame;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.dataset.aboutReveal = "visible";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -20px 0px" });
    const showAll = () => {
      observer.disconnect();
      elements.forEach((element) => { element.dataset.aboutReveal = "visible"; });
    };
    elements.forEach((element) => { element.dataset.aboutReveal = "pending"; });
    // Give the hidden starting position a paint before observing the new page.
    firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        elements.forEach((element) => observer.observe(element));
      });
    });
    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      showAll();
    };
  }, []);

  return (
    <main id="main" className="sa-about" ref={pageRef} tabIndex={-1}>
      <section className="sa-about-hero" aria-labelledby="about-title">
        <div className="sa-about-hero-inner">
          <div className="sa-about-hero-copy">
            <p data-about-reveal className="sa-about-eyebrow">MEET OUR DIRECTOR</p>
            <h1 data-about-reveal id="about-title">The person behind<br /><em>the possibility.</em></h1>
            <div className="sa-about-name" data-about-reveal><span>Amber</span><span>DIRECTOR &amp; COACH</span></div>
            <p data-about-reveal className="sa-about-lead">A deep passion for the Performing Arts.<br />A strong commitment to education.</p>
            <p data-about-reveal>Meet Amber, the Director of our Internationally Recognised Performing Arts Studio and the driving force behind its vision, values, and artistic excellence. Amber has dedicated her career to creating meaningful, inspiring experiences for performers of all ages and abilities.</p>
            <a data-about-reveal className="sa-about-text-link" href="#ambers-experience">Discover her story<svg viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M12 4v16m-6-6 6 6 6-6" /></svg></a>
          </div>
          <figure data-about-reveal className="sa-about-portrait">
            <div className="sa-about-portrait-frame"><img src={directorPortrait} alt="Amber, Director and Coach at Studio Amberleigh" width="854" height="1280" decoding="async" fetchPriority="high" /></div>
            <figcaption>Passion for the stage. Care for every performer.</figcaption>
          </figure>
        </div>
      </section>

      <section id="ambers-experience" className="sa-about-experience" aria-labelledby="experience-title">
        <div className="sa-about-container sa-about-story-layout sa-about-story-experience">
          <figure data-about-reveal className="sa-about-detail-photo sa-about-microphone-photo">
              <div className="sa-about-detail-frame"><img src={microphonePortrait} alt="Amber holding a microphone towards the camera" width="854" height="1280" loading="lazy" decoding="async" /></div>
              <figcaption>A passion worth sharing.</figcaption>
            </figure>
          <div className="sa-about-story-copy">
            <p data-about-reveal className="sa-about-eyebrow">EXPERIENCE THAT INSPIRES</p>
            <h2 data-about-reveal id="experience-title">On the world stage.<br /><em>Here for your journey.</em></h2>
            <div className="sa-about-prose">
            <p data-about-reveal>Amber brings an exceptional wealth of experience to the world of elite performance, having competed and coached at the highest levels on both national and international stages. Her distinguished career includes participation in the prestigious Olympic Championships, achievement at the highest levels of professional examinations, and involvement in esteemed judging panels. With extensive experience coaching elite performers at the highest regional and national levels, Amber has established herself as a respected figure in her field, demonstrating an unwavering commitment to excellence, technical mastery, and the development of exceptional talent.
</p>
            <p data-about-reveal>Her career reflects exceptional achievement not only on stage, but also in leadership roles, having coached Team South Africa internationally, including prestigious performances and competitions in Hollywood.</p>
          </div>
          </div>
        </div>
      </section>

      <section className="sa-about-approach sa-about-container" aria-labelledby="approach-title">
        <div className="sa-about-section-heading"><p data-about-reveal className="sa-about-eyebrow">THE FOUNDATION BEHIND THE ART</p><h2 data-about-reveal id="approach-title">Expertise with purpose.<br /><em>Guidance with care.</em></h2></div>
        <div className="sa-about-approach-grid">
          <article className="sa-about-prose">
            <h3 data-about-reveal>Learn with the best<br /><em>Become the best.</em></h3>
            <p data-about-reveal>In addition to her competitive and coaching success, Amber holds advanced, top-tier qualifications and accreditations within the Performing Arts and Performance Coaching industry.</p>
            <p data-about-reveal>She is highly skilled in performance technique, choreography, athlete and performer development, and competition preparation at an elite level.</p>
          </article>
          <article className="sa-about-prose">
            <h3 data-about-reveal>Strong foundations.<br /><em>Individual potential.</em></h3>
            <p data-about-reveal>As Director, Amber oversees all artistic, technical, and educational programming within the Studio. Her leadership is grounded in discipline, integrity and balanced with mentorship and genuine care for each student’s growth.</p>
            <p data-about-reveal>She is known for her ability to identify potential, build strong foundations, and guide performers toward excellence whether their goals are recreational, competitive, or professional.</p>
          </article>
        </div>
      </section>

      <section className="sa-about-philosophy" aria-labelledby="philosophy-title">
        <div className="sa-about-container sa-about-story-layout sa-about-story-philosophy">
          <div className="sa-about-story-copy">
            <p data-about-reveal className="sa-about-eyebrow">MORE THAN PERFORMANCE</p>
            <h2 data-about-reveal id="philosophy-title">Growing as a performer.<br /><em>Growing as yourself.</em></h2>
            <p data-about-reveal className="sa-about-values">Confidence · Resilience · Creativity<br />Teamwork · Personal growth</p>
            <div className="sa-about-prose">
            <p data-about-reveal>Amber believes deeply in the transformative power of the Performing Arts. Her teaching philosophy emphasizes confidence, resilience, creativity, teamwork, and personal growth, ensuring students develop both exceptional performance skills and strong character.</p>
            <p data-about-reveal>She is passionate about creating a supportive, inclusive environment where performers are challenged, inspired, and empowered to succeed.</p>
            <p data-about-reveal>Under Amber’s direction, the Studio has grown into a respected, high-standard training environment and a thriving artistic community. Her international experience, elite qualifications, and unwavering dedication continue to shape a Studio culture defined by excellence, opportunity, and a lifelong love for the Performing Arts.</p>
          </div>
          </div>
          <figure data-about-reveal className="sa-about-detail-photo sa-about-notebook-photo">
            <div className="sa-about-detail-frame"><img src={studioNotebook} alt="Hands holding an open notebook beside a laptop at the studio" width="854" height="1280" loading="lazy" decoding="async" /></div>
            <figcaption>Care in the details. Purpose in every lesson.</figcaption>
          </figure>
        </div>
      </section>

      <section className="sa-about-invitation" aria-labelledby="about-invitation-title" style={{ "--about-music-backdrop": `url("${musicBackdrop}")` }}>
        <div><p data-about-reveal className="sa-about-eyebrow">THERE’S ROOM FOR YOU HERE</p><h2 data-about-reveal id="about-invitation-title">Your story.<br /><em>Your next chapter.</em></h2><p data-about-reveal>Let’s find the right place for you to begin.</p><Link data-about-reveal className="sa-about-button" to="/contact">Meet your potential<svg viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M4 12h16m-6-6 6 6-6 6" /></svg></Link></div>
      </section>
    </main>
  );
}
export default AboutPage;
