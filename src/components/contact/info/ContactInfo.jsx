import React from "react";
import "./ContactInfo.scss";
import { Phone, MessageCircle, Mail, Store } from "lucide-react";

const ContactInfo = () => {
  const contactDetails = [
    {
      id: 1,
      icon: <Phone size={32} />,
      title: "Phone",
      info: "207-8767-452",
      link: "tel:+12078767452", // Opens phone dialer
      ariaLabel: "Call us",
    },
    {
      id: 2,
      icon: <MessageCircle size={32} />,
      title: "WhatsApp",
      info: "082-123-234-345",
      link: "https://wa.me/1082123234345", // Opens WhatsApp
      ariaLabel: "Message us on WhatsApp",
    },
    {
      id: 3,
      icon: <Mail size={32} />,
      title: "Email",
      info: "support@yoursite.com",
      link: "mailto:support@yoursite.com", // Opens email client
      ariaLabel: "Email us",
    },
    {
      id: 4,
      icon: <Store size={32} />,
      title: "Our Shop",
      info: "C44X+6XH, Saiyapurwa, Hardoi, Uttar Pradesh 241001",
      link: "https://maps.google.com/?q=2443+Oak+Ridge+Omaha", // Opens Google Maps
      ariaLabel: "View shop location",
    },
  ];

  return (
    <section className="contact-info-section">
      <div className="container">
        {/* PART 1: The Info Grid */}
        <div className="info-grid">
          {contactDetails.map((item) => (
            <a
              key={item.id}
              href={item.link}
              className="info-card"
              target={
                item.title === "Our Shop" || item.title === "WhatsApp"
                  ? "_blank"
                  : "_self"
              }
              rel="noreferrer"
              aria-label={item.ariaLabel}
            >
              <div className="icon-wrapper">{item.icon}</div>
              <h3 className="card-title">{item.title}</h3>
              <p className="card-info">{item.info}</p>
            </a>
          ))}
        </div>

        {/* PART 2: The Map Embed */}
        <div className="map-wrapper">
          <iframe
            title="Our Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d371.26906111401087!2d80.14980479696337!3d27.405519155180652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399ef90002710817%3A0xce95e9bca86b5bde!2sRohit%20king%20gift%20center!5e1!3m2!1sen!2sin!4v1766513249859!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;