import { Link } from "react-router-dom";
import studioLogo from "../assets/studio-amberleigh.png";
import "./Footer.css";

const links = [["Home", "/"], ["About", "/about"], ["Gallery", "/gallery"], ["Contact", "/contact"]];
// Replace the Facebook search link with the studio's exact page URL when available.
const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/studio_amberleigh/", icon: "instagram" },
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=100072429099800", icon: "facebook" },
  { name: "WhatsApp", href: "https://wa.me/27767768331", icon: "whatsapp" },
];

function SocialIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
      {name === "instagram" && <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></>}
      {name === "facebook" && <path d="M14 21v-8h3l.5-4H14V7c0-1.2.5-2 2-2h2V2.5c-.7-.2-1.7-.3-2.7-.3C12 2.2 10 4.1 10 7v2H7v4h3v8" />}
      {name === "whatsapp" && <><path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.4-4.7a8.5 8.5 0 1 1 16.1-4.2Z" /><path d="M8 7.5c-.8.3-1 1.1-.7 2.1.7 2.4 2.8 4.5 5.2 5.3 1.3.5 2.3.1 2.9-.7l.2-.8-2.4-1.2-.9 1c-1.2-.5-2.2-1.5-2.7-2.6l.8-1-1.1-2.2Z" /></>}
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="sa-footer">
      <div className="sa-footer-inner">
        <div className="sa-footer-top">
          <div className="sa-footer-brand-column">
            <Link to="/" className="sa-footer-brand" aria-label="Studio Amberleigh home">
              <span className="sa-footer-monogram" aria-hidden="true"><img src={studioLogo} alt="" /></span>
              <span>STUDIO AMBERLEIGH<small>PERFORMING ARTS</small></span>
            </Link>
            <p className="sa-footer-tagline">A space for your voice.<br /><em>A place for your potential.</em></p>
          </div>
          <nav className="sa-footer-explore" aria-label="Footer navigation">
            <h2 className="sa-footer-label">Explore</h2>
            <ul>{links.map(([name, url]) => <li key={name}><Link to={url}>{name}</Link></li>)}</ul>
          </nav>
          <div className="sa-footer-location">
            <h2 className="sa-footer-label">Visit the studio</h2>
            <address>Strangeways Office Park<br />6 Delamore Road, Hillcrest<br />KwaZulu-Natal</address>
          </div>
          <div className="sa-footer-contact">
            <h2 className="sa-footer-label">Say hello</h2>
            <a href="tel:+27767768331">+27 76 776 8331</a>
            <a className="sa-footer-email" href="mailto:studio.amberleigh@gmail.com">studio.amberleigh@gmail.com</a>
            <div className="sa-footer-socials" aria-label="Social media">
              {socialLinks.map(({ name, href, icon }) => <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name} title={name}><SocialIcon name={icon} /></a>)}
            </div>
          </div>
        </div>
        <div className="sa-footer-bottom">
          <span>© {new Date().getFullYear()} Studio Amberleigh (Pty) Ltd</span>
          <a href="https://venturetechnologies.co" target="_blank" rel="noopener noreferrer">Website by <span>Venture Technologies</span></a>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
