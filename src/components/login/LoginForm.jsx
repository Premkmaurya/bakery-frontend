import React, { useState } from "react";
import { useForm } from "react-hook-form"; // Import the hook
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.scss";
import axios from "axios";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { Notyf } from "notyf";

import { useAuth } from "../../context/NavContext";

const Form = () => {
  const navigate = useNavigate();
  // Destructure the magic tools from the hook

  const { setIsLoggedIn } = useAuth();

  const notfy = new Notyf();
  const [isLoading, setIsLoading] = useState(false);

  // === GSAP ANIMATIONS ===

  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(SplitText);

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
  } = useForm();

  // This function only runs if validation passes
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://bakery-backend-two.vercel.app/auth/login",
        data,
        {
          withCredentials: true,
        }
      );
      setIsLoading(false);
      setIsLoggedIn(true);
      navigate("/");
      notfy.success("Login Successful");
    } catch (error) {
      setIsLoading(false);
      notfy.error(error.response.data.message || "Login Failed");
      console.error("Login error:", error);
    }
  };

  const googleLogin = () => {
    window.location.href = "https://bakery-backend-two.vercel.app/auth/google";
  };

  const loginImage =
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop";

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        {/* === FORM SECTION === */}
        <div className="form-section">
          <h2 className="login-title">Login</h2>

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

            {/* Google Login Button */}
            <div className="social-login">
              <p>login with:</p>
              <button
                onClick={googleLogin}
                type="button"
                className="google-btn"
                aria-label="Login with Google"
              >
                G
              </button>
            </div>

            {/* Submit Button (Missing in previous wireframe but essential!) */}
            <button type="submit" className="submit-btn">
              {isLoading ? "Logging in..." : "Login"}
            </button>

            {/* Register Link */}
            <p className="register-link">
              don't have an account? <Link to="/register">register</Link>
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

export default Form;
