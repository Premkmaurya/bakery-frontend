import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, Edit2, Trash2 } from "lucide-react";
import "./ManageAddress.scss";
import axios from "axios";
import { useAuth } from "../../../context/NavContext"; // Import useAuth to access NavContext

const ManageAddress = () => {
  const { addresses, updateAddresses, deleteAddress,editAddress } = useAuth(); // Use addresses and updateAddresses from NavContext
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      addressType: "Home",
      fullName: "",
      phone: "",
      street: "",
      city: "",
      zip: "",
    },
  });

  // Open Form for Adding
  const handleAddNew = () => {
    reset({
      addressType: "Home",
      fullName: "",
      phone: "",
      street: "",
      city: "",
      zip: "",
    });
    setEditingId(null);
    setIsFormOpen(true);
  };

  // Open Form for Editing
  const handleEdit = (address) => {
    reset({
      ...address,
      fullName: address.fullName,
      addressType: address.addressType,
    });
    setEditingId(address._id);
    setIsFormOpen(true);
  };

  // Close Form
  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingId(null);
    reset();
  };

  // Save (Add or Update)
  const onSubmit = async (formData) => {
    try {
      if (editingId) {
        editAddress(editingId,formData);
      } else {
        // === ADD NEW ADDRESS ===
        const response = await axios.post(
          "http://localhost:3000/user/add-address",
          formData,
          {
            withCredentials: true,
          }
        );

        // Add new address to NavContext addresses state
        const newAddress = {
          _id: response.data._id || response.data.id,
          ...formData,
        };
        updateAddresses([...addresses, newAddress]);
        console.log("Address added successfully:", response.data);
      }

      handleCancel();
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Failed to save address. Please try again.");
    }
  };

  // Delete Address
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      await deleteAddress(id);
      if (selectedAddressId === id) setSelectedAddressId(null);
    }
  };

  return (
    <div className="manage-address-wrapper">
      <h2 className="section-title">Manage Addresses</h2>

      {!isFormOpen ? (
        <div className="address-grid">
          {/* === 1. ADD NEW BUTTON CARD === */}
          <div className="add-new-card" onClick={handleAddNew}>
            <div className="icon-wrapper">
              <Plus size={32} />
            </div>
            <h3>Add New Address</h3>
          </div>

          {/* === 2. EXISTING ADDRESS CARDS === */}
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
              </div>
              <h4 className="addr-name">{addr.fullName || addr.name}</h4>
              <p className="addr-details">
                {addr.street}, {addr.city}, {addr.zip}
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
                  onClick={() => handleDelete(addr._id)}
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // === 3. ADDRESS FORM (ADD OR EDIT) ===
        <form className="address-form" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="form-title">
            {editingId ? "Edit Address" : "Add New Delivery Address"}
          </h3>

          <div className="form-row">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                {...register("fullName", { required: "Name is required" })}
              />
              {errors.fullName && (
                <span className="error">{errors.fullName.message}</span>
              )}
            </div>
            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                {...register("phone", {
                  required: "Phone is required",
                  pattern: {
                    value: /^[\d\s\-\+\(\)]+$/,
                    message: "Please enter a valid phone number",
                  },
                })}
              />
              {errors.phone && (
                <span className="error">{errors.phone.message}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Street Address *</label>
            <input
              type="text"
              {...register("street", {
                required: "Street address is required",
              })}
            />
            {errors.street && (
              <span className="error">{errors.street.message}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City *</label>
              <input
                type="text"
                {...register("city", { required: "City is required" })}
              />
              {errors.city && (
                <span className="error">{errors.city.message}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Zip Code *</label>
              <input
                type="text"
                {...register("zip", { required: "Zip code is required" })}
              />
              {errors.zip && (
                <span className="error">{errors.zip.message}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Address Type</label>
            <select {...register("addressType")}>
              <option value="Home">Home</option>
              <option value="Office">Office</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {editingId ? "Update Address" : "Save Address"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ManageAddress;
