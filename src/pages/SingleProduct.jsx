import React from "react";
import SingleProductHero from "../components/single-product/hero/SingleProductHero";
import RelatedProducts from "../components/single-product/suggest-products/RelatedProducts";
import ReviewPage from "../components/single-product/review/ReviewPage";
import { useLocation } from "react-router-dom";

const SingleProduct = () => {
  const location = useLocation();
  const product = location.state?.product;
  return (
    <div>
      <SingleProductHero product={product} />
      <RelatedProducts />
      <ReviewPage product={product} />
    </div>
  );
};

export default SingleProduct;
