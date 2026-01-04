import React, { useState } from "react";
import "./RelatedProducts.scss";
import { FaHeart } from "react-icons/fa";
import { Heart, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";

const RelatedProducts = ({ products }) => {
  // === MOCK DATA ===

  const [wishedProducts, setWishedProducts] = useState({});

  // Toggle wishlist for a specific product
  const toggleWishlist = (productId) => {
    setWishedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  // === SLIDER LOGIC ===
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 1;

  // Calculate limits
  const maxIndex = products.length - itemsPerView;
  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex >= maxIndex;

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="related-products-section">
      <div className="container">
        {/* === HEADER === */}
        <div className="section-header">
          <div className="text-content">
            <h2 className="title">You May Also Like</h2>
            <p className="subtitle">
              Discover our handpicked featured products - quality, style, and
              value!
            </p>
          </div>

          {/* Navigation Controls (Top Right) */}
          <div className="slider-controls">
            <button
              className="nav-btn"
              onClick={prevSlide}
              disabled={isAtStart} // Grey out if at start
              aria-label="Previous Products"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Simple Counter: e.g. 1/3 */}
            <span className="counter">
              {currentIndex + 1} / {maxIndex + 1}
            </span>

            <button
              className="nav-btn"
              onClick={nextSlide}
              disabled={isAtEnd} // Grey out if at end
              aria-label="Next Products"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* === SLIDER WINDOW === */}
        <div className="slider-window">
          <div
            className="slider-track"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {products.map((product) => (
              <div key={product._id} className="product-card-wrapper">
                <article className="product-card">
                  {/* Image Area */}
                  <div className="card-image">
                    <img src={product.imageUrl} alt={product.name} />
                    <button
                      onClick={() => toggleWishlist(product._id)}
                      className="wishlist-btn"
                      aria-label="Add to wishlist"
                    >
                      {wishedProducts[product._id] ? (
                        <FaHeart color="red" size={18} />
                      ) : (
                        <Heart size={18} />
                      )}
                    </button>
                  </div>

                  {/* Content Area */}
                  <div className="card-content">
                    <h3 className="product-name">{product.name}</h3>
                    <span className="product-price">₹{product.price}</span>

                    <button className="add-cart-btn">Add to Cart</button>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
