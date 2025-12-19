import React, { useEffect, useState } from "react";
import { Trash2, Info } from "lucide-react"; // Using lucide-react for icons
import "./CartPage.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Mock data for the cart items based on your image

const CartPage = () => {
  const [initialCartItems, setInitialCartItems] = useState([]);

  const navigate = useNavigate();
  const [voucherCode, setVoucherCode] = useState("");

  useEffect(() => {
    async function fetchCartItems() {
      const response = await axios.get("http://localhost:3000/cart/getCart", {
        withCredentials: true,
      });
      setInitialCartItems(response.data.items);
    }
    fetchCartItems();
  }, []);

  // Function to handle quantity changes
  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    setInitialCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );

    const response = await axios.patch(
      `http://localhost:3000/cart/updateCart/${id}`,
      { quantity: newQuantity },
      {
        withCredentials: true,
      }
    );
  };

  // Function to remove an item from the cart
  const removeItem = async (id) => {
    setInitialCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== id)
    );
    const response = await axios.delete(
      `http://localhost:3000/cart/removeFromCart/${id}`,
      {
        withCredentials: true,
      }
    );
  };

  // Calculate cart summary totals
  const subTotal = initialCartItems.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );
  const discountPercentage = 10; // 10% discount as per image
  const discountAmount = (subTotal * discountPercentage) / 100;
  const deliveryFee = 10;
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
            {initialCartItems.map((item) => (
              <CartItem
                key={item._id}
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
              <span>
                {subTotal
                  .toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })
                  .replace("₹", "")}{" "}
                INR
              </span>
            </div>
            <div className="summary-row discount">
              <span>Discount ({discountPercentage}%)</span>
              <span>
                -
                {discountAmount
                  .toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })
                  .replace("₹", "")}{" "}
                INR
              </span>
            </div>
            <div className="summary-row">
              <span>Delivery fee</span>
              <span>{deliveryFee.toFixed(2)} INR</span>
            </div>

            <div className="summary-row total">
              <span>Total</span>
              <span className="total-price">
                {total
                  .toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })
                  .replace("₹", "")}{" "}
                INR
              </span>
            </div>

            <p className="warranty-note">
              <Info size={16} />
              <span>
                90 Day Limited Warranty against manufacturer's defects
                <a href="#" className="details-link">
                  Details
                </a>
              </span>
            </p>

            <button
              onClick={() =>
                navigate(
                  `/products/${initialCartItems[0]?.productId._id}/checkout`,
                  {
                    state: {
                      initialCartItems: initialCartItems,
                      total: total,
                      discountAmount: discountAmount,
                      deliveryFee: deliveryFee,
                      subTotal: subTotal,
                    },
                  }
                )
              }
              className="checkout-btn"
            >
              Checkout Now
            </button>
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
        <img
          src={item.productId.imageUrl}
          alt={item.productId.name}
          className="product-image"
        />
        <div className="product-info">
          <h3 className="product-name">{item.productId.name}</h3>
        </div>
      </div>
      <div className="quantity-control">
        <div className="quantity-btn-group">
          <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>
            -
          </button>
          <span>{item.quantity}</span>
          <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
            +
          </button>
        </div>
      </div>
      <div className="item-total">₹{item.productId.price * item.quantity}</div>
      <div className="item-action">
        <button onClick={() => removeItem(item._id)} className="delete-btn">
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartPage;
