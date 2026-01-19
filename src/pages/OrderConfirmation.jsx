import { useEffect, useState } from "react";
import {
  XCircle,
} from "lucide-react";
import "./OrderConfirmation.scss";
import { useLocation, useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const {state} = useLocation();
  // === STATE FOR DEMO (Toggle between 'success' and 'failed') ===
  const [status, setStatus] = useState(state?.status || "success"); // 'success' or 'failed'
  const navigate = useNavigate();

  useEffect(()=>{
    setTimeout(()=>{
      navigate("/products");
    }, 3000)
  },[])

  // Illustrations (Replace with your local assets if needed)
  const successImage =
    "https://cdn-icons-png.flaticon.com/512/7518/7518748.png"; // Delivery Scooter
  const errorImage =
    "https://cdn-icons-png.flaticon.com/512/11433/11433358.png"; // Sad/Error Illustration

  return (
    <div className={`confirmation-page-wrapper ${status}`}>

      <div className="container">
        <div className="confirmation-card">
          {/* === 1. VISUAL HEADER === */}
          <div className="status-icon-wrapper">
            {status !== "success" && (
              <div className="icon-circle failed">
                <XCircle size={40} strokeWidth={3} />
              </div>
            )}
            <img
              src={status === "success" ? successImage : errorImage}
              alt={status === "success" ? "Order Success" : "Payment Failed"}
              className="status-illustration"
            />
          </div>

          {/* === 2. TEXT CONTENT === */}
          <div className="text-content">
            <h1 className="title">
              {status === "success"
                ? "Order Confirmed!"
                : "Oh No, Payment Failed!"}
            </h1>
            <p className="subtitle">
              {status === "success"
                ? "Yay! Your delicious treats are being prepared and will be with you soon."
                : "Something went wrong while processing your payment. Don't worry, no money was deducted."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
