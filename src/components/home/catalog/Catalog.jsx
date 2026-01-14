import React, { useState } from "react";
import "./catalog.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SwiperSlider from "./slider/SwiperSlider";
import { IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Catalog = ({ products, setCategory }) => {
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(SplitText);
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    const split = new SplitText(".catalog-title", { type: "words,lines" });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".catalog-container",
        start: "top 80%",
      },
    });
    tl.from(split.lines, {
      duration: 0.8,
      yPercent: 100,
      opacity: 0,
      stagger: 0.1,
      ease: "expo.out",
    })
      .from(
        ".catalog-tabs li",
        {
          duration: 0.7,
          yPercent: 100,
          opacity: 0,
          stagger: 0.1,
          ease: "expo.out",
        },
        "-=0.5"
      )
      .from(
        ".cake-card",
        {
          duration: 0.8,
          yPercent: 50,
          opacity: 0,
          stagger: {
            amount: 0.4,
          },
          ease: "expo.out",
        },
        "-=0.6"
      );
  }, []);

  const [activeCategory, setActiveCategory] = useState("Popular cakes");

  const categories = [
    "Popular cakes",
    "Celebration cakes",
    "Baby cakes",
    "Wedding cakes",
    "Special cakes",
  ];

  const navigate = useNavigate()

  return (
    <section className="catalog-container">
      <h2 className="catalog-title">Catalog</h2>

      {/* Navigation Tabs */}
      <ul className="catalog-tabs">
        {categories.map((cat) => (
          <li
            key={cat}
            className={activeCategory === cat ? "active" : ""}
            onClick={() => {
              setActiveCategory(cat);
              setCategory(cat);
            }}
          >
            {cat}
          </li>
        ))}
      </ul>

      {/* The Cake Grid */}
      <div className="cake-grid">
        {products?.map((cake) => (
          <div
            key={cake._id}
            className={`cake-card ${cake.featured ? "featured" : ""}`}
            onClick={()=>navigate(`/products/${cake._id}`)}
          >
            <div className="image-wrapper">
              <img src={cake.imageUrl} alt={cake.name} />
            </div>
            <div className="cake-info">
              <h3>{cake.name}</h3>
              <span className="price">
                <IndianRupee className="rupee-icon" size={14} />
                {cake.price}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* swiper slider */}
      <div className="catalog-slider">
        <SwiperSlider activeCategory={activeCategory} catalogData={products} />
      </div>
    </section>
  );
};

export default Catalog;
