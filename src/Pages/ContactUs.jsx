import React from 'react';
import './CSS/Contact.css';
 

const ContactUs = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-description">
        We'd love to hear from you! Reach out for any inquiries, feedback, or suggestions.
      </p>
      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="name" className="contact-label">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="contact-input"
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="contact-label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="contact-input"
            placeholder="Enter your email address"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message" className="contact-label">Message:</label>
          <textarea
            id="message"
            name="message"
            className="contact-textarea"
            placeholder="Write your message here"
            rows="5"
            required
          />
        </div>
        <button type="submit" className="contact-button">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
