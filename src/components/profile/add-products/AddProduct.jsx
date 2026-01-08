import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import {
  Upload,
  X,
  Plus,
  IndianRupee,
  Tag,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import "./AddProduct.scss";
import axios from "axios";

const AddProduct = ({ product,setIsEdit,setProductData }) => {
  const notyf = new Notyf();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      price: "",
      category: "",
      description: "",
      details: "",
      isStock: true,
      isFeatured: false,
    },
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
      image: imageFile,
      inStock: true,
    };
    const formPayload = new FormData();
    for (const key in submitData) {
      formPayload.append(key, submitData[key]);
    }
    if (editingId) {
      // Update existing product
      try {
        const response = await axios.patch(
          `https://bakery-backend-two.vercel.app/products/update/${editingId}`,
          formPayload,
          {
            withCredentials: true,
          }
        );
        notyf.success("Product updated successfully!");
        setProductData((prev) => ({ ...prev, ...formData }));
        setIsLoading(false);
        setIsEdit(false);
        reset();
        removeImage();
      } catch (error) {
        notyf.error("Failed to update product.");
      }
    } else {
      const response = await axios.post(
        "https://bakery-backend-two.vercel.app/products/create",
        formPayload,
        {
          withCredentials: true,
        }
      );
      setIsLoading(false);
      reset();
      removeImage();
      notyf.success({
        message: `${formData.name} added successfully!`,
        duration: 2000,
        background: "#17701fff",
        position: { x: "left", y: "bottom" },
      });
    }
  };

  useEffect(() => {
    if (product) {
      setEditingId(product._id);
      reset({
        name: product.name || "",
        price: product.price || "",
        category: product.category || "",
        description: product.description || "",
        details: product.details || "",
        isFeatured: product.isFeatured || false,
      });
      if (product.imageUrl) {
        setImagePreview(product.imageUrl);
        setImageFile(null); // Clear file input since we're using existing image
      }
    } else {
      reset({
        name: "",
        price: "",
        category: "",
        description: "",
        details: "",
        isFeatured: false,
      });
      removeImage();
    }
  }, [product]);

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
                {...register("name", { required: "Product name is required" })}
              />
            </div>
            {errors.name && (
              <span className="error">{errors.name.message}</span>
            )}
          </div>

          <div className="form-row">
            {/* Price */}
            <div className="form-group">
              <label>Price (₹) *</label>
              <div className="input-with-icon">
                <IndianRupee size={18} className="input-icon" />

                <input
                  type="number"
                  placeholder="0.00"
                  {...register("price", {
                    required: "Price is required",
                    min: {
                      value: 0,
                      message: "Price must be greater than 0",
                    },
                  })}
                />
              </div>
              {errors.price && (
                <span className="error">{errors.price.message}</span>
              )}
            </div>

            {/* Category */}
            <div className="form-group">
              <label>Category *</label>
              <div className="select-wrapper">
                <Tag size={18} className="input-icon" />
                <select
                  {...register("category", {
                    required: "Category is required",
                  })}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              {errors.category && (
                <span className="error">{errors.category.message}</span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description</label>
            <div className="textarea-wrapper">
              <FileText size={18} className="input-icon area-icon" />
              <textarea
                rows="4"
                placeholder="Product description..."
                {...register("description")}
              ></textarea>
            </div>
            {errors.description && (
              <span className="error">{errors.description.message}</span>
            )}
          </div>

          {/* Details */}
          <div className="form-group">
            <label>Details</label>
            <div className="textarea-wrapper">
              <FileText size={18} className="input-icon area-icon" />
              <textarea
                rows="4"
                placeholder="Product details, ingredients, weight, size etc..."
                {...register("details")}
              ></textarea>
            </div>
            {errors.details && (
              <span className="error">{errors.details.message}</span>
            )}
          </div>

          {/* Featured Checkbox */}
          <div className="form-group checkbox-group">
            <label className="checkbox-container">
              <input type="checkbox" {...register("isFeatured")} />
              <span className="checkmark"></span>
              Mark as Featured Product
            </label>
          </div>

          <button type="submit" className="submit-btn">
            {isLoading ? (
              <span className="loading-spinner"></span>
            ) : (
              <Plus size={20} />
            )}
            {editingId ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
