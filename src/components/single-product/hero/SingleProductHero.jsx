import React, { useState } from "react";
import "./SingleProductHero.scss";
import { ShoppingBag, Star, Truck, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

const SingleProductHero = () => {
  const navigate = useNavigate();

  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(SplitText);

  useGSAP(() => {
    document.fonts.ready.then(() => {
      const split = new SplitText(".product-title", { type: "words,lines" });

      const tl = gsap.timeline({
        defaults: {
          duration: 0.8,
          ease: "power1.out",
        }
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

  // === 1. MOCK DATA ===
  const product = {
    id: 1,
    name: "French Baguette (1 Pc)",
    price: 100,
    image:
      "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?q=80&w=1000&auto=format&fit=crop",
    description:
      "French bread loaf with a crisp outer crust, chewy texture and a soft crumb. Perfect accompaniment for soups & salads.",
    allergens: "Wheat, Soy",
    storage: [
      "Store at room temperature. Please do not microwave.",
      "To heat, sprinkle generously with water & place in an Oven/OTG at 180 degrees for 7-8 minutes.",
      "Consume within 24 hours.",
    ],
    reviews: [
      {
        id: 1,
        user: "Sarah J.",
        rating: 5,
        text: "Perfect crust! Reminds me of Paris.",
      },
      {
        id: 2,
        user: "Mike T.",
        rating: 4,
        text: "Great taste, but best eaten fresh same day.",
      },
    ],
  };

  // === 2. STATE FOR TABS ===
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);

  return (
    <section className="single-product-section">
      <div className="container">
        <div className="product-layout">
          {/* === LEFT COLUMN: IMAGE === */}
          <div className="product-image-wrapper">
            <img src={product.image} alt={product.name} />
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
                onClick={() => navigate(`/products/${product.id}/checkout`)}
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
                <button
                  className={`tab-btn ${
                    activeTab === "reviews" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("reviews")}
                >
                  REVIEWS
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

                {activeTab === "reviews" && (
                  <div className="content-pane fade-in">
                    {product.reviews.map((review) => (
                      <div key={review.id} className="review-item">
                        <div className="review-header">
                          <span className="user-name">{review.user}</span>
                          <div className="stars">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                fill={i < review.rating ? "#ffc107" : "none"}
                                color={i < review.rating ? "#ffc107" : "#ddd"}
                              />
                            ))}
                          </div>
                        </div>
                        <p>{review.text}</p>
                      </div>
                    ))}
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
