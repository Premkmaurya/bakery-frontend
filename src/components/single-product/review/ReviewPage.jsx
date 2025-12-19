import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "./ReviewPage.scss";
import { Star, User, CheckCircle, UserRound } from "lucide-react";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";
import axios from "axios";

const ReviewsPage = ({ product }) => {
  const [reviews, setReviews] = useState([]);

  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(SplitText);
  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    document.fonts.ready.then(() => {
      const split = new SplitText(".page-title", { type: "words,lines" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".reviews-page-section",
          start: "top 80%",
          end: "top 30%",
        },
      });
      tl.from(split.lines, {
        duration: 0.8,
        yPercent: 40,
        opacity: 0,
        stagger: 0.1,
        ease: "expo.out",
      }).fromTo(
        ".feedback-list .review-card",
        {
          yPercent: 50,
          opacity: 0,
        },
        {
          duration: 0.5,
          yPercent: 0,
          opacity: 1,
          ease: "expo.out",
          stagger: 0.2,
        },
        "-=0.8"
      )
    });
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await axios.get(
        `http://localhost:3000/reviews/get/${product._id}`,
        {
          withCredentials: true,
        }
      );
      setReviews(response.data);
    };
    fetchReviews();
  }, []);

  // === MOCK DATA FOR REVIEWS ===

  // === FORM STATE ===
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const rating = watch("rating");

  // Helper to render stars
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        fill={i < rating ? "#ffc107" : "none"} // Yellow fill
        color={i < rating ? "#ffc107" : "#e0e0e0"} // Yellow or Grey stroke
      />
    ));
  };

  // Calculate rating statistics from reviews
  const getRatingStats = () => {
    if (reviews.length === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
        ratingCounts: [0, 0, 0, 0, 0],
        ratingPercentages: [0, 0, 0, 0, 0],
      };
    }

    const ratingCounts = [0, 0, 0, 0, 0];
    let totalRating = 0;

    reviews.forEach((review) => {
      const ratingIndex = review.rating - 1;
      if (ratingIndex >= 0 && ratingIndex < 5) {
        ratingCounts[ratingIndex]++;
        totalRating += review.rating;
      }
    });

    const averageRating = (totalRating / reviews.length).toFixed(1);
    const ratingPercentages = ratingCounts.map((count) =>
      reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0
    );

    return {
      averageRating,
      totalReviews: reviews.length,
      ratingCounts,
      ratingPercentages,
    };
  };

  const stats = getRatingStats();

  const formHandler = async (data) => {
    if (data.rating === 0) {
      alert("Please select a star rating!");
      return;
    }
    const addReview = await axios.post(
      `http://localhost:3000/reviews/create/${product._id}`,
      data,
      {
        withCredentials: true,
      }
    );
    reset();
  };

  return (
    <section className="reviews-page-section">
      <div className="container">
        <h1 className="page-title">Customer Reviews</h1>

        {/* === TOP STATS AREA === */}
        <div className="stats-container">
          {/* Left: Progress Bars */}
          <div className="breakdown-col">
            {[5, 4, 3, 2, 1].map((starCount) => (
              <div key={starCount} className="rating-row">
                <span className="label">
                  {starCount} Star{starCount !== 1 ? "s" : ""}
                </span>
                <div className="progress-bg">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${stats.ratingPercentages[starCount - 1]}%`,
                    }}
                  ></div>
                </div>
                <span className="count">
                  {stats.ratingCounts[starCount - 1]}
                </span>
              </div>
            ))}
          </div>

          {/* Right: Big Score Card */}
          <div className="score-col">
            <div className="big-score">{stats.averageRating}</div>
            <div className="stars-wrapper">
              {renderStars(Math.round(stats.averageRating))}
            </div>
            <span className="total-ratings">
              Based on {stats.totalReviews} Review
              {stats.totalReviews !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* === MAIN CONTENT GRID === */}
        <div className="content-grid">
          {/* === LEFT: RECENT FEEDBACKS === */}
          <div className="feedbacks-col">
            <h2 className="section-header">Recent Feedbacks</h2>

            <div className="feedback-list">
              {reviews.map((review) => (
                <div key={review._id} className="review-card">
                  <div className="review-head">
                    {review.userId.imageUrl ? (
                      <img
                        src={review.userId.imageUrl}
                        alt={review.userId.name}
                        className="user-img"
                      />
                    ) : (
                      <UserRound className="user-logo" size={26} />
                    )}
                    <div className="user-info">
                      <h4 className="user-name">
                        {review.userId.firstName + " " + review.userId.lastName}
                      </h4>
                      <div className="user-rating">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <span className="review-date">
                      {dayjs(review.createdAt).fromNow()}
                    </span>
                  </div>
                  <p className="review-text">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* === RIGHT: ADD REVIEW FORM === */}
          <div className="form-col">
            <h2 className="section-header">Add a Review</h2>

            <form className="review-form" onSubmit={handleSubmit(formHandler)}>
              {/* Interactive Rating */}
              <div className="form-group">
                <label>Your Rating *</label>
                <div className="star-input">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={24}
                      className="star-btn"
                      onClick={() => setValue("rating", star)}
                      fill={star <= rating ? "#ffc107" : "none"}
                      color={star <= rating ? "#ffc107" : "#ccc"}
                      style={{ cursor: "pointer" }}
                    />
                  ))}
                </div>
                <input
                  type="hidden"
                  {...register("rating", {
                    required: "Please select a star rating",
                    min: { value: 1, message: "Please select a rating" },
                  })}
                />
                {errors.rating && (
                  <span className="error">{errors.rating.message}</span>
                )}
              </div>

              <div className="form-group">
                <label>Write Your Review *</label>
                <textarea
                  rows="5"
                  placeholder="Tell us about your experience..."
                  {...register("comment", {
                    required: "Review text is required",
                    minLength: {
                      value: 10,
                      message: "Review must be at least 10 characters",
                    },
                  })}
                ></textarea>
                {errors.comment && (
                  <span className="error">{errors.comment.message}</span>
                )}
              </div>

              <button type="submit" className="submit-btn">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsPage;
