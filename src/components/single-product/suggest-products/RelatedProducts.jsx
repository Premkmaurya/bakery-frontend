import React, { useState } from "react";
import "./RelatedProducts.scss";
import { FaHeart } from "react-icons/fa";
import { Heart, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";

const RelatedProducts = () => {
  // === MOCK DATA ===
  const products = [
    {
      id: 1,
      name: "Oreo Bliss",
      price: 765,
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Strawberry Bliss",
      price: 1068,
      image:
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Elegant Bliss",
      price: 712,
      image:
        "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Chocolate Truffle",
      price: 850,
      image:
        "https://images.unsplash.com/photo-1588195538326-c5f1f23fa438?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 5,
      name: "Vanilla Bean",
      price: 600,
      image:
        "https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=1000&auto=format&fit=crop",
    },
  ];
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
  const itemsPerView = 3;

  // Calculate limits
  const maxIndex = products.length - itemsPerView;
  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex >= maxIndex;

  const nextSlide = () => {
    if (!isAtEnd) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (!isAtStart) {
      setCurrentIndex((prev) => prev - 1);
    }
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
              {currentIndex + 1} / {maxIndex}
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
              <div key={product.id} className="product-card-wrapper">
                <article className="product-card">
                  {/* Image Area */}
                  <div className="card-image">
                    <img src={product.image} alt={product.name} />
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="wishlist-btn"
                      aria-label="Add to wishlist"
                    >
                      {wishedProducts[product.id] ? (
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
