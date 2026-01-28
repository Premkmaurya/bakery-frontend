import React, { useEffect, useState } from "react";
import { Trash2, ShoppingCart, HeartOff } from "lucide-react";
import "./WishlistPage.scss";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Notyf } from "notyf";

const WishlistPage = () => {
  const navigate = useNavigate();
  const notfy = new Notyf();

  // === MOCK DATA ===
  const [wishlistItems, setWishlistItems] = useState([]);

  // === GSAP ANIMATIONS ===
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(SplitText);
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    document.fonts.ready.then(() => {
      const split = new SplitText(".page-title", { type: "words,lines" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".wishlist-page-wrapper",
          start: "top 80%",
          end: "top 30%",
        },
        defaults: {
          duration: 0.8,
          ease: "expo.out",
        },
      });

      tl.from(split.lines, {
        yPercent: 100,
        opacity: 0,
        stagger: 0.1,
      }).fromTo(
        ".wishlist-card",
        {
          yPercent: 50,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.5,
          ease: "power1.in",
        },
        "-=0.4"
      );
    });
  }, []);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      const response = await axios.get(
        "https://bakeverse-bk.vercel.app/wishlist/getWishlist",
        {
          withCredentials: true,
        }
      );
      setWishlistItems(response.data.products);
    };
    fetchWishlistItems();
  }, []);

  // === HANDLERS ===
  const removeFromWishlist = async (id, productId) => {
    setWishlistItems((prev) =>
      prev.filter((item) => item._id !== id)
    );
    const response = await axios.post(`https://bakeverse-bk.vercel.app/wishlist/toggleWishlist/${productId}`, {
      withCredentials: true,
    });
    console.log(response.data);
  };

  const addToCart = async (item) => {
    const response = await axios.post(
      `https://bakeverse-bk.vercel.app/cart/addToCart/${item.productId._id}`,
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
    <div className="wishlist-page-wrapper">
      <div className="container">
        {wishlistItems.length > 0 ? (
          <div className="wishlist-grid">
            {wishlistItems.map((item) => (
              <div key={item._id} className="wishlist-card">
                {/* Image & Remove Button */}
                <div className="image-container">
                  <img
                    src={item.productId.imageUrl}
                    alt={item.productId.name}
                  />
                  <button
                    className="remove-btn"
                    onClick={() => removeFromWishlist(item._id,item.productId._id)}
                    title="Remove from Wishlist"
                  >
                    <Trash2 size={18} />
                  </button>
                  {!item.productId.inStock && (
                    <span className="out-of-stock-badge">Out of Stock</span>
                  )}
                </div>

                {/* Content */}
                <div className="card-content">
                  <span className="category">{item.productId.category}</span>
                  <h3 className="product-name">{item.productId.name}</h3>
                  <div className="price">
                    ₹{item.productId.price.toFixed(2)}
                  </div>

                  <button
                    className="add-cart-btn"
                    onClick={() => addToCart(item)}
                    disabled={!item.productId.inStock}
                  >
                    <ShoppingCart size={18} />
                    {item.productId.inStock ? "Add to Cart" : "Unavailable"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // === EMPTY STATE ===
          <div className="empty-wishlist">
            <HeartOff size={64} className="empty-icon" />
            <h2>Your wishlist is empty</h2>
            <p>Seems like you haven't found anything you like yet.</p>
            <button
              className="browse-btn"
              onClick={() => navigate("/products")}
            >
              Shop Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
