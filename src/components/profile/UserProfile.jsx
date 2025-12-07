import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, User, Package, MapPin, Lock, Plus } from 'lucide-react';
import './UserProfile.scss';


import PasswordManager from './password-manager/PasswordManager';
import PersonalInformation from './Information/PersonalInformation';
import ManageAddress from './address-manager/ManageAddress';
import MyOrders from './my-orders/MyOrders';
import AddProduct from './add-products/AddProduct';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('password'); // Default to Password Manager as per image

  // Function to render the content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInformation />;
      case 'orders':
        return <MyOrders />;
      case 'add products':
        return <AddProduct />;
      case 'address':
        return <ManageAddress />;
      case 'password':
        return <PasswordManager />;
      default:
        return <PasswordManager />;
    }
  };

  const menuItems = [
    { id: 'personal', label: 'Personal Information', icon: <User size={20} /> },
    { id: 'orders', label: 'My Orders', icon: <Package size={20} /> },
    { id: 'add products', label: 'Add Products', icon: <Plus size={20} /> },
    { id: 'address', label: 'Manage Address', icon: <MapPin size={20} /> },
    { id: 'password', label: 'Password Manager', icon: <Lock size={20} /> },
  ];

  return (
    <div className="user-profile-page">
      <div className="container">
        
        {/* Header Section */}
        <div className="profile-header">
          <h1 className="page-title">My Account</h1>
          <div className="breadcrumbs">
            <Link to="/">Home</Link> / <span>My Account</span>
          </div>
        </div>

        <div className="profile-layout">
          
          {/* === SIDEBAR MENU === */}
          <aside className="profile-sidebar">
            <nav className="sidebar-nav">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  {/* Optional: Add icons if you want, otherwise remove them */}
                  {/* <span className="icon">{item.icon}</span> */}
                  <span className="label">{item.label}</span>
                </button>
              ))}
              
              <button className="nav-item logout">
                <span className="label">Logout</span>
                <LogOut size={18} className="logout-icon"/>
              </button>
            </nav>
          </aside>

          {/* === MAIN CONTENT AREA === */}
          <main className="profile-content">
            {renderContent()}
          </main>

        </div>
      </div>
    </div>
  );
};

// === SUB-COMPONENT: PASSWORD MANAGER FORM ===


export default UserProfile;