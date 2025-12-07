import React from 'react';
import { Link } from 'react-router-dom';
import './CtaSection.scss';

const CtaSection = () => {
  // Placeholder for a delivery/gift illustration
  // You can replace this with a local SVG of a scooter or a gift box
  const decorationImage = "https://cdn-icons-png.flaticon.com/512/7541/7541900.png"; 

  return (
    <section className="cta-section">
      
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title">Like Our Products?</h2>
          
          {/* Decorative Separator */}
          <div className="separator">
            <span>♦</span><span>♦</span><span>♦</span><span>♦</span>
          </div>

          <p className="cta-text">
            Treat yourself to your favourite Mio Amore products or surprise your 
            loved ones with an edible gift.
          </p>

          <Link to="/order-online" className="cta-btn">
            ORDER ONLINE
          </Link>
        </div>
      </div>

      {/* Decorative Image anchored to bottom left */}
      <div className="decoration-wrapper">
        <img src={decorationImage} alt="Delivery scooter illustration" />
      </div>

    </section>
  );
};

export default CtaSection;