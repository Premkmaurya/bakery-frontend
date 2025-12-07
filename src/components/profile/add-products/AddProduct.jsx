import React, { useState } from "react";
import {
  Upload,
  X,
  Plus,
  DollarSign,
  Tag,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import "./AddProduct.scss";

const AddProduct = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    isFeatured: false,
    image: null,
  });

  const categories = [
    "Popular cakes",
    "Celebration cakes",
    "Baby cakes",
    "Wedding cakes",
    "Special cakes",
    "Breads",
    "Muffins",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, image: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Data Submitted:", formData);
    alert("Product added successfully!");
    // Reset form logic here
  };

  return (
    <div className="add-product-wrapper">
      <form className="product-form" onSubmit={handleSubmit}>
        {/* === LEFT COL: IMAGE UPLOAD === */}
        <div className="form-section image-upload-section">
          <label className="section-label">Product Image</label>

          <div className={`image-dropzone ${imagePreview ? "has-image" : ""}`}>
            {imagePreview ? (
              <div className="preview-container">
                <img src={imagePreview} alt="Preview" />
                <button
                  type="button"
                  className="remove-btn"
                  onClick={removeImage}
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <label htmlFor="file-upload" className="upload-label">
                <div className="icon-bg">
                  <ImageIcon size={32} />
                </div>
                <span>Click to upload image</span>
                <p>SVG, PNG, JPG or GIF (max. 2MB)</p>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                />
              </label>
            )}
          </div>
        </div>

        {/* === RIGHT COL: DETAILS === */}
        <div className="form-section details-section">
          {/* Product Name */}
          <div className="form-group">
            <label>Product Name *</label>
            <div className="name-input">
              <input
                type="text"
                name="name"
                placeholder="e.g. Red Velvet Truffle"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            {/* Price */}
            <div className="form-group">
              <label>Price ($) *</label>
              <div className="input-with-icon">
                <DollarSign size={18} className="input-icon" />
                <input
                  type="number"
                  name="price"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div className="form-group">
              <label>Category *</label>
              <div className="select-wrapper">
                <Tag size={18} className="input-icon" />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description</label>
            <div className="textarea-wrapper">
              <FileText size={18} className="input-icon area-icon" />
              <textarea
                name="description"
                rows="4"
                placeholder="Product details, ingredients, etc..."
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          {/* Featured Checkbox */}
          <div className="form-group checkbox-group">
            <label className="checkbox-container">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
              />
              <span className="checkmark"></span>
              Mark as Featured Product
            </label>
          </div>

          <button type="submit" className="submit-btn">
            <Plus size={20} /> Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
