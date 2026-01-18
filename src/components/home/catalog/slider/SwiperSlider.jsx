import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./SwiperSlider.scss";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SwiperSlider({ activeCategory, catalogData }) {
  const navigate = useNavigate();

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        {catalogData.map((product) => (
          <SwiperSlide>
            <div
              key={product._id}
              className={`product-card ${product.featured ? "featured" : ""}`}
              onClick={() =>
                navigate(`/products/${product._id}`, { state: { product } })
              }
            >
              <div className="image-wrapper">
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <span className="price">
                  <IndianRupee className="rupee-icon" size={18} />
                  {product.price}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
