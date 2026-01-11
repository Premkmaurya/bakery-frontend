import React from "react";
import "./terms.scss";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Terms = () => {
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(SplitText);
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    // Wait for fonts to load before running animations
    document.fonts.ready.then(() => {
      const split = new SplitText(".section-title", { type: "words,lines" });
      const split1 = new SplitText(".delivery-list li", {
        type: "words,lines",
      });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".delivery-section",
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
      })
        .from(
          split1.lines,
          {
            duration: 0.8,
            yPercent: 100,
            opacity: 0,
            stagger: 0.1,
            ease: "expo.out",
          },
          "-=0.6"
        )
        .from(
          ".delivery-image img",
          {
            duration: 1,
            scale: 1.2,
            opacity: 0,
            ease: "expo.out",
          },
          "-=1"
        );
    });
  }, []);

  return (
    <section className="delivery-section">
      <div className="delivery-content">
        <h2 className="section-title">Delivery terms</h2>

        <ul className="delivery-list">
          <li>
            We use the speediest delivery methods to ensure your goodies arrive
            in perfect condition to devour
          </li>
          <li>Please allow between 2-3 working days from placing your order</li>
          <li>
            All of our celebration cakes will be delivered to you on your chosen
            delivery date
          </li>
          <li>
            Cakes can be stored in the fridge for 5 days and up to two weeks in
            the freezer
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
  );
};

export default Terms;
