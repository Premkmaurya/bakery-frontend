import React, { useState } from 'react';
import { Plus, MapPin, Edit2, Trash2, CheckCircle } from 'lucide-react';
import './ManageAddress.scss';

const ManageAddress = () => {
  // === MOCK DATA ===
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      isDefault: true,
      name: 'Leslie Cooper',
      phone: '+1 234 567 890',
      street: '2443 Oak Ridge',
      city: 'Omaha',
      state: 'NE',
      zip: '45065',
      country: 'United States'
    },
    {
      id: 2,
      type: 'Office',
      isDefault: false,
      name: 'Leslie Cooper',
      phone: '+1 987 654 321',
      street: '4521 Elm Street, Suite 400',
      city: 'Chicago',
      state: 'IL',
      zip: '60614',
      country: 'United States'
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    type: 'Home',
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save New Address
  const handleSave = (e) => {
    e.preventDefault();
    const newId = addresses.length + 1;
    const newAddress = { id: newId, isDefault: false, ...formData };
    setAddresses([...addresses, newAddress]);
    setIsAdding(false); // Close form
    // Reset form
    setFormData({ type: 'Home', name: '', phone: '', street: '', city: '', state: '', zip: '', country: '' });
  };

  // Delete Address
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      setAddresses(addresses.filter(addr => addr.id !== id));
    }
  };

  return (
    <div className="manage-address-wrapper">
      {!isAdding ? (
        <div className="address-grid">
          
          {/* === 1. ADD NEW BUTTON CARD === */}
          <div className="add-new-card" onClick={() => setIsAdding(true)}>
            <div className="icon-wrapper">
              <Plus size={32} />
            </div>
            <h3>Add New Address</h3>
          </div>

          {/* === 2. EXISTING ADDRESS CARDS === */}
          {addresses.map((addr) => (
            <div key={addr.id} className={`address-card ${addr.isDefault ? 'default' : ''}`}>
              
              <div className="card-header">
                <span className="address-type">{addr.type}</span>
                {addr.isDefault && <span className="default-badge">Default</span>}
              </div>

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
                <button className="action-btn edit" title="Edit">
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
        // === 3. ADD NEW ADDRESS FORM ===
        <form className="address-form" onSubmit={handleSave}>
          <h3 className="form-title">Add New Delivery Address</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label>Full Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Phone Number *</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label>Street Address *</label>
            <input type="text" name="street" value={formData.street} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City *</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>State / Province *</label>
              <input type="text" name="state" value={formData.state} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Zip Code *</label>
              <input type="text" name="zip" value={formData.zip} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Country *</label>
              <input type="text" name="country" value={formData.country} onChange={handleChange} required />
            </div>
          </div>
          
          <div className="form-group">
            <label>Address Type</label>
            <div className="radio-group">
               <label className="radio-label">
                 <input type="radio" name="type" value="Home" checked={formData.type === 'Home'} onChange={handleChange} />
                 Home
               </label>
               <label className="radio-label">
                 <input type="radio" name="type" value="Office" checked={formData.type === 'Office'} onChange={handleChange} />
                 Office
               </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={() => setIsAdding(false)}>Cancel</button>
            <button type="submit" className="save-btn">Save Address</button>
          </div>
        </form>
      )}

    </div>
  );
};

export default ManageAddress;