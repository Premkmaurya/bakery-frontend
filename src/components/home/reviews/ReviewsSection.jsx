import React, { useState } from "react";
import "./review.scss"; // We will write this next
import { ArrowLeft, ArrowRight } from "lucide-react"; // Or use simple SVG icons

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const reviewsData = [
  {
    id: 1,
    name: "Anna",
    action: "Ordered a birthday cake for her daughter",
    review:
      "We wanted to make this day special! I'm grateful to your chefs, they make a special cake! We were satisfied with everything — communication with managers, fast delivery and the delicious cake. Thank you, we will definitely use your service again!",
    image:
      "https://images.unsplash.com/photo-1544168190-79c11e66b380?q=80&w=1000&auto=format&fit=crop", // Placeholder image
  },
  {
    id: 2,
    name: "Mark & Sarah",
    action: "Ordered a wedding cake",
    review:
      "The centerpiece of our wedding! Not only did it look absolutely stunning in the photos, but it tasted like heaven. The vanilla bean sponge was moist and perfect.",
    image:
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "James",
    action: "Ordered corporate cupcakes",
    review:
      "Professional service from start to finish. The branding on the cupcakes was precise, and the team loved the surprise treat. Highly recommended for events.",
    image:
      "https://images.unsplash.com/photo-1557925923-cd4648e211a0?q=80&w=1000&auto=format&fit=crop",
  },
];

const ReviewsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(SplitText);
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    document.fonts.ready.then(() => {
      const split = new SplitText(".section-title", { type: "words,lines" });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".reviews-section",
          start: "top 80%",
          end: "top 30%",
        },
      });
      tl.from(split.lines, {
        duration: 0.8,
        yPercent: 100,
        opacity: 0,
        stagger: 0.1,
        ease: "expo.out",
      });
    });
  }, []);

  // Animate slide content on mount and when currentIndex changes
  useGSAP(() => {
    const allCards = document.querySelectorAll(".review-card");
    const currentCard = allCards[currentIndex];

    if (!currentCard) return;

    const image = currentCard.querySelector(".card-image-wrapper");
    const content = currentCard.querySelector(".card-content");

    const tl = gsap.timeline();
    tl.from(
      image,
      {
        duration: 0.8,
        xPercent: -100,
        opacity: 0,
        ease: "expo.out",
      },
      0
    ).from(
      content,
      {
        duration: 0.8,
        xPercent: 100,
        opacity: 0,
        ease: "expo.out",
      },
      0
    );
  }, [currentIndex]);

  // Logic to go to the next slide
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === reviewsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Logic to go to the previous slide
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviewsData.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="reviews-section">
      <div className="container">
        {/* Header: Title + Controls */}
        <div className="reviews-header">
          <h2 className="section-title">Reviews</h2>

          <div className="slider-controls">
            <button
              className="control-btn"
              onClick={handlePrev}
              aria-label="Previous Review"
            >
              <ArrowLeft size={20} />
            </button>

            <span className="counter">
              {currentIndex + 1} / {reviewsData.length}
            </span>

            <button
              className="control-btn"
              onClick={handleNext}
              aria-label="Next Review"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* The Slider Window */}
        <div className="reviews-slider-window">
          {/* The Track that moves left/right */}
          <div
            className="reviews-track"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {reviewsData.map((review) => (
              <article key={review.id} className="review-card">
                <div className="card-image-wrapper">
                  <img src={review.image} alt={`${review.name}'s review`} />
                </div>

                <div className="card-content">
                  <h3 className="reviewer-name">{review.name}</h3>
                  <p className="reviewer-action">{review.action}</p>
                  <blockquote className="reviewer-text">
                    "{review.review}"
                  </blockquote>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
