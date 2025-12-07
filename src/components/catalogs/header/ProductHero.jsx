import React from 'react';
import { Link } from 'react-router-dom';
import './ProductHero.scss';

const ProductHero = () => {
  // PLACEHOLDER IMAGES - Replace these with your product-related illustrations
  // Left: Example of ingredients or a whisk
  const leftIllustration = "https://cdn-icons-png.flaticon.com/512/2821/2821837.png";
  // Right: Example of a finished product or a gift box
  const rightIllustration = "https://cdn-icons-png.flaticon.com/512/2821/2821804.png";

  // You can pass the product name as a prop to this component
  const productName = "Delicious Chocolate Cake";

  return (
    <section className="product-hero-section">
      
      {/* Left Illustration Container */}
      <div className="illustration-container left">
        <img src={leftIllustration} alt="Product illustration left" />
      </div>

      {/* Central Content */}
      <div className="hero-content">
        <h1 className="hero-title">{productName}</h1>
      </div>

       {/* Right Illustration Container */}
      <div className="illustration-container right">
        <img src={rightIllustration} alt="Product illustration right" />
      </div>

    </section>
  );
};

export default ProductHero; 