import React, { useEffect, useState } from "react";
import "./SingleProductHero.scss";
import {
  ShoppingBag,
  ShoppingCart,
  Truck,
  ShieldCheck,
  Pencil,
  Trash2,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/NavContext";
import AddProduct from "../../profile/add-products/AddProduct";

import { TbTruckDelivery } from "react-icons/tb";
import { GiCakeSlice } from "react-icons/gi";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import axios from "axios";
import { Notyf } from "notyf";

const SingleProductHero = ({ product }) => {
  // === NOTFY SETUP ===
  const notfy = new Notyf();

  // === ROUTER & AUTH CONTEXT ===
  const navigate = useNavigate();

  // Get user info from auth context
  const { user } = useAuth();

  const [isEdit, setIsEdit] = useState(false);

  // === 1. ANIMATION SETUP ===
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

  const formatProductDetails = (text) => {
    if (!text) return "";

    return text
      .replace(/([A-Z][a-z\s]+:)/g, "<br/><b>$1</b> ") // Improved to catch multi-word labels
      .replace(/^<br\/>/, "");
  };

  return (
    <section className={`single-product-section ${isEdit ? "blur-bg" : ""}`}>
      <div className="container">
        <div className="product-layout">
          {/* === LEFT COLUMN: IMAGE === */}
          <div className={`product-image-wrapper ${isEdit && "hide"}`}>
            <img src={product.imageUrl} alt={product.name} />
          </div>

          {user?.role === "admin" && isEdit && (
            <>
              <div className="edit-form">
                <AddProduct />
                <button className="close-icon" onClick={() => setIsEdit(false)}>
                  <IoMdClose size={25} />
                </button>
              </div>
            </>
          )}

          {/* === RIGHT COLUMN: DETAILS === */}
          <div className="product-info-wrapper">
            {user?.role === "admin" && (
              <div className="admin-controls">
                <button className={`edit-pill ${isEdit && "hide"}`} onClick={() => setIsEdit(true)}>
                  <Pencil size={14} />
                </button>
              </div>
            )}
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
        <div className="product-info-grid">
          {/* LEFT SIDE: PRODUCT DETAILS */}
          <div className="product-details-wrapper">
            <h1>Details</h1>
            <p
              dangerouslySetInnerHTML={{
                __html: formatProductDetails(product.details),
              }}
            />
          </div>

          {/* RIGHT SIDE: WHY CHOOSE US */}
          <div className="trust-signals-wrapper">
            <h2>Why Choose Us?</h2>

            <div className="signal-item">
              <div className="icon-circle">
                <TbTruckDelivery size={38} />
              </div>
              <p>Midnight Delivery Available</p>
            </div>

            <div className="signal-item">
              <div className="icon-circle">
                <GiCakeSlice size={38} />
              </div>
              <p>Customizable Flavours</p>
            </div>

            <div className="signal-item">
              <div className="icon-circle">
                <HiOutlineShieldCheck size={38} />
              </div>
              <p>Freshness Guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProductHero;
