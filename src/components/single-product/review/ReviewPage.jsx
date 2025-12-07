import React, { useState } from 'react';
import './ReviewPage.scss';
import { Star, User, CheckCircle } from 'lucide-react';

const ReviewsPage = () => {
  // === MOCK DATA FOR REVIEWS ===
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Robert Karmazov",
      rating: 5,
      date: "2 days ago",
      text: "The cake was absolutely stunning! Not only did it look perfect for our wedding, but the taste was out of this world. Highly recommended!",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Alice M.",
      rating: 4,
      date: "1 week ago",
      text: "Great service and fast delivery. The cupcakes were moist and delicious. Taking off one star because the box was slightly dented.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "John Doe",
      rating: 5,
      date: "3 weeks ago",
      text: "Best bakery in town. The sourdough bread is authentic and the staff is super friendly.",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"
    }
  ]);

  // === FORM STATE ===
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    text: ''
  });

  // Handle Form Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Star Click in Form
  const handleRatingClick = (score) => {
    setFormData({ ...formData, rating: score });
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.rating === 0) {
      alert("Please select a star rating!");
      return;
    }
    alert("Thank you for your review! It has been submitted for moderation.");
    // Here you would send data to backend
    setFormData({ name: '', email: '', rating: 0, text: '' });
  };

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

  return (
    <section className="reviews-page-section">
      <div className="container">
        
        <h1 className="page-title">Customer Reviews</h1>

        {/* === TOP STATS AREA === */}
        <div className="stats-container">
          
          {/* Left: Progress Bars */}
          <div className="breakdown-col">
            <div className="rating-row">
              <span className="label">5 Stars</span>
              <div className="progress-bg"><div className="progress-fill" style={{width: '85%'}}></div></div>
              <span className="count">989</span>
            </div>
            <div className="rating-row">
              <span className="label">4 Stars</span>
              <div className="progress-bg"><div className="progress-fill" style={{width: '60%'}}></div></div>
              <span className="count">450</span>
            </div>
            <div className="rating-row">
              <span className="label">3 Stars</span>
              <div className="progress-bg"><div className="progress-fill" style={{width: '10%'}}></div></div>
              <span className="count">50</span>
            </div>
            <div className="rating-row">
              <span className="label">2 Stars</span>
              <div className="progress-bg"><div className="progress-fill" style={{width: '5%'}}></div></div>
              <span className="count">16</span>
            </div>
            <div className="rating-row">
              <span className="label">1 Star</span>
              <div className="progress-bg"><div className="progress-fill" style={{width: '2%'}}></div></div>
              <span className="count">8</span>
            </div>
          </div>

          {/* Right: Big Score Card */}
          <div className="score-col">
            <div className="big-score">4.8</div>
            <div className="stars-wrapper">
              {renderStars(5)}
            </div>
            <span className="total-ratings">Based on 1,513 Reviews</span>
          </div>

        </div>

        {/* === MAIN CONTENT GRID === */}
        <div className="content-grid">
          
          {/* === LEFT: RECENT FEEDBACKS === */}
          <div className="feedbacks-col">
            <h2 className="section-header">Recent Feedbacks</h2>
            
            <div className="feedback-list">
              {reviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-head">
                    <img src={review.avatar} alt={review.name} className="user-avatar" />
                    <div className="user-info">
                      <h4 className="user-name">{review.name}</h4>
                      <div className="user-rating">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <span className="review-date">{review.date}</span>
                  </div>
                  <p className="review-text">{review.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* === RIGHT: ADD REVIEW FORM === */}
          <div className="form-col">
            <h2 className="section-header">Add a Review</h2>
            
            <form className="review-form" onSubmit={handleSubmit}>
              
              {/* Interactive Rating */}
              <div className="form-group">
                <label>Your Rating *</label>
                <div className="star-input">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      size={24}
                      className="star-btn"
                      onClick={() => handleRatingClick(star)}
                      fill={star <= formData.rating ? "#ffc107" : "none"}
                      color={star <= formData.rating ? "#ffc107" : "#ccc"}
                    />
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="John Doe" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="john@example.com" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="form-group">
                <label>Write Your Review *</label>
                <textarea 
                  name="text" 
                  rows="5" 
                  placeholder="Tell us about your experience..." 
                  value={formData.text}
                  onChange={handleChange}
                  required
                ></textarea>
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