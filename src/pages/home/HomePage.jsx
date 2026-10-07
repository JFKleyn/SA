import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import studioLogo from "../../assets/studio-amberleigh.png";
import studioPerformance from "../../assets/4.webp";
import singingPhoto from "../../assets/7.webp";
import pianoPhoto from "../../assets/5.webp";
import performancePhoto from "../../assets/15.webp";
import stageCommunity from "../../assets/stage-community.png";

export function HomePage() {
  const introductionRef = useRef(null);
  useEffect(() => {
    const section = introductionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const elements = section.querySelectorAll("[data-intro-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.dataset.introReveal = "visible";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -20px 0px" });
    elements.forEach((element) => {
      element.dataset.introReveal = "pending";
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
      elements.forEach((element) => { element.dataset.introReveal = "visible"; });
    };
  }, []);
  return (
    <main ref={introductionRef} id="main" className="sa-site" tabIndex={-1}>
      <section className="sa-stage" aria-labelledby="hero-title">
        <div className="sa-stage-glow" aria-hidden="true" />
        <div className="sa-stage-top">
          <span>STUDIO AMBERLEIGH</span>
          <span>HILLCREST · KWAZULU-NATAL</span>
        </div>
        <div className="sa-stage-layout">
          <div className="sa-stage-copy">
            <p className="sa-stage-eyebrow">A SPACE FOR YOUR POTENTIAL</p>
            <h1 id="hero-title">
              <span className="sa-title-line">
                <span>Your voice.</span>
              </span>
              <span className="sa-title-line sa-title-italic">
                <span>
                  Your <em>moment.</em>
                </span>
              </span>
            </h1>
            <div className="sa-stage-description">
              <span className="sa-description-rule" aria-hidden="true" />
              <p>
                Discover what’s possible when you find your voice. Personalised
                singing, piano and performing arts training, with the confidence
                to make it your own.
              </p>
            </div>
            <div className="sa-stage-actions">
              <Link className="sa-stage-button" to="/contact">
                Find your place
              </Link>
              <a className="sa-stage-link" href="#disciplines">
                Explore the studio
              </a>
            </div>
          </div>
          <div className="sa-stage-visual">
            <div className="sa-stage-arch">
              <div
                className="sa-stage-logo"
                role="img"
                aria-label="Studio Amberleigh A logo"
              >
                <img src={studioLogo} alt="" />
              </div>
              <span className="sa-arch-caption">
                THE ART OF
                <br />
                <em>becoming.</em>
              </span>
            </div>
            <div className="sa-stage-seal">
              <span>FIND YOUR VOICE</span>
              <b aria-hidden="true">✧</b>
              <span>OWN YOUR STAGE</span>
            </div>
            <span className="sa-visual-note">
              A little courage. Endless possibility.
            </span>
          </div>
        </div>
        <div className="sa-stage-bottom">
          <p>
            Singing <span aria-hidden="true">·</span> Piano{" "}
            <span aria-hidden="true">·</span> Acting
          </p>
          <a href="#studio-introduction" className="sa-stage-scroll">
            <span className="sa-scroll-line" aria-hidden="true" />
            Step inside
          </a>
          <span className="sa-stage-bottom-note">Where expression begins.</span>
        </div>
      </section>
      <section id="studio-introduction" className="sa-introduction" aria-labelledby="studio-introduction-title">
        <div className="sa-introduction-inner">
          <figure className="sa-introduction-photo" data-intro-reveal>
            <div className="sa-introduction-photo-frame">
              <img src={studioPerformance} alt="An adult and a young performer singing together on stage" width="1280" height="1920" loading="lazy" decoding="async" />
            </div>
            <figcaption>Growing together. One performance at a time.</figcaption>
          </figure>
          <div className="sa-introduction-content">
            <div className="sa-introduction-heading" data-intro-reveal>
              <p className="sa-eyebrow">WELCOME TO STUDIO AMBERLEIGH</p>
              <h2 id="studio-introduction-title">A little courage.<br />A lot of <em>possibility.</em></h2>
            </div>
            <div className="sa-introduction-copy" data-intro-reveal>
              <p className="sa-introduction-lead">A place to find your voice.<br />And the confidence to use it.</p>
              <p>From your first lesson to your next moment on stage, we’re here to help you grow. Our personalised singing, piano and performing arts training brings technique and creativity together in a welcoming, supportive space.</p>
              <p>Whatever your age or experience, there’s room for you to explore, express yourself and discover what’s possible.</p>
              <Link className="sa-introduction-link" to="/about">Get to know the studio<span aria-hidden="true">✧</span></Link>
            </div>
          </div>
        </div>
      </section>
      <section id="disciplines" className="sa-disciplines" aria-labelledby="disciplines-title">
        <div className="sa-disciplines-inner">
          <div className="sa-disciplines-heading" data-intro-reveal>
            <p className="sa-eyebrow">FIND YOUR EXPRESSION</p>
            <h2 id="disciplines-title">Three paths.<br /><em>One creative home.</em></h2>
            <p className="sa-disciplines-intro">Individual attention. Strong foundations.<br />Room to be yourself.</p>
          </div>
          <div className="sa-disciplines-layout">
            <article className="sa-singing-feature" data-intro-reveal aria-labelledby="singing-title">
              <div className="sa-discipline-image sa-singing-image"><img src={singingPhoto} alt="A young singer performing with a microphone under colourful stage lighting" width="719" height="1280" loading="lazy" decoding="async" /></div>
              <div className="sa-singing-content">
                <p className="sa-eyebrow">AT THE HEART OF OUR STUDIO</p>
                <h3 id="singing-title">Singing &amp;<br /><em>vocal coaching</em></h3>
                <p>Find the potential in your voice. Explore your favourite genres, build your technique and grow into a confident performer.</p>
                <Link className="sa-discipline-link" to="/contact">Enquire about singing<span aria-hidden="true">✧</span></Link>
                <p className="sa-singing-signoff">Your voice.<br /><em>Your own way.</em></p>
              </div>
            </article>
            <div className="sa-discipline-companions">
              <article className="sa-discipline-row" data-intro-reveal aria-labelledby="piano-title">
                <div className="sa-discipline-image"><img src={pianoPhoto} alt="A piano student practising at the keyboard with a teacher" width="1373" height="2048" loading="lazy" decoding="async" /></div>
                <div className="sa-discipline-row-copy"><p className="sa-eyebrow">FIND YOUR RHYTHM</p><h3 id="piano-title">Piano</h3><p>Build musical foundations and discover the joy of making music, one lesson at a time.</p><Link className="sa-discipline-link" to="/contact">Enquire about piano<span aria-hidden="true">✧</span></Link></div>
              </article>
              <article className="sa-discipline-row" data-intro-reveal aria-labelledby="performance-title">
                <div className="sa-discipline-image"><img src={performancePhoto} alt="A young performer using expressive gestures while holding a microphone on stage" width="1375" height="2048" loading="lazy" decoding="async" /></div>
                <div className="sa-discipline-row-copy"><p className="sa-eyebrow">MAKE THE STAGE YOUR OWN</p><h3 id="performance-title">Acting &amp;<br /><em>performance</em></h3><p>Explore character, storytelling and stage presence. Learn to express yourself with confidence.</p><Link className="sa-discipline-link" to="/contact">Explore performing arts<span aria-hidden="true">✧</span></Link></div>
              </article>
            </div>
          </div>
        </div>
      </section>
      <section className="sa-beyond" aria-labelledby="beyond-title">
        <div className="sa-beyond-inner">
          <div className="sa-beyond-copy" data-intro-reveal>
            <p className="sa-eyebrow">BEYOND THE LESSON</p>
            <h2 id="beyond-title">From the practice room<br />to your <em>moment on stage.</em></h2>
            <p className="sa-beyond-intro">Put your learning into practice. From preparing for an exam to sharing the stage, discover what it feels like to bring your creativity to life.</p>
            <ul className="sa-beyond-highlights" aria-label="Beyond the lesson opportunities">
              <li>Vocal exams</li>
              <li>Competitions</li>
              <li>Live performances</li>
            </ul>
            <Link className="sa-beyond-gallery" to="/gallery">View the gallery<svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M5 19 19 5M5 5h14v14" /></svg></Link>
          </div>
          <figure className="sa-beyond-story" data-intro-reveal>
            <div className="sa-beyond-photo">
              <img src={stageCommunity} alt="Four young performers sharing the stage in cowboy-inspired costumes" width="1920" height="1280" loading="lazy" decoding="async" />
            </div>
            <figcaption>Shared stages. Lasting memories.</figcaption>
          </figure>
        </div>
      </section>
      <section className="sa-invite" aria-labelledby="invite-title">
        <span className="sa-invite-monogram" aria-hidden="true">A</span>
        <div className="sa-invite-content" data-intro-reveal>
          <p className="sa-eyebrow">YOUR FIRST STEP</p>
          <h2 id="invite-title">There’s a performer<br /><em>in you.</em></h2>
          <p className="sa-invite-description">Let’s find the right place for you to begin.</p>
          <Link className="sa-invite-button" to="/contact">
            Let’s find your voice
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M4 12h16m-6-6 6 6-6 6" /></svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
export default HomePage;
