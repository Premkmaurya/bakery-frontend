import React from "react";
import "./Contact.scss";
import ContactHero from "../components/contact/top/ContactHero";
import ContactInfo from "../components/contact/info/ContactInfo";
import ContactForm from "../components/contact/form/ContactForm";


import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/all';

const Contact = () => {
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(SplitText);

  useGSAP(() => {
    document.fonts.ready.then(() => {
      const split = new SplitText(".section-title", { type: "words,lines" });
      const tl = gsap.timeline();
      tl.from(split.lines, {
        duration: 0.8,
        yPercent: 50,
        opacity: 0,
        stagger: 0.1,
        ease: "expo.out",
      })
    });
  }, []);

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
