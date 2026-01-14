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

export default function SwiperSlider({ activeCategory, catalogData }) {
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
        {catalogData.map((cake) => (
          <SwiperSlide>
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
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
