import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./GalleryPage.css";

// Add the 24 photos as 1.webp through 24.webp in src/assets/gallery/.
// Vite discovers the files here, so missing images do not create broken tiles.
const imageFiles = import.meta.glob("../../assets/gallery/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
});
const photos = Object.entries(imageFiles)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, src]) => ({
    src,
    id: path,
    alt: "A moment from Studio Amberleigh’s performances and studio life",
  }));

function Arrow({ direction = "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={direction === "left" ? { transform: "rotate(180deg)" } : undefined}
    >
      <path d="M4 12h16m-6-6 6 6-6 6" />
    </svg>
  );
}

export function GalleryPage() {
  const [active, setActive] = useState(null);
  const pageRef = useRef(null);
  const dialogRef = useRef(null);
  const openerRef = useRef(null);
  const touchStart = useRef(null);
  const isOpen = active !== null;
  const close = () => setActive(null);
  const previous = () =>
    setActive((index) => (index - 1 + photos.length) % photos.length);
  const next = () => setActive((index) => (index + 1) % photos.length);

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page || typeof IntersectionObserver === "undefined") return undefined;
    const elements = [...page.querySelectorAll("[data-gallery-reveal]")];
    let firstFrame;
    let secondFrame;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.dataset.galleryReveal = "visible";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -20px 0px" });
    const showAll = () => {
      observer.disconnect();
      elements.forEach((element) => { element.dataset.galleryReveal = "visible"; });
    };
    elements.forEach((element) => { element.dataset.galleryReveal = "pending"; });
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

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    if (!isOpen) {
      if (dialog.open) dialog.close();
      return undefined;
    }
    openerRef.current = document.activeElement;
    dialog.showModal();
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = oldOverflow;
      openerRef.current?.focus();
    };
  }, [isOpen]);

  return (
    <main id="main" className="sa-gallery" ref={pageRef} tabIndex={-1}>
      <section className="sa-gallery-intro" aria-labelledby="gallery-title">
        <div>
          <p data-gallery-reveal className="sa-gallery-eyebrow">LIFE AT STUDIO AMBERLEIGH</p>
          <h1 data-gallery-reveal id="gallery-title">
            Small beginnings.
            <br />
            <em>Unforgettable moments.</em>
          </h1>
        </div>
        <div className="sa-gallery-intro-copy">
          <span className="sa-gallery-spark" aria-hidden="true">
            ✧
          </span>
          <p data-gallery-reveal>
            The courage to step forward. The joy of finding your voice. A
            glimpse into the moments we share, on stage and along the way.
          </p>
          <a href="#gallery-collection" className="sa-gallery-underlink">
            Step into our world<span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <section
        id="gallery-collection"
        className="sa-gallery-collection"
        aria-label="Studio photo gallery"
      >
        <div className="sa-gallery-collection-top">
          <p data-gallery-reveal className="sa-gallery-eyebrow">OUR MOMENTS, TOGETHER</p>
          <span>Take a closer look</span>
        </div>
        {photos.length > 0 ? (
          <div className="sa-gallery-grid">
            {photos.map((photo, index) => (
              <figure
                className="sa-gallery-tile"
                key={photo.id}
                data-gallery-reveal
              >
                <button
                  className="sa-gallery-photo-button"
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Open photo ${index + 1}`}
                  aria-haspopup="dialog"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading={index < 3 ? "eager" : "lazy"}
                    decoding="async"
                  />
                  <span className="sa-gallery-open" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
              </figure>
            ))}
          </div>
        ) : (
          <p data-gallery-reveal className="sa-gallery-empty">Our gallery is coming soon.</p>
        )}
        <p data-gallery-reveal className="sa-gallery-endnote">
          Every voice has a story. These are a few of ours.
        </p>
      </section>

      <section
        className="sa-gallery-invite"
        aria-labelledby="gallery-invite-title"
      >
        <div>
          <p data-gallery-reveal className="sa-gallery-eyebrow">YOUR MOMENT IS WAITING</p>
          <h2 data-gallery-reveal id="gallery-invite-title">
            Picture yourself
            <br />
            <em>here.</em>
          </h2>
          <p data-gallery-reveal>Let’s find the right place for you to begin.</p>
          <Link to="/contact" className="sa-gallery-cta">
            Find your voice
            <Arrow />
          </Link>
        </div>
      </section>

      <dialog
        className="sa-gallery-dialog"
        ref={dialogRef}
        aria-label="Enlarged gallery photo"
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            previous();
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            next();
          }
        }}
      >
        {isOpen && (
          <div className="sa-gallery-viewer">
            <button
              type="button"
              className="sa-gallery-close"
              autoFocus
              onClick={close}
              aria-label="Close photo"
            >
              <span>Close</span>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
            <div
              className="sa-gallery-viewer-photo"
              onTouchStart={(event) => {
                touchStart.current = event.changedTouches[0].clientX;
              }}
              onTouchEnd={(event) => {
                if (touchStart.current === null) return;
                const distance =
                  event.changedTouches[0].clientX - touchStart.current;
                if (Math.abs(distance) > 50) {
                  if (distance > 0) previous();
                  else next();
                }
                touchStart.current = null;
              }}
            >
              <img
                key={photos[active].id}
                src={photos[active].src}
                alt={photos[active].alt}
              />
            </div>
            <div className="sa-gallery-viewer-controls">
              <button
                type="button"
                onClick={previous}
                aria-label="Previous photo"
              >
                <Arrow direction="left" />
                <span>Previous</span>
              </button>
              <p aria-live="polite" className="sa-gallery-viewer-caption">
                Moments at Studio Amberleigh
              </p>
              <button type="button" onClick={next} aria-label="Next photo">
                <span>Next</span>
                <Arrow />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </main>
  );
}
export default GalleryPage;
