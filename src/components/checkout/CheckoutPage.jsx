import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MapPin,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  ShieldCheck,
  Minus,
} from "lucide-react";
import "./CheckoutPage.scss";
import axios from "axios";
import { useAuth } from "../../context/NavContext";

import MapPicker from "../checkout/map-picker/MapPicker";
import MapModal from "../checkout/map-picker/MapModal";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { user } = useAuth();

  // === 1. ADDRESS STATE ===
  const [addresses, setAddresses] = useState(user?.address || []);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const [mapOpen, setMapOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Ensure addresses are loaded from context on mount and when user changes
  useEffect(() => {
    if (user?.address && user.address.length > 0) {
      setAddresses(user.address);
      setSelectedAddressId(user.address[0]._id); // Select first address by default
    }
  }, [user]);

  const [orderItems, setOrderItems] = useState([]);
  useEffect(() => {
    if (Array.isArray(state?.initialCartItems)) {
      setOrderItems(state.initialCartItems);
    } else if (state) {
      setOrderItems([state]);
    } else {
      setOrderItems([]);
    }
  }, []);
  // Track which order item description is expanded
  const [expandedItemId, setExpandedItemId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedItemId((prev) => (prev === id ? null : id));
  };

  // === 2. STATE ===
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); // If null, we are adding new. If set, we are editing.

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      addressType: "Home",
      fullName: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
  });

  // === 3. HANDLERS ===
  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return; // Prevent going below 1 (or handle remove logic)
    setOrderItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  // Open "Add New" Form
  const handleAddNew = () => {
    reset({
      addressType: "Home",
      fullName: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    });
    setEditingId(null);
    setIsFormOpen(true);
  };

  // Open "Edit" Form
  const handleEdit = (e, address) => {
    e.stopPropagation(); // Prevent selecting the card when clicking edit
    reset({
      ...address,
      fullName: address.name,
      addressType: address.type,
    });
    setEditingId(address.id);
    setIsFormOpen(true);
  };

  // Save Address (Add or Update)
  const handleSave = async (data) => {
    const addAddress = await axios.post(
      "http://localhost:3000/user/add-address",
      data,
      {
        withCredentials: true,
      }
    );
    if (editingId) {
      // Update existing
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === editingId
            ? {
                ...data,
                id: editingId,
                name: data.fullName,
                type: data.addressType,
              }
            : addr
        )
      );
    } else {
      // Add new
      const newId = addresses.length + 1;
      const newAddress = {
        ...data,
        id: newId,
        name: data.fullName,
        type: data.addressType,
      };
      setAddresses([...addresses, newAddress]);
      setSelectedAddressId(newId); // Auto-select the new address
    }
    setIsFormOpen(false); // Close form
  };

  // Delete Address
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (window.confirm("Delete this address?")) {
      const response = await axios.delete(
        `http://localhost:3000/user/delete-address/${id}`,
        { withCredentials: true }
      );
      setAddresses((prev) => prev.filter((addr) => addr._id !== id));
      if (selectedAddressId === id) setSelectedAddressId(null); // Deselect if deleted
    }
  };

  // Calculate subtotal with conditional logic
  const subTotal =
    orderItems && orderItems.length > 0
      ? orderItems.reduce((sum, item) => {
          const product = item?.product || item?.productId || {};
          const price = typeof product.price === "number" ? product.price : 0;
          const qty = typeof item.quantity === "number" ? item.quantity : 1;
          return sum + price * qty;
        }, 0)
      : 0;

  // Delivery fee logic: from state if present, else based on subtotal
  let deliveryFee = 0;
  if (typeof state?.deliveryFee === "number") {
    deliveryFee = state.deliveryFee;
  } else if (subTotal > 299) {
    deliveryFee = 0;
  } else if (subTotal > 0) {
    deliveryFee = 40;
  } else {
    deliveryFee = 0;
  }

  const total = subTotal + deliveryFee;

  // Navigate to Payment Method
  const navigateHandler = () => {
    if (addresses.length === 0) {
      alert("Please add a shipping address before proceeding to payment.");
      return;
    }
    navigate(`/products/payment-method`, {
      state: {
        subTotal,
        deliveryFee,
        total,
      },
    });
  };

  return (
    <div className="checkout-page-wrapper">
      <div className="container">
        <h1 className="page-title">Checkout</h1>

        <div className="checkout-layout">
          {/* === LEFT COLUMN: ADDRESS & ORDER ITEMS === */}
          <div className="checkout-left">
            {/* 1. Address Section */}
            <section className="checkout-section">
              <div className="section-header">
                <h2 className="section-title">Shipping Address</h2>
                {!isFormOpen && (
                  <button className="add-new-btn" onClick={handleAddNew}>
                    <Plus size={16} /> Add New
                  </button>
                )}
              </div>

              {isFormOpen ? (
                // === ADDRESS FORM ===
                <form
                  className="address-form"
                  onSubmit={handleSubmit(handleSave)}
                >
                  <div className="form-content">
                    <h3 className="form-title">
                      {editingId ? "Edit Address" : "Add New Address"}
                    </h3>

                    <div className="form-grid">
                      <div className="form-group">
                        <label>Full Name</label>
                        <input
                          type="text"
                          {...register("fullName", {
                            required: "Full Name is required",
                          })}
                        />
                        {errors.fullName && (
                          <span className="error-msg">
                            {errors.fullName.message}
                          </span>
                        )}
                      </div>
                      <div className="form-group">
                        <label>Phone</label>
                        <input
                          type="tel"
                          {...register("phone", {
                            required: "Phone is required",
                            pattern: {
                              value: /^[0-9]{10,15}$/,
                              message: "Enter a valid phone number",
                            },
                          })}
                        />
                        {errors.phone && (
                          <span className="error-msg">
                            {errors.phone.message}
                          </span>
                        )}
                      </div>
                      <div className="form-group">
                        <label>Location</label>
                        <button
                          type="button"
                          className="map-btn"
                          onClick={() => setMapOpen(true)}
                        >
                          Choose from Map
                        </button>
                        {selectedLocation && <p>Location selected ✓</p>}
                        {mapOpen && (
                          <MapModal>
                            <MapPicker
                              onSelect={(location) =>
                                setSelectedLocation(location)
                              }
                              onClose={() => setMapOpen(false)}
                            />
                          </MapModal>
                        )}
                      </div>
                      <div className="form-group">
                        <label>Address Type</label>
                        <select {...register("addressType")}>
                          <option value="Home">Home</option>
                          <option value="Office">Office</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => setIsFormOpen(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="save-btn">
                      Save Address
                    </button>
                  </div>
                </form>
              ) : (
                // === ADDRESS LIST ===
                <div className="address-list">
                  {addresses.map((addr) => (
                    <div
                      key={addr._id}
                      className={`address-card ${
                        selectedAddressId === addr._id ? "selected" : ""
                      }`}
                      onClick={() => setSelectedAddressId(addr._id)}
                    >
                      <div className="card-top">
                        <span className="addr-type">
                          {addr.addressType || addr.type}
                        </span>
                        {selectedAddressId === addr._id && (
                          <CheckCircle size={18} className="check-icon" />
                        )}
                      </div>
                      <h4 className="addr-name">
                        {addr.fullName || addr.name}
                      </h4>
                      <p className="addr-details">
                        {addr.street}, {addr.city}, {addr.state} {addr.zip}
                      </p>
                      <p className="addr-phone">Phone: {addr.phone}</p>

                      <div className="card-actions">
                        <button
                          className="action-btn"
                          onClick={(e) => handleEdit(e, addr)}
                        >
                          <Edit2 size={14} /> Edit
                        </button>
                        <button
                          className="action-btn delete"
                          onClick={(e) => handleDelete(e, addr._id)}
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* 2. Order Items Section (Visual only) */}
            <section className="checkout-section">
              <h2 className="section-title">Order Details</h2>
              <div className="order-items">
                {orderItems.map((item, idx) => {
                  // Defensive checks for product and productId
                  const product = item?.product || item?.productId || {};
                  const imageUrl =
                    product?.imageUrl || "fallback-image-url.jpg";
                  const name = product?.name || "Product image";
                  const description =
                    product?.description || "No description available.";
                  const price = product?.price || 0;
                  const id = product?._id || item?._id || idx;
                  return (
                    <div key={id} className="item-row">
                      <img src={imageUrl} alt={name} />
                      <div className="item-info">
                        <h4>{name}</h4>
                        <p
                          className="item-desc"
                          onClick={() => toggleExpand(id)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ")
                              toggleExpand(id);
                          }}
                        >
                          {expandedItemId === id
                            ? description
                            : `${description.slice(0, 100)}...`}
                          {expandedItemId !== id && <span> Read More</span>}
                        </p>
                      </div>
                      <span className="item-price">${price}</span>
                      <div className="qty-adjuster">
                        <button
                          className="qty-btn"
                          onClick={() =>
                            updateQuantity(item._id, item.quantity - 1)
                          }
                        >
                          <Minus size={14} />
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() =>
                            updateQuantity(item._id, item.quantity + 1)
                          }
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* === RIGHT COLUMN: SUMMARY === */}
          <div className="checkout-right">
            <div className="price-card">
              <h2 className="card-title">Price Details</h2>

              <div className="price-row">
                <span>Subtotal</span>
                <span>₹{subTotal > 0 ? subTotal : 0}</span>
              </div>
              <div className="price-row">
                <span>Delivery Fee</span>
                <span>₹{subTotal > 0 ? deliveryFee : 0}</span>
              </div>

              <div className="divider"></div>

              <div className="price-row total">
                <span>Total Amount</span>
                <span>₹{subTotal > 0 ? total : 0}</span>
              </div>

              <div className="security-note">
                <ShieldCheck size={16} />
                <p>Safe and Secure Payments. 100% Authentic products.</p>
              </div>

              <button onClick={navigateHandler} className="place-order-btn">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
