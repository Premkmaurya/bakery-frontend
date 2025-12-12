import React, { useState, useEffect } from 'react';
import { Camera, ChevronDown } from 'lucide-react';
import './PersonalInformation.scss';
import { useAuth } from '../../../context/NavContext';
import { FaUser } from "react-icons/fa6";
import axios from 'axios';

const PersonalInformation = () => {
  const {user,updateUser} = useAuth();
  const [isLoading, setIsLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState('')
  // Mock initial data
  const [formData, setFormData] = useState({
    firstName: user?.firstName || 'Leslie',
    lastName: user?.lastName || 'Cooper',
    email: user?.email || 'example@gmail.com',
    phone: user?.phone || '',
    gender: user?.gender || 'Male',
    avatar: user?.avatar || null,
  });

  // Sync formData with user whenever user data changes (when returning to tab)
  useEffect(() => {
    setFormData({
      firstName: user?.firstName || 'Leslie',
      lastName: user?.lastName || 'Cooper',
      phone: user?.phone || '',
      gender: user?.gender || 'Male',
      avatar: user?.avatar || null,
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle Image Upload Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFormData(prev => ({ ...prev, avatar: file }));
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const form = new FormData();
    form.append('firstName', formData.firstName);
    form.append('lastName', formData.lastName);
    form.append('phone', formData.phone);
    form.append('gender', formData.gender);
    form.append('avatar', formData.avatar);
    const response = await axios.post('http://localhost:3000/auth/update-profile', form, {
      withCredentials: true,
    });
    console.log('Profile updated:', response.data);
    setFormData(prev => ({ ...prev, ...response.data.user }));
    updateUser(response.data.user);
    setIsLoading(false);
  }

  return (
    <div className="personal-info-wrapper">
      {/* === AVATAR UPLOAD SECTION === */}
      <div className="avatar-section">
        <div className="avatar-wrapper">
          {imagePreview ? (
            <img src={imagePreview} alt="Profile" className="profile-img" />
          ) : formData.avatar ? (
            <img src={formData.avatar} alt="Profile" className="profile-img" />
          ) : user?.avatar ? (
            <img src={user.avatar} alt="Profile" className="profile-img" />
          ) : (
            <FaUser size={100} className="profile-img" />
          )}
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
            disabled
            value={formData.email} 
            onChange={handleChange} 
          />
        </div>

        {/* Row 3: Phone */}
        <div className="form-group">
          <label>Phone *</label>
          <span className='phone-prefix'>+91</span>
          <input 
            type="tel" 
            name="phone" 
            className='phone-input'
            maxLength={10}
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
        <button onClick={handleSubmit} className="update-btn">
          {isLoading ? "Updating..." : "Update Changes"}
        </button>

      </form>
    </div>
  );
};

export default PersonalInformation;