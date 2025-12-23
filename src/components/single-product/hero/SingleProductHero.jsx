import React, { useEffect, useState } from "react";
import "./SingleProductHero.scss";
import { ShoppingBag, ShoppingCart, Truck, ShieldCheck } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import axios from "axios";
import { Notyf } from "notyf";

const SingleProductHero = ({ product }) => {
  const notfy = new Notyf();
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
          ".desc",
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
          ".desc p",
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 1,
          }
        );
    });
  }, []);

  // === 2. STATE FOR TABS ===
  const [quantity, setQuantity] = useState(1);

  const addToCart = async (item) => {
    const response = await axios.post(
      `http://localhost:3000/cart/addToCart/${item}`,
      {
        quantity: 1,
      },
      {
        withCredentials: true,
      }
    );
    if (response.data) {
      notfy.success({
        message: "Added to cart!",
        duration: 2000,
        background: "#17701fff",
        position: { x: "left", y: "bottom" },
      });
    }
  };

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
              <div className="order-btn">
                <button
                  onClick={() =>
                    navigate(`/products/checkout`, {
                      state: { product, quantity },
                    })
                  }
                  className="common order-btn-1"
                >
                  <span>ORDER ONLINE</span>
                  <ShoppingBag size={18} />
                </button>
                <button
                  onClick={() => addToCart(product._id)}
                  className="common order-btn-2"
                >
                  <ShoppingCart size={18} />
                  <span>ADD TO CART</span>
                </button>
              </div>
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
              <div className="desc">
                <h4>Description</h4>
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProductHero;
