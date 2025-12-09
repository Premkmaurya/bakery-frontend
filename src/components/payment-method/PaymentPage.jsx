import React, { useState } from 'react';
import { CreditCard, DollarSign, Wallet, CheckCircle, ShieldCheck } from 'lucide-react';
import './PaymentPage.scss';

const PaymentPage = () => {
  // === STATE ===
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' or 'cod'
  const [upiId, setUpiId] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  // === MOCK PRICE DATA ===
  const subTotal = 1200;
  const deliveryFee = 50;
  const discount = 100;
  const total = subTotal + deliveryFee - discount;

  // === HANDLERS ===
  const handleVerify = () => {
    if (upiId.includes('@')) {
      setIsVerified(true);
      alert("UPI ID Verified!");
    } else {
      alert("Please enter a valid UPI ID (e.g., user@bank)");
    }
  };

  const handlePayment = () => {
    if (paymentMethod === 'upi' && !isVerified) {
      alert("Please verify your UPI ID first.");
      return;
    }
    alert(`Processing payment of $${total} via ${paymentMethod === 'upi' ? 'UPI' : 'Cash on Delivery'}`);
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
              className={`payment-card ${paymentMethod === 'upi' ? 'selected' : ''}`}
              onClick={() => setPaymentMethod('upi')}
            >
              <div className="card-header">
                <div className="radio-circle">
                  {paymentMethod === 'upi' && <div className="inner-circle"></div>}
                </div>
                <div className="header-text">
                  <h3>UPI</h3>
                  <p>Pay instantly using any UPI App</p>
                </div>
                <Wallet size={24} className="method-icon" />
              </div>

              {/* UPI Form (Only visible if selected) */}
              {paymentMethod === 'upi' && (
                <div className="upi-form">
                  <div className="input-group">
                    <input 
                      type="text" 
                      placeholder="Enter UPI ID (e.g. user@oksbi)" 
                      value={upiId}
                      onChange={(e) => {
                        setUpiId(e.target.value);
                        setIsVerified(false); // Reset verification on change
                      }}
                    />
                    <button className="verify-btn" onClick={handleVerify}>
                      {isVerified ? "Verified" : "Verify"}
                    </button>
                  </div>
                  {isVerified && <p className="success-msg"><CheckCircle size={14} /> Verified Successfully</p>}
                </div>
              )}
            </div>

            {/* Option 2: Cash on Delivery */}
            <div 
              className={`payment-card ${paymentMethod === 'cod' ? 'selected' : ''}`}
              onClick={() => setPaymentMethod('cod')}
            >
              <div className="card-header">
                <div className="radio-circle">
                  {paymentMethod === 'cod' && <div className="inner-circle"></div>}
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
                <span>${subTotal}</span>
              </div>
              <div className="price-row">
                <span>Delivery Fee</span>
                <span>${deliveryFee}</span>
              </div>
              <div className="price-row discount">
                <span>Discount</span>
                <span>-${discount}</span>
              </div>
              
              <div className="divider"></div>
              
              <div className="price-row total">
                <span>Total Amount</span>
                <span>${total}</span>
              </div>

              <div className="security-badge">
                <ShieldCheck size={16} />
                <span>100% Secure Payment</span>
              </div>

              <button className="pay-btn" onClick={handlePayment}>
                Pay ${total}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PaymentPage;