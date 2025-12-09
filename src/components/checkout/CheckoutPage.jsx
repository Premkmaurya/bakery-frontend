import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const CheckoutPage = () => {
  const navigate = useNavigate();
  // === 1. MOCK DATA ===
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      name: "Leslie Cooper",
      phone: "+1 234 567 890",
      street: "2443 Oak Ridge",
      city: "Omaha",
      state: "NE",
      zip: "45065",
      country: "United States",
    },
    {
      id: 2,
      type: "Office",
      name: "Leslie Cooper",
      phone: "+1 987 654 321",
      street: "4521 Elm Street, Suite 400",
      city: "Chicago",
      state: "IL",
      zip: "60614",
      country: "United States",
    },
  ]);

  const [orderItems, setOrderItems] = useState([
    {
      id: 1,
      name: "Furniture Set",
      variant: "Set : Colour: Coffee",
      price: 437,
      quantity: 1,
      desc: "French bread loaf with a crisp outer crust, chewy texture and a soft crumb. Perfect accompaniment for soups & salads.",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=200",
    },
  ]);

  // Track which order item description is expanded
  const [expandedItemId, setExpandedItemId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedItemId((prev) => (prev === id ? null : id));
  };

  // === 2. STATE ===
  const [selectedAddressId, setSelectedAddressId] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); // If null, we are adding new. If set, we are editing.

  // Form State
  const initialFormState = {
    type: "Home",
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  };
  const [formData, setFormData] = useState(initialFormState);

  // === 3. HANDLERS ===
  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return; // Prevent going below 1 (or handle remove logic)
    setOrderItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Open "Add New" Form
  const handleAddNew = () => {
    setFormData(initialFormState);
    setEditingId(null);
    setIsFormOpen(true);
  };

  // Open "Edit" Form
  const handleEdit = (e, address) => {
    e.stopPropagation(); // Prevent selecting the card when clicking edit
    setFormData(address);
    setEditingId(address.id);
    setIsFormOpen(true);
  };

  // Save Address (Add or Update)
  const handleSave = (e) => {
    e.preventDefault();

    if (editingId) {
      // Update existing
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === editingId ? { ...formData, id: editingId } : addr
        )
      );
    } else {
      // Add new
      const newId = addresses.length + 1;
      const newAddress = { ...formData, id: newId };
      setAddresses([...addresses, newAddress]);
      setSelectedAddressId(newId); // Auto-select the new address
    }

    setIsFormOpen(false); // Close form
  };

  // Delete Address
  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm("Delete this address?")) {
      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
      if (selectedAddressId === id) setSelectedAddressId(null); // Deselect if deleted
    }
  };

  // Calculate Total
  const subTotal = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryFee = 50;
  const total = subTotal + deliveryFee;

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
                <form className="address-form" onSubmit={handleSave}>
                  <h3 className="form-title">
                    {editingId ? "Edit Address" : "Add New Address"}
                  </h3>

                  <div className="form-grid">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Street Address</label>
                      <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Zip Code</label>
                      <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Address Type</label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                      >
                        <option value="Home">Home</option>
                        <option value="Office">Office</option>
                        <option value="Other">Other</option>
                      </select>
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
                      key={addr.id}
                      className={`address-card ${
                        selectedAddressId === addr.id ? "selected" : ""
                      }`}
                      onClick={() => setSelectedAddressId(addr.id)}
                    >
                      <div className="card-top">
                        <span className="addr-type">{addr.type}</span>
                        {selectedAddressId === addr.id && (
                          <CheckCircle size={18} className="check-icon" />
                        )}
                      </div>
                      <h4 className="addr-name">{addr.name}</h4>
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
                          onClick={(e) => handleDelete(e, addr.id)}
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
                {orderItems.map((item) => (
                  <div key={item.id} className="item-row">
                    <img src={item.img} alt={item.name} />
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p>Variant: {item.variant}</p>
                      <p
                        className="item-desc"
                        onClick={() => toggleExpand(item.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") toggleExpand(item.id);
                        }}
                      >
                        {expandedItemId === item.id
                          ? item.desc
                          : `${item.desc.slice(0, 100)}...`}
                        {expandedItemId !== item.id && <span> Read More</span>}
                      </p>
                    </div>
                    <span className="item-price">${item.price}</span>

                    <div className="qty-adjuster">
                      <button
                        className="qty-btn"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus size={14} />
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* === RIGHT COLUMN: SUMMARY === */}
          <div className="checkout-right">
            <div className="price-card">
              <h2 className="card-title">Price Details</h2>

              <div className="price-row">
                <span>Subtotal</span>
                <span>${subTotal}</span>
              </div>
              <div className="price-row">
                <span>Delivery Fee</span>
                <span>${deliveryFee}</span>
              </div>

              <div className="divider"></div>

              <div className="price-row total">
                <span>Total Amount</span>
                <span>${total}</span>
              </div>

              <div className="security-note">
                <ShieldCheck size={16} />
                <p>Safe and Secure Payments. 100% Authentic products.</p>
              </div>

              <button onClick={()=> navigate("/products/2/payment-method")} className="place-order-btn">Place Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
