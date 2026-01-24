import React from "react";
import { Route, Routes, Outlet } from "react-router-dom"; // 1. Import Outlet

import Nav from "../components/common/Nav";
import Footer from "../components/common/footer/Footer";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Products from "../pages/Products";
import SingleProduct from "../pages/SingleProduct";
import Checkout from "../pages/Checkout";
import Cart from "../pages/Cart";
import PaymentMethod from "../pages/PaymentMethod";
import Profile from "../pages/Profile";
import WishList from "../pages/WishList";

import ProtectedRoute from "./ProtectedRoutes";
import OAuthSuccess from "../pages/OAuthSuccess";
import OrderConfirmation from "../pages/OrderConfirmation";

const MainLayout = () => {
  return (
    <>
      <Nav />
      <div className="main-content" style={{ marginTop: "80px" }}>
        {" "}
        {/* Adjust marginTop based on Nav height */}
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/products/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/payment-method" element={<PaymentMethod />} />
        </Route>
      </Route>
      <Route path="/order-success" element={<OrderConfirmation />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/oauth-success" element={<OAuthSuccess />} />
    </Routes>
  );
};

export default AppRoutes;
