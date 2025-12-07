import React from "react";
import "./Contact.scss";
import ContactHero from "../components/contact/top/ContactHero";
import ContactInfo from "../components/contact/info/ContactInfo";
import ContactForm from "../components/contact/form/ContactForm";

const Contact = () => {
  return (
    <div>
      <ContactHero />
      <h2 className="section-title">Get In Touch</h2>
      <div className="contact-info-container">
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
