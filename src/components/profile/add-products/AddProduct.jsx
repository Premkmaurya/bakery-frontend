import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
import axios from "axios";


const AddProduct = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: "",
      price: "",
      category: "",
      description: "",
      isFeatured: false,
    }
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
  };

  const onSubmit = async (formData) => {
    setIsLoading(true);
    const submitData = {
      ...formData,
      image: imageFile
    };
    const formPayload = new FormData();
    for (const key in submitData) {
      formPayload.append(key, submitData[key]);
    }
    const response = await axios.post("http://localhost:3000/products/create", formPayload, {
      withCredentials: true,
    });
    setIsLoading(false);
    reset();
    removeImage();
  };

  return (
    <div className="add-product-wrapper">
      <form className="product-form" onSubmit={handleSubmit(onSubmit)}>
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
                placeholder="e.g. Red Velvet Truffle"
                {...register('name', { required: 'Product name is required' })}
              />
            </div>
            {errors.name && <span className="error">{errors.name.message}</span>}
          </div>

          <div className="form-row">
            {/* Price */}
            <div className="form-group">
              <label>Price ($) *</label>
              <div className="input-with-icon">
                <DollarSign size={18} className="input-icon" />
                <input
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  {...register('price', {
                    required: 'Price is required',
                    min: {
                      value: 0,
                      message: 'Price must be greater than 0'
                    }
                  })}
                />
              </div>
              {errors.price && <span className="error">{errors.price.message}</span>}
            </div>

            {/* Category */}
            <div className="form-group">
              <label>Category *</label>
              <div className="select-wrapper">
                <Tag size={18} className="input-icon" />
                <select
                  {...register('category', { required: 'Category is required' })}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              {errors.category && <span className="error">{errors.category.message}</span>}
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description</label>
            <div className="textarea-wrapper">
              <FileText size={18} className="input-icon area-icon" />
              <textarea
                rows="4"
                placeholder="Product details, ingredients, etc..."
                {...register('description')}
              ></textarea>
            </div>
            {errors.description && <span className="error">{errors.description.message}</span>}
          </div>

          {/* Featured Checkbox */}
          <div className="form-group checkbox-group">
            <label className="checkbox-container">
              <input
                type="checkbox"
                {...register('isFeatured')}
              />
              <span className="checkmark"></span>
              Mark as Featured Product
            </label>
          </div>

          <button type="submit" className="submit-btn">
            {isLoading ? <span className="loading-spinner"></span> : <Plus size={20} />} Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
