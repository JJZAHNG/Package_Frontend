import React from 'react';
import '../styles/Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Fast, Reliable Campus Delivery</h1>
        <p>
          Get your packages delivered across campus quickly and securely.
          Perfect for students and faculty on the go.
        </p>
        <div className="hero-buttons">
          <button className="btn-solid">Get Started →</button>
          <button className="btn-outline">Learn More</button>
        </div>
      </div>
      <div className="hero-image">
        <div className="placeholder">📦</div>
      </div>
    </section>
  );
};

export default Hero;
