import React, { useState, useMemo } from "react";
import "./Catalog.scss";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal, ShoppingCart } from "lucide-react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

const Catalog = () => {
  const notyf = new Notyf();
  const navigate = useNavigate();

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
      .from(".filter-bar", {
        duration: 0.6,
        y: 20,
        opacity: 0,
        ease: "expo.out",
      }, "-=0.4"
      )
      .from(".category-tabs", {
        duration: 0.6,
        y: 20,
        opacity: 0,
        stagger: 0.1,
        ease: "expo.out",
      }, "-=0.4");
    });
  }, []);


  // === 1. MOCK DATA ===
  // In a real app, this would come from an API
  const products = [
    {
      id: 1,
      name: "Oatmeal Muffins",
      price: 7.0,
      category: "Muffins",
      image:
        "https://images.unsplash.com/photo-1603532648955-039310d9ed75?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "French Bread",
      price: 18.0,
      category: "Bread",
      image:
        "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Bread Stick",
      price: 25.0,
      category: "Bread",
      image:
        "https://images.unsplash.com/photo-1573143529242-7a5223c72639?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Pound Cake",
      price: 17.0,
      category: "Cakes",
      image:
        "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 5,
      name: "Rye Bread",
      price: 15.0,
      category: "Bread",
      image:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 6,
      name: "Swiss Roll",
      price: 30.0,
      category: "Cakes",
      image:
        "https://images.unsplash.com/photo-1535497223631-c42ba5974c0b?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 7,
      name: "Baking Flour",
      price: 25.0,
      category: "Ingredients",
      image:
        "https://images.unsplash.com/photo-1574315042614-2c1b75c87e59?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 8,
      name: "Sourdough",
      price: 12.0,
      category: "Bread",
      image:
        "https://images.unsplash.com/photo-1585476686161-b4f00998c081?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  // === 2. STATE MANAGEMENT ===
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState(50); // Default max price
  const [activeCategory, setActiveCategory] = useState("All");

  // === 3. FILTERING LOGIC ===
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesPrice = product.price <= maxPrice;
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;

      return matchesSearch && matchesPrice && matchesCategory;
    });
  }, [searchTerm, maxPrice, activeCategory]);

  const categories = ["All", "Bread", "Cakes", "Muffins", "Ingredients"];

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
              <span>Max Price: ${maxPrice}</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="price-slider"
            />
          </div>
        </div>

        {/* === PRODUCT GRID === */}
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} onClick={()=> navigate(`/products/${product.id}`)} className="product-card">
                {/* Image Area */}
                <div className="image-wrapper">
                  <img src={product.image} alt={product.name} />
                  <button
                    onClick={() =>
                      notyf.success({
                        message: `${product.name} added to cart!`,
                        duration: 2000,
                        background: "#17701fff",
                        position: { x: "left", y: "bottom" },
                      })
                    }
                    className="add-to-cart-btn"
                    aria-label="Add to cart"
                  >
                    <img src="cart.gif" alt="" />
                  </button>
                </div>

                {/* Info Area */}
                <div className="card-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  <div className="price-row">
                    <span className="price">${product.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <h3>No products found</h3>
              <p>Try adjusting your search or price filter.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Catalog;
