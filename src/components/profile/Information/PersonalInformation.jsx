import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Camera, ChevronDown } from 'lucide-react';
import './PersonalInformation.scss';
import { useAuth } from '../../../context/NavContext';
import { FaUser } from "react-icons/fa6";
import axios from 'axios';

const PersonalInformation = () => {
  const {user,updateUser} = useAuth();
  const [isLoading, setIsLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState('')
  const [avatarFile, setAvatarFile] = useState(null);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch
  } = useForm({
    defaultValues: {
      firstName: user?.firstName || 'Leslie',
      lastName: user?.lastName || 'Cooper',
      email: user?.email || '',
      phone: user?.phone || '',
      gender: user?.gender || 'Male',
    }
  });

  // Sync form with user data whenever user changes
  useEffect(() => {
    reset({
      firstName: user?.firstName || 'Leslie',
      lastName: user?.lastName || 'Cooper',
      email: user?.email || '',
      phone: user?.phone || '',
      gender: user?.gender || 'Male',
    });
    setImagePreview('');
    setAvatarFile(null);
  }, [user, reset]);

  // Handle Image Upload Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setAvatarFile(file);
    }
  };

  const onSubmit = async (formData) => {
    setIsLoading(true);
    const form = new FormData();
    form.append('firstName', formData.firstName);
    form.append('lastName', formData.lastName);
    form.append('phone', formData.phone);
    form.append('gender', formData.gender);
    if (avatarFile) {
      form.append('avatar', avatarFile);
    }
    
    try {
      const response = await axios.post('https://bakery-backend-two.vercel.app/user/update-profile', form, {
        withCredentials: true,
      });
      updateUser(response.data.user);
      setAvatarFile(null);
      setImagePreview('');
    } catch (error) {
      console.error('Update failed:', error);
    }
    setIsLoading(false);
  }

  return (
    <div className="personal-info-wrapper">
      {/* === AVATAR UPLOAD SECTION === */}
      <div className="avatar-section">
        <div className="avatar-wrapper">
          {imagePreview ? (
            <img src={imagePreview} alt="Profile" className="profile-img" />
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
      <form className="info-form" onSubmit={handleSubmit(onSubmit)}>
        
        {/* Row 1: Names */}
        <div className="form-row">
          <div className="form-group">
            <label>First Name *</label>
            <input 
              type="text" 
              {...register('firstName', { required: 'First name is required' })}
            />
            {errors.firstName && <span className="error">{errors.firstName.message}</span>}
          </div>
          <div className="form-group">
            <label>Last Name *</label>
            <input 
              type="text" 
              {...register('lastName', { required: 'Last name is required' })}
            />
            {errors.lastName && <span className="error">{errors.lastName.message}</span>}
          </div>
        </div>

        {/* Row 2: Email */}
        <div className="form-group">
          <label>Email *</label>
          <input 
            type="email" 
            disabled
            {...register('email')}
          />
        </div>

        {/* Row 3: Phone */}
        <div className="form-group">
          <label>Phone *</label>
          <span className='phone-prefix'>+91</span>
          <input 
            type="tel" 
            className='phone-input'
            maxLength={10}
            {...register('phone', {
              required: 'Phone is required',
              pattern: {
                value: /^\d{10}$/,
                message: 'Phone must be 10 digits'
              }
            })}
          />
          {errors.phone && <span className="error">{errors.phone.message}</span>}
        </div>

        {/* Row 4: Gender (Custom Select Look) */}
        <div className="form-group">
          <label>Gender *</label>
          <div className="select-wrapper">
            <select 
              {...register('gender', { required: 'Gender is required' })}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <ChevronDown className="select-icon" size={20} />
          </div>
          {errors.gender && <span className="error">{errors.gender.message}</span>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="update-btn">
          {isLoading ? "Updating..." : "Update Changes"}
        </button>

      </form>
    </div>
  );
};

export default PersonalInformation;