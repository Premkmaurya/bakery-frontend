import React, { useState } from "react";
import "./catalog.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";


import SwiperSlider from "./slider/SwiperSlider"


const Catalog = () => {
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(SplitText);
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    const split = new SplitText(".catalog-title", { type: "words,lines" });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".catalog-container",
        start: "top 80%",
      },
    });
    tl.from(split.lines, {
      duration: 0.8,
      yPercent: 100,
      opacity: 0,
      stagger: 0.1,
      ease: "expo.out",
    })
      .from(
        ".catalog-tabs li",
        {
          duration: 0.7,
          yPercent: 100,
          opacity: 0,
          stagger: 0.1,
          ease: "expo.out",
        },
        "-=0.5"
      )
      .from(
        ".cake-card",
        {
          duration: 0.8,
          yPercent: 50,
          opacity: 0,
          stagger: {
            amount: 0.4,
          },
          ease: "expo.out",
        },
        "-=0.6"
      );
  }, []);

  const [activeCategory, setActiveCategory] = useState("Popular cakes");
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = [
    "Popular cakes",
    "Celebration cakes",
    "Baby cakes",
    "Wedding cakes",
    "Special cakes",
  ];

  // 🍰 The Data: Each tab has its own list of cakes
  const catalogData = {
    "Popular cakes": [
      {
        id: 1,
        name: "Chocolate Truffle",
        price: "140 ₹",
        img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 2,
        name: "Creamy Apple",
        price: "120 ₹",
        img: "https://images.unsplash.com/photo-1568467727145-5df180e0c00d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 3,
        name: "Fruit Explosion",
        price: "130 ₹",
        img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 4,
        name: "Anna Pavlova",
        price: "110 ₹",
        img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      },
      // The Featured Item (Big one on the right)
      {
        id: 5,
        name: "Caramel Drip",
        price: "160 ₹",
        img: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        featured: true,
      },
    ],
    "Celebration cakes": [
      {
        id: 6,
        name: "Birthday Sprinkles",
        price: "90 ₹",
        img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 7,
        name: "Golden Anniversary",
        price: "200 ₹",
        img: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 8,
        name: "Pink Party",
        price: "110 ₹",
        img: "https://images.unsplash.com/photo-1627834377411-8da5f4f09de8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 9,
        name: "Blue Velvet",
        price: "135 ₹",
        img: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 10,
        name: "Luxury Black Forest",
        price: "180 ₹",
        img: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        featured: true,
      },
    ],
    "Baby cakes": [
      {
        id: 11,
        name: "Cute Panda",
        price: "80 ₹",
        img: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 12,
        name: "Blueberry Muffin",
        price: "50 ₹",
        img: "https://images.unsplash.com/photo-1557308536-ee471ef2c39a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 13,
        name: "Strawberry Cupcake",
        price: "50 ₹",
        img: "https://images.unsplash.com/photo-1599785209796-786432b228bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 14,
        name: "Unicorn Cake",
        price: "120 ₹",
        img: "https://images.unsplash.com/photo-1576618148400-f54bed99fcf8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 15,
        name: "Gender Reveal",
        price: "150 ₹",
        img: "https://images.unsplash.com/photo-1602351447937-745cb72061d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        featured: true,
      },
    ],
    "Wedding cakes": [
      {
        id: 16,
        name: "Classic White",
        price: "300 ₹",
        img: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 17,
        name: "Floral Tier",
        price: "450 ₹",
        img: "https://images.unsplash.com/photo-1614597396930-cd6760b5b724?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 18,
        name: "Minimalist Boho",
        price: "280 ₹",
        img: "https://images.unsplash.com/photo-1623944890763-74b8861d8bba?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 19,
        name: "Naked Cake",
        price: "250 ₹",
        img: "https://images.unsplash.com/photo-1525253303688-ea125c110996?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 20,
        name: "Grand Royal",
        price: "600 ₹",
        img: "https://images.unsplash.com/photo-1562772386-89c02cc56315?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        featured: true,
      },
    ],
    "Special cakes": [
      {
        id: 21,
        name: "Matcha Green Tea",
        price: "95 ₹",
        img: "https://images.unsplash.com/photo-1534432182912-63863115e106?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 22,
        name: "Red Velvet",
        price: "105 ₹",
        img: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 23,
        name: "Lemon Drizzle",
        price: "85 ₹",
        img: "https://images.unsplash.com/photo-1519340333755-56e9c1d04579?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 24,
        name: "Vegan Delight",
        price: "115 ₹",
        img: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 25,
        name: "Chef Special",
        price: "180 ₹",
        img: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        featured: true,
      },
    ],
  };

  const handleNext = () => {
    if (currentIndex < catalogData[activeCategory].length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <section className="catalog-container">
      <h2 className="catalog-title">Catalog</h2>

      {/* Navigation Tabs */}
      <ul className="catalog-tabs">
        {categories.map((cat) => (
          <li
            key={cat}
            className={activeCategory === cat ? "active" : ""}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </li>
        ))}
      </ul>

      {/* The Cake Grid */}
      <div className="cake-grid">
        {catalogData[activeCategory].map((cake) => (
          <div
            key={cake.id}
            className={`cake-card ${cake.featured ? "featured" : ""}`}
          >
            <div className="image-wrapper">
              <img src={cake.img} alt={cake.name} />
            </div>
            <div className="cake-info">
              <h3>{cake.name}</h3>
              <span className="price">{cake.price}</span>
            </div>
          </div>
        ))}
      </div>

      {/* swiper slider */}
      <div className="catalog-slider">
        <SwiperSlider activeCategory={activeCategory} catalogData={catalogData} />
      </div>
    </section>
  );
};

export default Catalog;
