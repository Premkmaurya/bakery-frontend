import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import './ManageAddress.scss';
import axios from 'axios';

const ManageAddress = () => {
  // === MOCK DATA ===
  const [addresses, setAddresses] = useState([]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(()=>{
    const fetchAddresses =async () => {
      try {
        const response = await axios.post("http://localhost:3000/user/get-addresses", {
          withCredentials: true,
        });
        setAddresses(response.data.addresses);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    }
    fetchAddresses(); 
  },[])
  
  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch
  } = useForm({
    defaultValues: {
      type: 'Home',
      name: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    }
  });

  // Open Form for Adding
  const handleAddNew = () => {
    reset({
      type: 'Home',
      name: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    });
    setEditingId(null);
    setIsFormOpen(true);
  };

  // Open Form for Editing
  const handleEdit = (address) => {
    reset({
      type: address.type,
      name: address.name,
      phone: address.phone,
      street: address.street,
      city: address.city,
      state: address.state,
      zip: address.zip,
      country: address.country
    });
    setEditingId(address.id);
    setIsFormOpen(true);
  };

  // Close Form
  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingId(null);
    reset();
  };

  // Save (Add or Update)
  const onSubmit = (formData) => {
    if (editingId) {
      // === UPDATE EXISTING ADDRESS ===
      setAddresses(prev => prev.map(addr => 
        addr.id === editingId 
          ? { ...formData, id: editingId }
          : addr
      ));
    } else {
      // === ADD NEW ADDRESS ===
      const newId = addresses.length > 0 ? Math.max(...addresses.map(a => a.id)) + 1 : 1;
      const newAddress = { id: newId, isDefault: false, ...formData };
      setAddresses([...addresses, newAddress]);
    }

    handleCancel();
  };

  // Delete Address
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      setAddresses(addresses.filter(addr => addr.id !== id));
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
            <div key={addr.id} className={`address-card ${addr.isDefault ? 'default' : ''}`}>

              <div className="card-body">
                <h4 className="user-name">{addr.name}</h4>
                <p className="phone">{addr.phone}</p>
                <p className="address-text">
                  {addr.street},<br />
                  {addr.city}, {addr.state} {addr.zip},<br />
                  {addr.country}
                </p>
              </div>

              <div className="card-actions">
                <button 
                  className="action-btn edit" 
                  title="Edit"
                  onClick={() => handleEdit(addr)}
                >
                  <Edit2 size={16} /> Edit
                </button>
                <button 
                  className="action-btn delete" 
                  title="Delete"
                  onClick={() => handleDelete(addr.id)}
                >
                  <Trash2 size={16} /> Delete
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
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && <span className="error">{errors.name.message}</span>}
            </div>
            <div className="form-group">
              <label>Phone Number *</label>
              <input 
                type="tel" 
                {...register('phone', { 
                  required: 'Phone is required',
                  pattern: {
                    value: /^[\d\s\-\+\(\)]+$/,
                    message: 'Please enter a valid phone number'
                  }
                })}
              />
              {errors.phone && <span className="error">{errors.phone.message}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Street Address *</label>
            <input 
              type="text" 
              {...register('street', { required: 'Street address is required' })}
            />
            {errors.street && <span className="error">{errors.street.message}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City *</label>
              <input 
                type="text" 
                {...register('city', { required: 'City is required' })}
              />
              {errors.city && <span className="error">{errors.city.message}</span>}
            </div>
            <div className="form-group">
              <label>State / Province *</label>
              <input 
                type="text" 
                {...register('state', { required: 'State is required' })}
              />
              {errors.state && <span className="error">{errors.state.message}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Zip Code *</label>
              <input 
                type="text" 
                {...register('zip', { required: 'Zip code is required' })}
              />
              {errors.zip && <span className="error">{errors.zip.message}</span>}
            </div>
            <div className="form-group">
              <label>Country *</label>
              <input 
                type="text" 
                {...register('country', { required: 'Country is required' })}
              />
              {errors.country && <span className="error">{errors.country.message}</span>}
            </div>
          </div>
          
          <div className="form-group">
            <label>Address Type</label>
            <div className="radio-group">
               <label className="radio-label">
                 <input type="radio" value="Home" {...register('type')} />
                 Home
               </label>
               <label className="radio-label">
                 <input type="radio" value="Office" {...register('type')} />
                 Office
               </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
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