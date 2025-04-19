import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/ContactPage.css';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('✅ Your message has been sent!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-wrapper">
      <Navbar />
      <div className="contact-container fade-in">
        <h1>📬 Contact Us</h1>
        <p>Have a question or feedback? We'd love to hear from you!</p>

        <div className="contact-content">
          {/* 📩 Left: Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>Your Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />

            <label>Your Email *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />

            <label>Message *</label>
            <textarea name="message" value={formData.message} onChange={handleChange} required />

            <button type="submit" className="btn-solid">Send Message</button>
          </form>

          {/* 📍 Right: Info */}
          <div className="contact-info">
            <h3>📌 Office Location</h3>
            <p>Campus Center, Room 205</p>

            <h3>📞 Phone</h3>
            <p>+86 123-456-7890</p>

            <h3>📧 Email</h3>
            <p>support@carryon-campus.com</p>

            <h3>⏰ Business Hours</h3>
            <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
