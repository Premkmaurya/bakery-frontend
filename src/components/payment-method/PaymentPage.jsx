import React, { useState } from "react";
import {
  Wallet,
  ShieldCheck,
  IndianRupee,
} from "lucide-react";
import "./PaymentPage.scss";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/NavContext";
import { Notyf } from "notyf";

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // === STATE ===
  const [paymentMethod, setPaymentMethod] = useState("ONLINE"); // 'ONLINE' or 'COD'

  const notfy = new Notyf();

  const handlePayment = async () => {
    if (paymentMethod === "COD") {
      try {
        state.orderItems.map(async (item) => {
          const productId = item?.product?._id
            ? item.product._id
            : item?.productId?._id;

          const response = await axios.post(
            "https://bakeverse-bk.vercel.app/orders/createOrder",
            {
              productId: productId,
              quantity: item.quantity,
              address: state.selectedAddressId,
              total: state.total,
            },
            { withCredentials: true },
          );
        });
        navigate("/order-success");
        notfy.success("Order placed successfully!");
      } catch (error) {
        notfy.error("Order placement failed. Please try again.");
      }
      return;
    } else {
      try {
        const { data } = await axios.post(
          "https://bakeverse-bk.vercel.app/payment/create/orderId",
          { amount: state.total },
          { withCredentials: true },
        );

        // 2️⃣ Razorpay checkout open karo
        const options = {
          key: "RAZORPAY_KEY_ID",
          amount: data.amount,
          currency: "INR",
          order_id: data.id,

          handler: function (response) {
            notfy.success("Payment successful!");
            navigate("/order-success");
          },

          prefill: {
            name: addresses.find((a) => a._id === selectedAddressId)?.fullName,
            contact: addresses.find((a) => a._id === selectedAddressId)?.phone,
          },

          theme: { color: "#c2173e" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        notfy.error("Payment failed. Please try again.");
      }
    }
  };

  return (
    <div className="payment-page-wrapper">
      <div className="container">
        <h1 className="page-title">Payment Method</h1>

        <div className="payment-layout">
          {/* === LEFT: PAYMENT OPTIONS === */}
          <div className="payment-options">
            {/* Option 1: ONLINE */}
            <div
              className={`payment-card ${
                paymentMethod === "ONLINE" ? "selected" : ""
              }`}
              onClick={() => setPaymentMethod("ONLINE")}
            >
              <div className="card-header">
                <div className="radio-circle">
                  {paymentMethod === "ONLINE" && (
                    <div className="inner-circle"></div>
                  )}
                </div>
                <div className="header-text">
                  <h3>ONLINE</h3>
                  <p>Pay instantly using any ONLINE App</p>
                </div>
                <Wallet size={24} className="method-icon" />
              </div>
            </div>

            {/* Option 2: Cash on Delivery */}
            <div
              className={`payment-card ${
                paymentMethod === "COD" ? "selected" : ""
              }`}
              onClick={() => setPaymentMethod("COD")}
            >
              <div className="card-header">
                <div className="radio-circle">
                  {paymentMethod === "COD" && (
                    <div className="inner-circle"></div>
                  )}
                </div>
                <div className="header-text">
                  <h3>Cash on Delivery</h3>
                  <p>Pay with cash upon delivery</p>
                </div>
                <IndianRupee size={14} />
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
