import React, { useState } from "react";
import "./SingleProductHero.scss";
import { ShoppingBag, Star, Truck, ShieldCheck } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

const SingleProductHero = ({ product }) => {
  const navigate = useNavigate();
  console.log(product);
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(SplitText);

  useGSAP(() => {
    document.fonts.ready.then(() => {
      const split = new SplitText(".product-title", { type: "words,lines" });

      const tl = gsap.timeline({
        defaults: {
          duration: 0.8,
          ease: "power1.out",
        },
      });
      tl.fromTo(
        ".product-image-wrapper",
        {
          scale: 1.2,
          opacity: 0,
        },
        {
          duration: 1,
          scale: 1,
          opacity: 1,
        }
      )
        .from(
          split.lines,
          {
            yPercent: 10,
            opacity: 0,
            stagger: 0.1,
          },
          "-=0.5"
        )
        .fromTo(
          ".price-row",
          {
            opacity: 0,
          },
          {
            opacity: 1,
          },
          "-=0.5"
        )
        .fromTo(
          ".actions-row",
          {
            opacity: 0,
          },
          {
            opacity: 1,
          },
          "-=0.5"
        )
        .fromTo(
          ".trust-badges .badge",
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            stagger: {
              amount: 0.3,
            },
            opacity: 1,
          },
          "-=0.5"
        )
        .fromTo(
          ".tabs-header .tab-btn",
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            stagger: {
              amount: 0.3,
            },
            opacity: 1,
          },
          "-=0.5"
        )
        .fromTo(
          ".tab-content .content-pane",
          {
            opacity: 0,
          },
          {
            opacity: 1,
          },
          "-=0.5"
        );
    });
  }, []);

  // === 2. STATE FOR TABS ===
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);

  return (
    <section className="single-product-section">
      <div className="container">
        <div className="product-layout">
          {/* === LEFT COLUMN: IMAGE === */}
          <div className="product-image-wrapper">
            <img src={product.imageUrl} alt={product.name} />
          </div>

          {/* === RIGHT COLUMN: DETAILS === */}
          <div className="product-info-wrapper">
            <h1 className="product-title">{product.name}</h1>

            <div className="price-row">
              <span className="current-price">₹ {product.price}</span>
            </div>

            {/* Action Area */}
            <div className="actions-row">
              {/* Quantity Counter */}
              <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  -
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>

              {/* Order Button */}
              <button
                onClick={() => navigate(`/products/${product.id}/checkout`,{state:{product,quantity}})}
                className="order-btn"
              >
                <span>ORDER ONLINE</span>
                <ShoppingBag size={18} />
              </button>
            </div>

            {/* Trust Badges (Bonus UX) */}
            <div className="trust-badges">
              <div className="badge">
                <Truck size={16} />
                <span>Fast Delivery</span>
              </div>
              <div className="badge">
                <ShieldCheck size={16} />
                <span>Freshness Guaranteed</span>
              </div>
            </div>

            {/* === TAB SYSTEM === */}
            <div className="product-tabs">
              {/* Tab Headers */}
              <div className="tabs-header">
                <button
                  className={`tab-btn ${
                    activeTab === "description" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("description")}
                >
                  DESCRIPTION
                </button>
                <button
                  className={`tab-btn ${
                    activeTab === "details" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("details")}
                >
                  DETAILS
                </button>
              </div>

              {/* Tab Content */}
              <div className="tab-content">
                {activeTab === "description" && (
                  <div className="content-pane fade-in">
                    <p>{product.description}</p>
                    <p className="meta-info">
                      <strong>Allergens:</strong> {product.allergens}
                    </p>
                  </div>
                )}

                {activeTab === "details" && (
                  <div className="content-pane fade-in">
                    <h4>Consumption & Storage Guidelines:</h4>
                    <ul className="guidelines-list">
                      {product.storage.map((line, index) => (
                        <li key={index}>{line}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProductHero;
