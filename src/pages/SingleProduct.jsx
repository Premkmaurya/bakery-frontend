import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleProductHero from "../components/single-product/hero/SingleProductHero";
import RelatedProducts from "../components/single-product/suggest-products/RelatedProducts";
import ReviewPage from "../components/single-product/review/ReviewPage";
import { useLocation } from "react-router-dom";

const SingleProduct = () => {
  const location = useLocation();
  const product = location.state?.product;
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get(`https://bakeverse-bk.vercel.app/products/${product._id}/related`);
        setRelatedProducts(response.data);
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    if (product) {
      fetchRelatedProducts();
    }
  }, [product]);

  return (
    <div>
      <SingleProductHero product={product} />
      <RelatedProducts products={relatedProducts} />
      <ReviewPage product={product} />
    </div>
  );
};

export default SingleProduct;
