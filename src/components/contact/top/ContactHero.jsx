import React from 'react';
import { Link } from 'react-router-dom';
import './ContactHero.scss';

const ContactHero = () => {
  // PLACEHOLDER IMAGES - Replace with your brand's contact illustrations
  // Left: Example of a support agent/person
  const leftIllustration = "https://cdn-icons-png.flaticon.com/512/6666/6666757.png"; 
  // Right: Example of communication methods (phone, email, chat)
  const rightIllustration = "https://cdn-icons-png.flaticon.com/512/3649/3649589.png"; 

  return (
    <section className="contact-hero-section">
      
      {/* Left Illustration Container */}
      <div className="illustration-container left">
        <img src={leftIllustration} alt="Contact support illustration left" />
      </div>

      {/* Central Content */}
      <div className="hero-content">
        <h1 className="hero-title">Contact Us</h1>
      </div>

       {/* Right Illustration Container */}
      <div className="illustration-container right">
        <img src={rightIllustration} alt="Contact communication illustration right" />
      </div>

    </section>
  );
};

export default ContactHero;