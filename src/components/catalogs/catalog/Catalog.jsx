import React, { useState, useMemo, useEffect } from "react";
import "./Catalog.scss";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { useNavigate } from "react-router-dom";

import { FaHeart } from "react-icons/fa";
import { Heart, Search, SlidersHorizontal, ShoppingCart } from "lucide-react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import axios from "axios";

const Catalog = () => {
  const notyf = new Notyf();
  const [products, setProducts] = useState([]);
  const [wishedProducts, setWishedProducts] = useState({});

  // Fetch wished products from backend and set state
  useEffect(() => {
    async function fetchWishedProducts() {
      try {
        const response = await axios.get(
          "http://localhost:3000/wishlist/getWishlist",
          {
            withCredentials: true,
          }
        );
        if (response.data && Array.isArray(response.data.products)) {
          // Convert wishedProduct array to an object for quick lookup
          const wishedMap = {};
          response.data.products.forEach((item) => {
            wishedMap[item.productId._id] = true;
          });
          setWishedProducts(wishedMap);
        }
      } catch (error) {
        // Optionally handle error
        setWishedProducts({});
      }
    }
    fetchWishedProducts();
  }, []);
  // Fetch products from backend with filters
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000); // Default max price
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    setLoading(true);
    const timerId = setTimeout(() => {
      async function fetchProducts() {
        try {
          const params = {
            search: searchTerm,
            category: activeCategory === "All" ? undefined : activeCategory,
            maxPrice,
          };
          const response = await axios.get(
            "http://localhost:3000/products/search",
            {
              params,
              withCredentials: true,
            }
          );
          setProducts(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
          setProducts([]);
        }
        setLoading(false);
      }
      fetchProducts();
    }, 300);
    return () => clearTimeout(timerId);
  }, [searchTerm, maxPrice, activeCategory]);
  const navigate = useNavigate();

  // Toggle wishlist for a specific product
  const toggleWishlist = async (productId) => {
    setWishedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
    const response = await axios.post(
      `http://localhost:3000/wishlist/toggleWishlist/${productId}`,
      { productId },
      {
        withCredentials: true,
      }
    );
    if (response.data) {
      notyf.success({
        message: response.data.message,
        duration: 2000,
        background: "#17701fff",
        position: { x: "left", y: "bottom" },
      });
    }
  };

  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(SplitText);

  useGSAP(() => {
    document.fonts.ready.then(() => {
      const split = new SplitText(".page-title", { type: "words,lines" });

      const tl = gsap.timeline();
      tl.from(split.lines, {
        duration: 0.8,
        yPercent: 40,
        opacity: 0,
        stagger: 0.1,
        ease: "expo.out",
      })
        .from(
          ".filter-bar",
          {
            duration: 0.6,
            y: 20,
            opacity: 0,
            ease: "expo.out",
          },
          "-=0.4"
        )
        .from(
          ".category-tabs",
          {
            duration: 0.6,
            y: 20,
            opacity: 0,
            stagger: 0.1,
            ease: "expo.out",
          },
          "-=0.4"
        );
    });
  }, []);

  const categories = [
    "All",
    "Popular cakes",
    "Celebration cakes",
    "Baby cakes",
    "Wedding cakes",
    "Special cakes",
    "Breads",
    "Muffins",
  ];

  const addToCart = async (id) => {
    const response = await axios.post(
      `http://localhost:3000/cart/addToCart/${id}`,
      {
        quantity: 1,
      },
      {
        withCredentials: true,
      }
    );
    if (response.data) {
      notyf.success({
        message: "added to cart",
        duration: 2000,
        background: "#17701fff",
        position: { x: "left", y: "bottom" },
      });
    }
  };
  return (
    <section className="catalog-section">
      <div className="container">
        <h2 className="page-title">Our Catalog</h2>

        {/* === FILTER BAR === */}
        <div className="filter-bar">
          {/* A. Search Input */}
          <div className="search-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* B. Category Tabs (Desktop) */}
          <div className="category-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`cat-btn ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* C. Price Filter */}
          <div className="price-filter">
            <div className="price-label">
              <SlidersHorizontal size={16} />
              <span>Max Price: ₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="price-slider"
            />
          </div>
        </div>

        {/* === PRODUCT GRID === */}
        {loading && (
          <div style={{ textAlign: "center", margin: "2rem 0" }}>
            <span role="status" aria-live="polite">
              Loading...
            </span>
          </div>
        )}
        <div className="product-grid">
          {!loading && products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="product-card-wrapper">
                <div
                  onClick={() => toggleWishlist(product._id)}
                  className="heart-btn"
                  aria-label="Add to wishlist"
                >
                  {wishedProducts[product._id] ? (
                    <FaHeart size={18} />
                  ) : (
                    <Heart size={18} />
                  )}
                </div>
                <div
                  onClick={() =>
                    navigate(`/products/${product._id}`, { state: { product } })
                  }
                  className="product-card"
                >
                  {/* Image Area */}
                  <div className="image-wrapper">
                    <img src={product.imageUrl} alt={product.name} />
                  </div>

                  {/* Info Area */}
                  <div className="card-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-category">{product.category}</p>
                    <div className="price-row">
                      <span className="price">₹{product.price.toFixed(2)}</span>
                    </div>
                    <button
                      className="add-to-cart-btn"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents navigating to details page
                        addToCart(product._id);
                      }}
                    >
                      <ShoppingCart size={16} /> ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : !loading ? (
            <div className="no-results">
              <h3>No products found</h3>
              <p>Try adjusting your search or price filter.</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Catalog;
