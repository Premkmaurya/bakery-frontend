import React, { useState } from 'react';
import { Trash2, Info } from 'lucide-react'; // Using lucide-react for icons
import './CartPage.scss';
import { useNavigate } from 'react-router-dom';

// Mock data for the cart items based on your image
const initialCartItems = [
  {
    id: 1,
    name: 'Furniture Set',
    variant: 'Set : Colour: Coffee',
    price: 437,
    quantity: 4,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=200&auto=format&fit=crop', // Placeholder image
  },
  {
    id: 2,
    name: 'Vintage Dining Set',
    variant: 'Set : Colour: Brown',
    price: 945,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=200&auto=format&fit=crop', // Placeholder image
  },
  {
    id: 3,
    name: 'Studio Chair',
    variant: 'Set : Colour: Deep Green',
    price: 597,
    quantity: 7,
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=200&auto=format&fit=crop', // Placeholder image
  },
];

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [voucherCode, setVoucherCode] = useState('');

  // Function to handle quantity changes
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Function to remove an item from the cart
  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Calculate cart summary totals
  const subTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountPercentage = 10; // 10% discount as per image
  const discountAmount = (subTotal * discountPercentage) / 100;
  const deliveryFee = 50;
  const total = subTotal - discountAmount + deliveryFee;

  return (
    <div className="shopping-cart-page">
      <div className="container">
        <h1 className="page-title">Shopping Cart</h1>
        <div className="cart-layout">
          
          {/* Cart Items List (Left Side) */}
          <div className="cart-items-list">
            <div className="cart-header">
              <span className="header-product">Product Code</span>
              <span className="header-quantity">Quantity</span>
              <span className="header-total">Total</span>
              <span className="header-action">Action</span>
            </div>
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            ))}
          </div>

          {/* Cart Summary (Right Side) */}
          <div className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>
            
            <div className="voucher-section">
              <input
                type="text"
                placeholder="Discount voucher"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                className="voucher-input"
              />
              <button className="apply-btn">Apply</button>
            </div>

            <div className="summary-row">
              <span>Sub Total</span>
              <span>{subTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace('$', '')} USD</span>
            </div>
            <div className="summary-row discount">
              <span>Discount ({discountPercentage}%)</span>
              <span>-{discountAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace('$', '')} USD</span>
            </div>
            <div className="summary-row">
              <span>Delivery fee</span>
              <span>{deliveryFee.toFixed(2)} USD</span>
            </div>

            <div className="summary-row total">
              <span>Total</span>
              <span className="total-price">{total.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace('$', '')} USD</span>
            </div>

            <p className="warranty-note">
              <Info size={16} />
              <span>
                90 Day Limited Warranty against manufacturer's defects 
                <a href="#" className="details-link">Details</a>
              </span>
            </p>

            <button onClick={()=>navigate("/products/1/payment-method")} className="checkout-btn">Checkout Now</button>
          </div>

        </div>
      </div>
    </div>
  );
};

// Child component for a single cart item
const CartItem = ({ item, updateQuantity, removeItem }) => {
  return (
    <div className="cart-item">
      <div className="product-details">
        <img src={item.image} alt={item.name} className="product-image" />
        <div className="product-info">
          <h3 className="product-name">{item.name}</h3>
          <p className="product-variant">{item.variant}</p>
        </div>
      </div>
      <div className="quantity-control">
        <div className="quantity-btn-group">
          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
        </div>
      </div>
      <div className="item-total">
        ${item.price * item.quantity}
      </div>
      <div className="item-action">
        <button onClick={() => removeItem(item.id)} className="delete-btn">
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartPage;