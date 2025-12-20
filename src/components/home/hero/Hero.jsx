import React from "react";
import "./hero.scss";
import { FaFacebookF, FaVk, FaInstagram, FaSearch } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(SplitText);

  useGSAP(() => {
    const tl = gsap.timeline();
    const split = new SplitText(".text-section h1", { type: "words,lines" });

    tl.from(split.lines, {
      duration: 0.8,
      yPercent: 100,
      opacity: 0,
      delay: 0.6,
      stagger: 0.1,
      ease: "expo.out",
    })
      .from(".subtitle", {
        duration: 0.7,
        yPercent: 100,
        opacity: 0,
        delay: -0.5,
        stagger: 0.1,
        ease: "expo.out",
      })
      .from(".cta-button", {
        duration: 0.8,
        opacity: 0,
        stagger: 0.1,
        ease: "expo.out",
      })
      .from(
        ".social-icons",
        {
          duration: 0.8,
          opacity: 0,
          stagger: {
            amount: 0.3,
          },
          ease: "expo.out",
        },
        "-=0.6"
      )
      .fromTo(
        ".hero-image",
        {
          scale: 1.2,
          opacity: 0,
        },
        {
          duration: 1.2,
          scale: 1,
          opacity: 1,
          ease: "expo.out",
        },"-=1.8"
      );
  }, []);

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

          <button onClick={()=>navigate('/products')} className="cta-button">Shop now</button>

          <div className="social-icons">
            <div className="icon-circle">
              <FaFacebookF />
            </div>
            <div className="icon-circle">
              <FaVk />
            </div>
            <div className="icon-circle">
              <FaInstagram />
            </div>
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
  );
};

export default Hero;
