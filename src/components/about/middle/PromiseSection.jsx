import React from 'react';
import './promiseSection.scss';
import { ChefHat, Heart, Tag, Award } from 'lucide-react';

const PromiseSection = () => {
  const promises = [
    {
      id: 1,
      icon: <ChefHat size={40} />, // Represents "Recipes"
      title: "AUTHENTIC RECIPES",
      text: "Our products are based on traditional home-style recipes, using fresh ingredients."
    },
    {
      id: 2,
      icon: <Heart size={40} />, // Represents "Love"
      title: "BAKED WITH LOVE",
      text: "Our passion for baking is poured into every recipe, serving smiles on a plate everyday."
    },
    {
      id: 3,
      icon: <Tag size={40} />, // Represents "Price"
      title: "HONESTLY PRICED",
      text: "We constantly strive to offer the best products at the right prices."
    },
    {
      id: 4,
      icon: <Award size={40} />, // Represents "Quality"
      title: "COMMITTED TO QUALITY",
      text: "From our ingredients to our kitchen operations & guest services, we always prioritize quality."
    }
  ];

  return (
    <section className="our-promise-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="promise-header">
          <h2 className="section-title">Our Promise</h2>
          {/* Decorative Separator */}
          <div className="separator">
            <span>♦</span><span>♦</span><span>♦</span><span>♦</span>
          </div>
        </div>

        {/* The Grid of Items */}
        <div className="promise-grid">
          {promises.map((item) => (
            <div key={item.id} className="promise-item">
              <div className="icon-wrapper">
                {item.icon}
              </div>
              <h3 className="item-title">{item.title}</h3>
              <p className="item-text">{item.text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PromiseSection;