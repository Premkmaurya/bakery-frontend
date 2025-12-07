import React from "react";
import { useForm } from "react-hook-form"; // Import the hook
import { Link } from "react-router-dom";
import "./RegisterForm.scss";

const ResiterForm = () => {
  // Destructure the magic tools from the hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // Watch the password field to validate confirm password
  const password = watch("password");

  // This function only runs if validation passes
  const onSubmit = (data) => {
    console.log("Login Data Submitted:", data);
    // Add your API login call here, e.g.:
    // loginUser(data.email, data.password);
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
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={errors.password ? "input-error" : ""}
              />
              {errors.password && (
                <span className="error-msg">{errors.password.message}</span>
              )}
            </div>

            {/* Re-enter Password Input */}
            <div className="form-group">
              <label htmlFor="confirm-password">Re-enter Password</label>
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
                <span className="error-msg">{errors.confirmPassword.message}</span>
              )}
            </div>

            {/* Google Login Button */}
            <div className="social-login">
              <p>login with:</p>
              <button
                type="button"
                className="google-btn"
                aria-label="Login with Google"
              >
                G
              </button>
            </div>

            {/* Submit Button (Missing in previous wireframe but essential!) */}
            <button type="submit" className="submit-btn">
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
