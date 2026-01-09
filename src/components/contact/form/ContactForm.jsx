import React from 'react';
import { useForm } from 'react-hook-form';
import './ContactForm.scss';
import { Send } from 'lucide-react';

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = (data) => {
    alert("Thanks for your message! We will get back to you shortly.");
    reset();
    // Here you would normally send 'data' to your backend API
  };

  return (
    <section className="contact-form-section">
      <div className="container">
        
        <div className="form-header">
          <h2 className="form-title">Submit Your Inquiry</h2>
          <p className="section-subtitle">
            Have a question about our cakes or need a custom order? 
            Fill out the form below and our team will get back to you within 24 hours.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
          
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name" 
              placeholder="Your Name..." 
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <span className="error">{errors.name.message}</span>}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="example@yourmail.com" 
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address'
                }
              })}
            />
            {errors.email && <span className="error">{errors.email.message}</span>}
          </div>

          {/* Subject Field */}
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input 
              type="text" 
              id="subject" 
              placeholder="Order Inquiry..." 
              {...register('subject', { required: 'Subject is required' })}
            />
            {errors.subject && <span className="error">{errors.subject.message}</span>}
          </div>

          {/* Message Field */}
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea 
              id="message" 
              rows="6" 
              placeholder="Type your message here..." 
              {...register('message', { required: 'Message is required' })}
            ></textarea>
            {errors.message && <span className="error">{errors.message.message}</span>}
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