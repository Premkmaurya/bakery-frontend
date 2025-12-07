import "./nav.scss"
import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaFacebookF, FaVk, FaInstagram, FaSearch } from 'react-icons/fa';

const Nav = () => {
  const [activeLink, setActiveLink] = useState('Home');
  const navigate = useNavigate();
  const location = useLocation();
  const navItems = ['Home', 'Products', 'How to order', 'About', 'Contacts'];

  // Update active link based on current URL path
  useEffect(() => {
    const currentPath = location.pathname.toLowerCase();
    
    // Map paths to nav items
    if (currentPath === '/' || currentPath === '/home') {
      setActiveLink('Home');
    } else if (currentPath.includes('products')) {
      setActiveLink('Products');
    } else if (currentPath.includes('how-to-order')) {
      setActiveLink('How to order');
    } else if (currentPath.includes('about')) {
      setActiveLink('About');
    } else if (currentPath.includes('contacts')) {
      setActiveLink('Contacts');
    }
  }, [location.pathname]);
  return (
    <nav className="navbar">
      <div className="logo">Cake Shop</div>

      <ul className="nav-links">
      {navItems.map((item) => (
          <Link
            to={`/${(item.toLowerCase().replace(/\s+/g, '-')=== 'home') ? '' : item.toLowerCase().replace(/\s+/g, '-')}`}
            key={item}
            // 5. Dynamic Class: If this item matches the state, add 'active' class
            className={`links ${activeLink === item ? 'active' : ''}`}
            // 6. Click Handler: Update the state when clicked
            onClick={() => setActiveLink(item)}
          >
            {item}
          </Link>
        ))}
      </ul>

      <button onClick={()=>navigate('/login')} className="login-btn">
        Log In
      </button>
    </nav>
  )
}

export default Nav
