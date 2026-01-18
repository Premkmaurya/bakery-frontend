import Hero from "../components/home/hero/Hero";
import Catalog from "../components/home/catalog/Catalog";
import Advantage from "../components/home/advantages/Advantage";
import VideoSection from "../components/home/video/VideoSection";
import ReviewsSection from "../components/home/reviews/ReviewsSection";
import Terms from "../components/home/terms/Terms";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("Popular cakes");
  useEffect(() => {
  const getProducts = async () => {
    try {
      const params = {};

      if (category) {
        params.category = category;
        params.isFeatured = true;
      }

      const response = await axios.get(
        "https://bakery-backend-two.vercel.app/products/get",
        { params }
      );

      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  getProducts();
}, [category]);

  return (
    <div style={{ overflow: "hidden" }}>
      <Hero />
      <Catalog products={products} setCategory={setCategory} />
      <Advantage />
      <VideoSection />
      <ReviewsSection />
      <Terms />
    </div>
  );
};

export default Home;
