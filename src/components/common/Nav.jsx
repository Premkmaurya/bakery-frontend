import "./nav.scss";
import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaVk,
  FaInstagram,
  FaSearch,
  FaShoppingCart,
  FaRegUser,
} from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useAuth } from "../../context/NavContext";

const Nav = () => {
  const { isLoggedIn, user } = useAuth();
  const [activeLink, setActiveLink] = useState("Home");
  const navigate = useNavigate();
  const location = useLocation();
  const navItems = ["Home", "Products", "About", "Contacts"];

  const navRef = useRef(null);

  // Update active link based on current URL path
  useEffect(() => {
    const currentPath = location.pathname.toLowerCase();

    // Map paths to nav items
    if (currentPath === "/" || currentPath === "/home") {
      setActiveLink("Home");
    } else if (currentPath.includes("products")) {
      setActiveLink("Products");
    } else if (currentPath.includes("about")) {
      setActiveLink("About");
    } else if (currentPath.includes("contacts")) {
      setActiveLink("Contacts");
    } else {
      setActiveLink("");
    }
  }, [location.pathname]);

  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".logo",
      {
        y: -100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power1.out",
      }
    )
      .fromTo(
        ".nav-links .links ",
        {
          y: -100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay: -0.5,
          ease: "power1.out",
          stagger: {
            amount: 0.3,
          },
        }
      )
      .fromTo(
        ".login-btn",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.9,
          delay: -0.5,
          ease: "power1.out",
        }
      )
      .fromTo(
        ".nav-icons",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.9,
          delay: -0.5,
          ease: "power1.out",
        }
      );
  }, []);

  useEffect(() => {
    const nav = navRef.current;

    gsap.fromTo(
      nav,
      { y: 0 },
      {
        y: -100,
        duration: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          start: "top top",
          end: 99999,
          onUpdate: (self) => {
            if (Math.abs(self.getVelocity()) < 50) return;

            if (self.direction === -1) {
              // scrolling down → show navbar
              gsap.to(nav, { y: 0, duration: 0.4, ease: "power3.out" });
            } else {
              // scrolling up → hide navbar
              gsap.to(nav, { y: -100, duration: 0.4, ease: "power3.out" });
            }
          },
        },
      }
    );

    return () => ScrollTrigger.killAll();
  }, []);

  return (
    <nav ref={navRef} className="navbar">
      <div className="logo">Cake Shop</div>

      <ul className="nav-links">
        {navItems.map((item) => (
          <Link
            to={`/${
              item.toLowerCase().replace(/\s+/g, "-") === "home"
                ? ""
                : item.toLowerCase().replace(/\s+/g, "-")
            }`}
            key={item}
            // 5. Dynamic Class: If this item matches the state, add 'active' class
            className={`links ${activeLink === item ? "active" : ""}`}
            // 6. Click Handler: Update the state when clicked
            onClick={() => setActiveLink(item)}
          >
            {item}
          </Link>
        ))}
      </ul>

      <div className="nav-actions">
        {!isLoggedIn ? (
          <button onClick={() => navigate("/login")} className="login-btn">
            Log In
          </button>
        ) : (
          <FaRegUser
            onClick={() => navigate("/profile")}
            className="nav-icons"
            size={20}
          />
        )}
        <div onClick={() => navigate("/cart")} className="nav-icons">
          <FaShoppingCart size={20} />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
