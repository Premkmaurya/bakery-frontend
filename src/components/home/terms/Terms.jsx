import React from "react";
import './terms.scss';

const Terms = () => {
  return (
    <div>
      {" "}
      <section className="delivery-section">
        <div className="delivery-content">
          <h2 className="section-title">Delivery terms</h2>

          <ul className="delivery-list">
            <li>
              We use the speediest delivery methods to ensure your goodies
              arrive in perfect condition to devour
            </li>
            <li>
              Please allow between 2-3 working days from placing your order
            </li>
            <li>
              All of our celebration cakes will be delivered to you on your
              chosen delivery date
            </li>
            <li>
              Cakes can be stored in the fridge for 5 days and up to two weeks
              in the freezer
            </li>
          </ul>
        </div>

        <div className="delivery-image">
          <img
            src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1000&auto=format&fit=crop"
            alt="Delicious strawberry cream cake top view"
          />
        </div>
      </section>
    </div>
  );
};

export default Terms;
