import React from "react";
import { Link } from "react-router-dom";
import "./AboutHero.scss";

const AboutHero = () => {
  // PLACEHOLDER IMAGES - Replace these with your actual brand illustrations (SVGs preferred)
  const leftIllustration =
    "https://cdn-icons-png.flaticon.com/512/4568/4568869.png"; // Example: baker/party
  const rightIllustration =
    "https://cdn-icons-png.flaticon.com/512/3081/3081940.png"; // Example: delivery person/cake

  return (
    <>
      <section className="about-hero-section">
        {/* Left Illustration Container */}
        <div className="illustration-container left">
          <img
            src={leftIllustration}
            alt="Decorative bakery illustration left"
          />
        </div>

        {/* Central Content */}
        <div className="hero-content">
          <h1 className="hero-title">About Us</h1>
        </div>

        {/* Right Illustration Container */}
        <div className="illustration-container right">
          <img
            src={rightIllustration}
            alt="Decorative bakery illustration right"
          />
        </div>
      </section>
      <section className="who-we-are-section">
        <div className="container">
          {/* 1. Text Content Area */}
          <div className="text-content">
            <h2 className="section-title">Who We Are?</h2>
            <p className="description">
              Mio Amore is part of the Switz Group, a leading multinational
              bakery enterprise. Our group operates across the entire bakery
              value chain, from ingredients and eggs to frozen goods, consumer
              products, education, and retail. With businesses in 11 countries,
              we create a global bakery ecosystem that thrives on shared
              learning and integration. This collaboration allows us to deliver
              unique value, innovative products, and unparalleled expertise to
              our customers.
            </p>
          </div>

          {/* 2. Visual Area with Watermark */}
          <div className="visual-composition">
            {/* The Background Text (Watermark) */}
            <div className="watermark-text" aria-hidden="true">
              MIO AMORE
            </div>

            {/* The Cakes */}
            <div className="cakes-container">
              {/* Left Cake */}
              <div className="cake-item side-cake">
                <img
                  className="image"
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=500&auto=format&fit=crop"
                  alt="Birthday cake with purple flowers"
                />
              </div>

              {/* Center Cake (Larger) */}
              <div className="cake-item center-cake">
                <img
                  className="image"
                  src="https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Tiered wedding cake with yellow roses"
                />
              </div>

              {/* Right Cake */}
              <div className="cake-item side-cake">
                <img
                  className="image"
                  src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=500&auto=format&fit=crop"
                  alt="Floral cake painting design"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutHero;
