import { useState } from "react";
import { Eye, EyeOff, LogOut, User, Package, MapPin, CreditCard, Lock } from 'lucide-react';
import './PasswordManager.scss';

const PasswordManager = () => {
  // State for toggling visibility
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="password-manager-wrapper">
      <form className="password-form" onSubmit={(e) => e.preventDefault()}>
        
        {/* Current Password */}
        <div className="form-group">
          <label>Password *</label>
          <div className="input-wrapper">
            <input 
              type={showCurrent ? "text" : "password"} 
              placeholder="Enter Password"
            />
            <button 
              type="button" 
              className="toggle-btn"
              onClick={() => setShowCurrent(!showCurrent)}
            >
              {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
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
            />
            <button 
              type="button" 
              className="toggle-btn"
              onClick={() => setShowNew(!showNew)}
            >
              {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Confirm New Password */}
        <div className="form-group">
          <label>Confirm New Password</label>
          <div className="input-wrapper">
            <input 
              type={showConfirm ? "text" : "password"} 
              placeholder="Enter Password"
            />
            <button 
              type="button" 
              className="toggle-btn"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button className="save-btn">
          Update Password
        </button>

      </form>
    </div>
  );
};

export default PasswordManager;