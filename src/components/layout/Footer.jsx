import { useState } from "react";
import { NavLink } from "react-router-dom";
import { quickLinks, services, socialLinks } from "../../data/site";
import { useToast } from "../../context/ToastContext";

export default function Footer() {
  const [email, setEmail] = useState("");
  const showToast = useToast();

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
    if (!email.trim()) {
      showToast("Please enter an email address.");
      return;
    }

    showToast("Thank you for subscribing.");
    setEmail("");
  };

  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h3>About</h3>
          <p>
            Data Analyst and Technical Writer passionate about transforming data into actionable
            insights.
          </p>
          <div className="social-links">
            {socialLinks.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="icon"
                aria-label={social.label}
              >
                <i className={social.iconClass} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            {quickLinks.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <h3>Services</h3>
          <ul className="footer-links">
            {services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <h3>Newsletter</h3>
          <p>Subscribe to get the latest insights and articles.</p>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary compact-btn">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Anthony Obot. All rights reserved.</p>
      </div>
    </footer>
  );
}
