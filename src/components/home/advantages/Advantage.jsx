import React from "react";
import "./advantage.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Advantages = () => {
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(SplitText);
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    document.fonts.ready.then(() => {
      const split = new SplitText(".advantage-title", { type: "words,lines" });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".advantages-container",
          start: "top 80%",
        },
      });
      tl.from(split.lines, {
        duration: 0.8,
        yPercent: 100,
        opacity: 0,
        stagger: 0.1,
        ease: "expo.out",
      }).from(
        ".advantage-card",
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
    });
  }, []);

  const advantagesData = [
    {
      id: 1,
      title: "High quality",
      description: "Handmade cake & natural ingredients",
      img: "https://images.unsplash.com/photo-1516919549054-e08258825f80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      title: "Sweet gift",
      description: "Delicious macaron gift box for each client",
      img: "https://images.unsplash.com/photo-1558326567-98ae2405596b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      title: "Fast delivery",
      description: "Same-day cake delivery in your city",
      img: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <>
      <section className="advantages-container">
        <h2 className="advantage-title">Our advantages</h2>

        <div className="advantages-grid">
          {advantagesData.map((item, idx) => (
            <div
              className={`advantage-card ${item.id == 2 ? "top" : ""}`}
              key={idx}
            >
              <div className="image-circle">
                <img src={item.img} alt={item.title} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Advantages;
