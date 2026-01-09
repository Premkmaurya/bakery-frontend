import React from "react";
import { useForm } from "react-hook-form"; // Import the hook
import { Link, useNavigate } from "react-router-dom";
import "./RegisterForm.scss";
import axios from "axios";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";


import { Notyf } from "notyf";


import { useAuth } from "../../context/NavContext";

// Strong password regex: at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
const STRONG_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const ResiterForm = () => {
  const navigate = useNavigate();
  // Destructure the magic tools from the hook
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(SplitText);

  const { setIsLoggedIn } = useAuth();

  const notfy = new Notyf();

  // === GSAP ANIMATIONS ===

  useGSAP(() => {
    document.fonts.ready.then(() => {
      const split = new SplitText(".login-title", { type: "words,lines" });

      const tl = gsap.timeline({
        defaults: {
          duration: 0.7,
          ease: "expo.out",
        },
      });
      tl.from(split.lines, {
        duration: 0.8,
        yPercent: 60,
        opacity: 0,
        stagger: 0.1,
      })
        .from(
          ".form-group",
          {
            y: 30,
            opacity: 0,
            stagger: 0.2,
          },
          "-=0.4"
        )
        .from(
          ".social-login",
          {
            y: 30,
            opacity: 0,
          },
          "-=0.6"
        )
        .from(
          ".submit-btn",
          {
            y: 30,
            opacity: 0,
          },
          "-=0.6"
        )
        .from(
          ".register-link",
          {
            y: 30,
            opacity: 0,
          },
          "-=0.6"
        );
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // Watch the password field to validate confirm password
  const password = watch("password");

  // Calculate password strength
  const getPasswordStrength = (pwd) => {
    if (!pwd) return 0;
    let strength = 0;
    if (pwd.length >= 8) strength += 25;
    if (/[a-z]/.test(pwd)) strength += 25;
    if (/[A-Z]/.test(pwd)) strength += 25;
    if (/\d/.test(pwd)) strength += 12.5;
    if (/@$!%*?&/.test(pwd)) strength += 12.5;
    return Math.min(strength, 100);
  };

  const passwordStrength = getPasswordStrength(password);

  const getStrengthColor = () => {
    if (passwordStrength < 25) return "#ff4444";
    if (passwordStrength < 50) return "#ff9800";
    if (passwordStrength < 75) return "#ffc107";
    return "#4caf50";
  };

  // This function only runs if validation passes
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://bakery-backend-two.vercel.app/auth/register",
        data,
        {
          withCredentials: true,
        }
      );
      setIsLoggedIn(true);
      console.log("Registration successful:", response.data);
      window.location.href = "/";
      notfy.success("Registration Successful");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const googleRegister = () => {
    window.location.href = "https://bakery-backend-two.vercel.app/auth/google";
  };


  const loginImage =
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop";

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        {/* === FORM SECTION === */}
        <div className="form-section">
          <h2 className="login-title">Register</h2>

          {/* We pass handleSubmit(onSubmit) to the form */}
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            {/* name input */}
            <div className="name-group">
              <div>
                <label htmlFor="first-name">Name</label>
                <input
                  id="first-name"
                  type="text"
                  placeholder="John"
                  // The "register" function connects the input to the hook
                  {...register("firstName", {
                    required: "Name is required",
                  })}
                  // Add a class if there is an error for styling
                  className={errors.firstName ? "input-error" : ""}
                />
                {/* Show error message if it exists */}
                {errors.firstName && (
                  <span className="error-msg">{errors.firstName.message}</span>
                )}
              </div>
              <div>
                <label htmlFor="last-name">Last Name</label>
                <input
                  id="last-name"
                  type="text"
                  placeholder="Doe"
                  // The "register" function connects the input to the hook
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  // Add a class if there is an error for styling
                  className={errors.lastName ? "input-error" : ""}
                />
                {/* Show error message if it exists */}
                {errors.lastName && (
                  <span className="error-msg">{errors.lastName.message}</span>
                )}
              </div>
            </div>
            {/* Email Input */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="test@gmail.com"
                // The "register" function connects the input to the hook
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                // Add a class if there is an error for styling
                className={errors.email ? "input-error" : ""}
              />
              {/* Show error message if it exists */}
              {errors.email && (
                <span className="error-msg">{errors.email.message}</span>
              )}
            </div>

            {/* Password Input */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="********"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: STRONG_PASSWORD_REGEX,
                    message: "Password must be at least 8 characters with uppercase, lowercase, number & special char (@$!%*?&)",
                  },
                })}
                className={errors.password ? "input-error" : ""}
              />
              {errors.password && (
                <span className="error-msg">{errors.password.message}</span>
              )}
              
              {/* Password Strength Bar */}
              {password && (
                <div className="password-strength">
                  <div className="strength-bar-bg">
                    <div 
                      className="strength-bar-fill" 
                      style={{
                        width: `${passwordStrength}%`,
                        backgroundColor: getStrengthColor(),
                        transition: "all 0.3s ease"
                      }}
                    ></div>
                  </div>
                  <span className="strength-label" style={{ color: getStrengthColor() }}>
                    {passwordStrength < 25 ? "Weak" : passwordStrength < 50 ? "Fair" : passwordStrength < 75 ? "Good" : "Strong"}
                  </span>
                </div>
              )}
            </div>

            {/* Re-enter Password Input */}
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                id="confirm-password"
                type="password"
                placeholder="********"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className={errors.confirmPassword ? "input-error" : ""}
              />
              {errors.confirmPassword && (
                <span className="error-msg">
                  {errors.confirmPassword.message}
                </span>
              )}

            </div>

            {/* Google Login Button */}
            <div className="social-login">
              <p>Register with:</p>
              <button
                onClick={googleRegister}
                type="button"
                className="google-btn"
                aria-label="Login with Google"
              >
                G
              </button>
            </div>

            {/* Submit Button (Missing in previous wireframe but essential!) */}
            <button
              type="submit"
              className="submit-btn"
            >
              Register
            </button>

            {/* Login Link */}
            <p className="register-link">
              already have an account? <Link to="/login">login</Link>
            </p>
          </form>
        </div>

        {/* === IMAGE SECTION === */}
        <div className="image-section">
          <img src={loginImage} alt="Delicious bakery treats" />
          <div className="image-overlay"></div>
        </div>
      </div>
    </div>
  );
};

export default ResiterForm;
