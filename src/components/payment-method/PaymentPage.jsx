import React, { useState } from "react";
import {
  CreditCard,
  DollarSign,
  Wallet,
  CheckCircle,
  ShieldCheck,
} from "lucide-react";
import "./PaymentPage.scss";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  // === STATE ===
  const [paymentMethod, setPaymentMethod] = useState("upi"); // 'upi' or 'cod'
  const [upiId, setUpiId] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // === HANDLERS ===
  const handleVerify = () => {
    if (upiId.includes("@")) {
      setIsVerified(true);
      alert("UPI ID Verified!");
    } else {
      alert("Please enter a valid UPI ID (e.g., user@bank)");
    }
  };

  const handlePayment = () => {
    if (paymentMethod === "upi" && !isVerified) {
      alert("Please verify your UPI ID first.");
      return;
    }

    // create order API call
    state.orderItems.map(async (item) => {
      const productId = item.productId?._id || item.product?._id;
      if (!productId) {
        console.error("Invalid product data:", item);
        alert("Some items in your cart have invalid product data.");
        return;
      }

      const orderData = {
        productId,
        quantity: item.quantity,
      };

      try {
        const response = await axios.post(
          "http://localhost:3000/orders/createOrder",
          orderData,
          {
            withCredentials: true,
          }
        );
      } catch (error) {
        console.error("Error placing order:", error);
        throw new Error("Order placement failed");
      }
    });
    navigate("/profile")
  };

  return (
    <div className="payment-page-wrapper">
      <div className="container">
        <h1 className="page-title">Payment Method</h1>

        <div className="payment-layout">
          {/* === LEFT: PAYMENT OPTIONS === */}
          <div className="payment-options">
            {/* Option 1: UPI */}
            <div
              className={`payment-card ${
                paymentMethod === "upi" ? "selected" : ""
              }`}
              onClick={() => setPaymentMethod("upi")}
            >
              <div className="card-header">
                <div className="radio-circle">
                  {paymentMethod === "upi" && (
                    <div className="inner-circle"></div>
                  )}
                </div>
                <div className="header-text">
                  <h3>UPI</h3>
                  <p>Pay instantly using any UPI App</p>
                </div>
                <Wallet size={24} className="method-icon" />
              </div>
            </div>

            {/* Option 2: Cash on Delivery */}
            <div
              className={`payment-card ${
                paymentMethod === "cod" ? "selected" : ""
              }`}
              onClick={() => setPaymentMethod("cod")}
            >
              <div className="card-header">
                <div className="radio-circle">
                  {paymentMethod === "cod" && (
                    <div className="inner-circle"></div>
                  )}
                </div>
                <div className="header-text">
                  <h3>Cash on Delivery</h3>
                  <p>Pay with cash upon delivery</p>
                </div>
                <DollarSign size={24} className="method-icon" />
              </div>
            </div>
          </div>

          {/* === RIGHT: PRICE SUMMARY === */}
          <div className="price-summary-sidebar">
            <div className="summary-card">
              <h2 className="summary-title">Price Details</h2>

              <div className="price-row">
                <span>Subtotal</span>
                <span>₹{state?.subTotal || 0}</span>
              </div>
              <div className="price-row">
                <span>Delivery Fee</span>
                <span>₹{state?.deliveryFee || 0}</span>
              </div>
              <div className="price-row discount">
                <span>Discount</span>
                <span>-₹{state?.discount || 0}</span>
              </div>

              <div className="divider"></div>

              <div className="price-row total">
                <span>Total Amount</span>
                <span>₹{state?.total || 0}</span>
              </div>

              <div className="security-badge">
                <ShieldCheck size={16} />
                <span>100% Secure Payment</span>
              </div>

              <button className="pay-btn" onClick={handlePayment}>
                Order ₹{state?.total || 0}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
