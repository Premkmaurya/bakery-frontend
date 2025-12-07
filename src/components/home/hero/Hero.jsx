import React from 'react'
import "./hero.scss"
import { FaFacebookF, FaVk, FaInstagram, FaSearch } from 'react-icons/fa';

const Hero = () => {
  return (
    <div className="hero-container">
      {/* Navigation Bar */}


      {/* Main Hero Content */}
      <main className="hero-content">

        {/* Left Side: Text Content */}
        <div className="text-section">
          <h1>
            Confectionery <br />
            <span>& bakery shop</span>
          </h1>

          <p className="subtitle">Same day cake delivery in Hardoi</p>

          <button className="cta-button">Shop now</button>

          <div className="social-icons">
            <div className="icon-circle"><FaFacebookF /></div>
            <div className="icon-circle"><FaVk /></div>
            <div className="icon-circle"><FaInstagram /></div>
          </div>
        </div>

        {/* Right Side: Image Area */}
        <div className="image-section">
          {/* Using a placeholder from Unsplash that matches the vibe */}
          <img
            src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            alt="Delicious Chocolate Cake"
            className="hero-image"
          />

          {/* Carousel Dots (Visual only for now) */}
          <div className="carousel-dots">
            <span className="dot active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>

      </main>
    </div>
  )
}

export default Hero
