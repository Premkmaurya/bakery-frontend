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
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { IoIosClose } from "react-icons/io";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useAuth } from "../../context/NavContext";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const Nav = () => {
  const { isLoggedIn, user } = useAuth();
  const [activeLink, setActiveLink] = useState("Home");
  const navigate = useNavigate();
  const location = useLocation();
  const animateRef = useRef(null);
  const navItems = ["Home", "Products", "About", "Contacts"];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
  useEffect(() => {
    gsap.fromTo(
      ".nav-sidebar",
      { left: "100%" },
      {
        left: 0,
        duration: 0.5,
        ease: "ease-in-out",
      }
    );
  }, [isSidebarOpen]);

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

      {isSidebarOpen ? (
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
      ) : (
        <HiMiniBars3BottomRight
          size={30}
          className="menu-icon"
          onClick={() => setIsSidebarOpen(true)}
        />
      )}
      {isSidebarOpen && (
        <div ref={animateRef} className="nav-sidebar">
          <div className="sidebar-logo">
            <div className="logo">Cake Shop</div>
            <div className="close-icon">
              <IoIosClose size={40} onClick={() => setIsSidebarOpen(false)} />
            </div>
          </div>
          <div className="sidebar-container">
            <ul className="sidebar-links">
              {navItems.map((item, index) => {
                // Safe handling for string generation
                const itemText = typeof item === "string" ? item : String(item);
                const urlSlug = itemText.toLowerCase().replace(/\s+/g, "-");
                const toPath = urlSlug === "home" ? "/" : `/${urlSlug}`;

                return (
                  <Link
                    to={toPath}
                    key={itemText || index}
                    className={`links ${
                      activeLink === itemText ? "active" : ""
                    }`}
                    onClick={() => isSidebarOpen(false)}
                  >
                    <div className="roll-wrapper">
                      <span className="roll-item">{itemText}</span>
                      <span className="roll-item clone" aria-hidden="true">
                        {itemText}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </ul>
          </div>
          <div className="sidebar-bottom">
            <div className="social-links">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebookF size={20} />
              </a>
              <a href="https://www.vk.com" target="_blank" rel="noreferrer">
                <FaVk size={20} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
