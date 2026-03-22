import { useState } from "react";
import SectionTitle from "../components/shared/SectionTitle";
import Reveal from "../components/shared/Reveal";
import { contactDetails, socialLinks } from "../data/site";
import { useToast } from "../context/ToastContext";

const CONTACT_STORAGE_KEY = "contactMessages";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [formMessage, setFormMessage] = useState("");
  const showToast = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();

    const savedMessages = JSON.parse(localStorage.getItem(CONTACT_STORAGE_KEY) || "[]");
    savedMessages.push({ ...formState, date: new Date().toISOString() });
    localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(savedMessages));

    setFormState({ name: "", email: "", subject: "", message: "" });
    setFormMessage("Thank you for your message. I'll get back to you soon.");
    showToast("Message sent successfully.");

    window.setTimeout(() => {
      setFormMessage("");
    }, 5000);
  };

  return (
    <section className="container page-top-gap">
      <SectionTitle title="Get In Touch" subtitle="Let's connect and collaborate" />

      <div className="contact-container">
        <Reveal className="contact-info">
          <h3>Let's Work Together</h3>
          <p>
            I'm always open to discussing new projects, creative ideas, or opportunities to be
            part of your vision. Feel free to reach out.
          </p>

          <div className="contact-details">
            {contactDetails.map((item) => (
              <div key={item.id} className="contact-item">
                <div className="contact-icon">
                  <i className={item.icon} aria-hidden="true" />
                </div>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.value}</p>
                </div>
              </div>
            ))}

            <div className="contact-item">
              <div>
                <strong>Social Media</strong>
                <p>You can also reach me via social media.</p>
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
            </div>
          </div>
        </Reveal>

        <Reveal className="contact-form">
          <h3 className="form-title">Send Me a Message</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                id="name"
                type="text"
                required
                value={formState.name}
                onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                id="email"
                type="email"
                required
                value={formState.email}
                onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <input
                id="subject"
                type="text"
                required
                value={formState.subject}
                onChange={(event) =>
                  setFormState((prev) => ({ ...prev, subject: event.target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                required
                value={formState.message}
                onChange={(event) =>
                  setFormState((prev) => ({ ...prev, message: event.target.value }))
                }
              />
            </div>
            <button type="submit" className="btn submit-btn">
              Send Message
            </button>
          </form>
          {formMessage ? <p className="form-success">{formMessage}</p> : null}
        </Reveal>
      </div>
    </section>
  );
}
