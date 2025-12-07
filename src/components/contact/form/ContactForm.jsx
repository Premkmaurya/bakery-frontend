import React, { useState } from 'react';
import './ContactForm.scss';
import { Send } from 'lucide-react';

const ContactForm = () => {
  // Simple state to handle form data (optional, but good practice)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    console.log("Form Submitted:", formData);
    alert("Thanks for your message! We will get back to you shortly.");
    // Here you would normally send 'formData' to your backend API
  };

  return (
    <section className="contact-form-section">
      <div className="container">
        
        <div className="form-header">
          <h2 className="section-title">Submit Your Inquiry</h2>
          <p className="section-subtitle">
            Have a question about our cakes or need a custom order? 
            Fill out the form below and our team will get back to you within 24 hours.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              placeholder="Your Name..." 
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="example@yourmail.com" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>

          {/* Subject Field */}
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input 
              type="text" 
              id="subject" 
              name="subject" 
              placeholder="Order Inquiry..." 
              value={formData.subject}
              onChange={handleChange}
              required 
            />
          </div>

          {/* Message Field */}
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea 
              id="message" 
              name="message" 
              rows="6" 
              placeholder="Type your message here..." 
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn">
            <span>Send Now</span>
            <Send size={18} />
          </button>

        </form>

      </div>
    </section>
  );
};

export default ContactForm;