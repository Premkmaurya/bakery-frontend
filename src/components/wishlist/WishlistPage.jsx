import React, { useState } from 'react';
import { Trash2, ShoppingCart, HeartOff } from 'lucide-react';
import './WishlistPage.scss';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/all';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const WishlistPage = () => {
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
        }
      });

      tl.from(split.lines, {
        yPercent: 100,
        opacity: 0,
        stagger: 0.1,
      })
      .fromTo(".wishlist-card", {
        yPercent: 50,
        opacity: 0,
      }, {
        yPercent: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.5,
        ease:"power1.in"
      }, "-=0.4");
    });
  }, []);
  // === MOCK DATA ===
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Chocolate Truffle",
      price: 140,
      category: "Cakes",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      inStock: true
    },
    {
      id: 2,
      name: "Blueberry Muffin",
      price: 50,
      category: "Muffins",
      image: "https://images.unsplash.com/photo-1557308536-ee471ef2c39a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      inStock: true
    },
    {
      id: 3,
      name: "Strawberry Cupcake",
      price: 50,
      category: "Cupcakes",
      image: "https://images.unsplash.com/photo-1599785209796-786432b228bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      inStock: false // Out of stock example
    }
  ]);

  // === HANDLERS ===
  const removeFromWishlist = (id) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const addToCart = (item) => {
    // In a real app, this would dispatch to your Cart Context/Redux
    alert(`Added ${item.name} to cart!`);
  };

  return (
    <div className="wishlist-page-wrapper">
      <div className="container">
        <h1 className="page-title">My Wishlist</h1>

        {wishlistItems.length > 0 ? (
          <div className="wishlist-grid">
            {wishlistItems.map((item) => (
              <div key={item.id} className="wishlist-card">
                
                {/* Image & Remove Button */}
                <div className="image-container">
                  <img src={item.image} alt={item.name} />
                  <button 
                    className="remove-btn" 
                    onClick={() => removeFromWishlist(item.id)}
                    title="Remove from Wishlist"
                  >
                    <Trash2 size={18} />
                  </button>
                  {!item.inStock && <span className="out-of-stock-badge">Out of Stock</span>}
                </div>

                {/* Content */}
                <div className="card-content">
                  <span className="category">{item.category}</span>
                  <h3 className="product-name">{item.name}</h3>
                  <div className="price">${item.price.toFixed(2)}</div>
                  
                  <button 
                    className="add-cart-btn"
                    onClick={() => addToCart(item)}
                    disabled={!item.inStock}
                  >
                    <ShoppingCart size={18} />
                    {item.inStock ? "Add to Cart" : "Unavailable"}
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
            <a href="/catalog" className="browse-btn">Browse Catalog</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;