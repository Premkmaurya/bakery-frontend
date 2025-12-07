import React from "react";
import SingleProductHero from "../components/single-product/hero/SingleProductHero";
import RelatedProducts from "../components/single-product/suggest-products/RelatedProducts";
import ReviewPage from "../components/single-product/review/ReviewPage";

const SingleProduct = () => {
  return (
    <div>
      <SingleProductHero />
      <RelatedProducts />
      <ReviewPage />
    </div>
  );
};

export default SingleProduct;
