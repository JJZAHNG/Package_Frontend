import React from 'react';
import '../styles/Testimonials.css';

const Testimonials: React.FC = () => {
  return (
    <section className="testimonials">
      <h2>What Our Users Say</h2>
      <p className="testimonials-subtitle">
        Don’t just take our word for it. Here's what students and faculty have to say.
      </p>

      <div className="testimonial-cards">
        <div className="testimonial-card">
          <div className="avatar" />
          <h4>Sarah J.</h4>
          <p className="role">Junior, Computer Science</p>
          <p className="comment">
            "CarryOn has been a lifesaver during finals week! I could get my study materials delivered without leaving the library."
          </p>
        </div>

        <div className="testimonial-card">
          <div className="avatar" />
          <h4>Prof. Martinez</h4>
          <p className="role">Faculty, Engineering</p>
          <p className="comment">
            "I use CarryOn to send important documents between departments. It's reliable and much faster than campus mail."
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
