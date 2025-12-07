import React, { useState } from 'react';
import { Camera, ChevronDown } from 'lucide-react';
import './PersonalInformation.scss';

const PersonalInformation = () => {
  // Mock initial data
  const [formData, setFormData] = useState({
    firstName: 'Leslie',
    lastName: 'Cooper',
    email: 'example@gmail.com',
    phone: '+0123-456-789',
    gender: 'Female',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle Image Upload Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, avatar: imageUrl }));
    }
  };

  return (
    <div className="personal-info-wrapper">
      {/* === AVATAR UPLOAD SECTION === */}
      <div className="avatar-section">
        <div className="avatar-wrapper">
          <img src={formData.avatar} alt="Profile" className="profile-img" />
          
          {/* The Edit Button is actually a label for the hidden file input */}
          <label htmlFor="avatar-upload" className="edit-badge">
            <Camera size={18} />
            <input 
              type="file" 
              id="avatar-upload" 
              accept="image/*" 
              onChange={handleImageChange}
              hidden 
            />
          </label>
        </div>
      </div>

      {/* === FORM SECTION === */}
      <form className="info-form" onSubmit={(e) => e.preventDefault()}>
        
        {/* Row 1: Names */}
        <div className="form-row">
          <div className="form-group">
            <label>First Name *</label>
            <input 
              type="text" 
              name="firstName" 
              value={formData.firstName} 
              onChange={handleChange} 
            />
          </div>
          <div className="form-group">
            <label>Last Name *</label>
            <input 
              type="text" 
              name="lastName" 
              value={formData.lastName} 
              onChange={handleChange} 
            />
          </div>
        </div>

        {/* Row 2: Email */}
        <div className="form-group">
          <label>Email *</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
          />
        </div>

        {/* Row 3: Phone */}
        <div className="form-group">
          <label>Phone *</label>
          <input 
            type="tel" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
          />
        </div>

        {/* Row 4: Gender (Custom Select Look) */}
        <div className="form-group">
          <label>Gender *</label>
          <div className="select-wrapper">
            <select 
              name="gender" 
              value={formData.gender} 
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <ChevronDown className="select-icon" size={20} />
          </div>
        </div>

        {/* Submit Button */}
        <button className="update-btn">
          Update Changes
        </button>

      </form>
    </div>
  );
};

export default PersonalInformation;