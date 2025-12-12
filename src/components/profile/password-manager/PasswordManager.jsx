import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from 'lucide-react';
import './PasswordManager.scss';

const PasswordManager = () => {
  // State for toggling visibility
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  const newPassword = watch('newPassword');

  const onSubmit = async (data) => {
    const response = await axios.patch(
      "http://localhost:3000/user/update-password",
      data,
      {
        withCredentials: true,
      }
    );

    reset();
  };

  return (
    <div className="password-manager-wrapper">
      <form className="password-form" onSubmit={handleSubmit(onSubmit)}>
        
        {/* Current Password */}
        <div className="form-group">
          <label>Password *</label>
          <div className="input-wrapper">
            <input 
              type={showCurrent ? "text" : "password"} 
              placeholder="Enter Password"
              {...register('oldPassword', { required: 'Current password is required' })}
            />
            <button 
              type="button" 
              className="toggle-btn"
              onClick={() => setShowCurrent(!showCurrent)}
            >
              {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.oldPassword && <span className="error">{errors.oldPassword.message}</span>}
          <div className="forgot-link-wrapper">
            <a href="#" className="forgot-link">Forgot Password?</a>
          </div>
        </div>

        {/* New Password */}
        <div className="form-group">
          <label>New Password</label>
          <div className="input-wrapper">
            <input 
              type={showNew ? "text" : "password"} 
              placeholder="Enter Password"
              {...register('newPassword', {
                required: 'New password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters'
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  message: 'Password must contain uppercase, lowercase, and number'
                }
              })}
            />
            <button 
              type="button" 
              className="toggle-btn"
              onClick={() => setShowNew(!showNew)}
            >
              {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.newPassword && <span className="error">{errors.newPassword.message}</span>}
        </div>

        {/* Confirm New Password */}
        <div className="form-group">
          <label>Confirm New Password</label>
          <div className="input-wrapper">
            <input 
              type={showConfirm ? "text" : "password"} 
              placeholder="Enter Password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: value => value === newPassword || 'Passwords do not match'
              })}
            />
            <button 
              type="button" 
              className="toggle-btn"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
        </div>

        <button type="submit" className="save-btn">
          Update Password
        </button>

      </form>
    </div>
  );
};

export default PasswordManager;