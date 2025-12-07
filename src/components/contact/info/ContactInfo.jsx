import React from 'react';
import './ContactInfo.scss';
import { Phone, MessageCircle, Mail, Store } from 'lucide-react';

const ContactInfo = () => {
  
  const contactDetails = [
    {
      id: 1,
      icon: <Phone size={32} />,
      title: "Phone",
      info: "207-8767-452",
      link: "tel:+12078767452", // Opens phone dialer
      ariaLabel: "Call us"
    },
    {
      id: 2,
      icon: <MessageCircle size={32} />,
      title: "WhatsApp",
      info: "082-123-234-345",
      link: "https://wa.me/1082123234345", // Opens WhatsApp
      ariaLabel: "Message us on WhatsApp"
    },
    {
      id: 3,
      icon: <Mail size={32} />,
      title: "Email",
      info: "support@yoursite.com",
      link: "mailto:support@yoursite.com", // Opens email client
      ariaLabel: "Email us"
    },
    {
      id: 4,
      icon: <Store size={32} />,
      title: "Our Shop",
      info: "2443 Oak Ridge Omaha, QA 45065",
      link: "https://maps.google.com/?q=2443+Oak+Ridge+Omaha", // Opens Google Maps
      ariaLabel: "View shop location"
    }
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
              target={item.title === 'Our Shop' || item.title === 'WhatsApp' ? '_blank' : '_self'}
              rel="noreferrer"
              aria-label={item.ariaLabel}
            >
              <div className="icon-wrapper">
                {item.icon}
              </div>
              <h3 className="card-title">{item.title}</h3>
              <p className="card-info">{item.info}</p>
            </a>
          ))}
        </div>

        {/* PART 2: The Map Embed */}
        <div className="map-wrapper">
          <iframe 
            title="Our Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98513032400567!3d40.7588949713861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
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