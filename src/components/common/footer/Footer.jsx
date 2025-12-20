import React from 'react';
import './footer.scss';
import { Link } from 'react-router-dom'; // Import the Link component
import { Facebook, Instagram, Globe, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">

        {/* === PART 1: DELIVERY SECTION === */}

        {/* === PART 2: FOOTER LINKS === */}
        <div className="footer-links">

          {/* Column 1: Brand & Socials (External links stay as <a>) */}
          <div className="footer-col brand-col">
            <h3 className="footer-heading">Cake Shop</h3>
            <div className="social-icons">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://vk.com"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
                aria-label="VK"
              >
                <Globe size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Menu (Internal links become <Link>) */}
          <div className="footer-col menu-col">
            <h3 className="footer-heading">Menu</h3>
            <div className="menu-lists-wrapper">
              <ul className="link-list">
                {/* Assuming these map to routes in your App.js */}
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Catalog</Link></li>
              </ul>
              <ul className="link-list">
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contacts">Contact</Link></li>
              </ul>
              <ul className="link-list">
                <li><Link to="/cart">Cart</Link></li>
                <li><Link to="/term">Term & Conditions</Link></li>
              </ul>
            </div>
          </div>

          {/* Column 3: Contacts (System protocols stay as <a>) */}
          <div className="footer-col contact-col">
            <h3 className="footer-heading">Contacts</h3>
            <ul className="contact-list">
              <li>
                {/* tel: needs to remain an anchor tag */}
                <a href="tel:+7495888999">+7 (495) 888-999</a>
              </li>
              <li>
                {/* mailto: needs to remain an anchor tag */}
                <a href="mailto:sweet@cake.com">sweet@cake.com</a>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
