import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import studioLogo from "../assets/studio-amberleigh.png";
import "./Header.css";

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Gallery", "/gallery"],
  ["Contact", "/contact"],
];

export function Header() {
  const { pathname } = useLocation();
  const [openPath, setOpenPath] = useState(null);
  const [scrolled, setScrolled] = useState(
    () => typeof window !== "undefined" && window.scrollY > 16,
  );
  const headerRef = useRef(null);
  const toggleRef = useRef(null);
  const menuOpen = openPath === pathname;
  const closeMenu = () => setOpenPath(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpenPath(null);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (event) => {
      if (!headerRef.current?.contains(event.target)) setOpenPath(null);
    };
    const onResize = () => {
      if (window.innerWidth > 800) setOpenPath(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const navigation = (mobile = false) =>
    links.map(([label, to]) => (
      <NavLink
        key={to}
        to={to}
        end={to === "/"}
        className={({ isActive }) =>
          `sa-header__link${isActive ? " is-active" : ""}`
        }
        onClick={closeMenu}
      >
        <span>{label}</span>
        {mobile && (
          <span className="sa-header__link-detail" aria-hidden="true">
            ✧
          </span>
        )}
      </NavLink>
    ));

  return (
    <div className="sa-header-shell">
      <header
        ref={headerRef}
        className={`sa-header${scrolled ? " is-scrolled" : ""}${menuOpen ? " is-menu-open" : ""}`}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) closeMenu();
        }}
      >
        <a className="sa-header__skip" href="#main">
          Skip to content
        </a>
        <div className="sa-header__inner">
          <Link
            className="sa-header__brand"
            to="/"
            aria-label="Studio Amberleigh home"
            onClick={closeMenu}
          >
            <span className="sa-header__mark" aria-hidden="true">
              <img src={studioLogo} alt="" />
            </span>
            <span className="sa-header__wordmark">
              STUDIO AMBERLEIGH<small>PERFORMING ARTS</small>
            </span>
          </Link>
          <nav className="sa-header__desktop" aria-label="Main navigation">
            {navigation()}
          </nav>
          <Link className="sa-header__cta" to="/contact">
            Let’s begin
          </Link>
          <button
            ref={toggleRef}
            className="sa-header__toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="sa-mobile-navigation"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            onClick={() =>
              setOpenPath((current) => (current === pathname ? null : pathname))
            }
          >
            <span>{menuOpen ? "Close" : "Menu"}</span>
            <span className="sa-header__toggle-lines" aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>
        <div
          id="sa-mobile-navigation"
          className="sa-header__mobile"
          hidden={!menuOpen}
        >
          <nav aria-label="Mobile navigation">{navigation(true)}</nav>
          <div className="sa-header__mobile-bottom">
            <span>A space for your potential.</span>
            <Link to="/contact" onClick={closeMenu}>
              Let’s begin
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
export default Header;
