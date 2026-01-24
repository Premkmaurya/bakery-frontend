import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

import {
  Package,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Trash2,
} from "lucide-react";
import "./MyOrders.scss";
import axios from "axios";
import { useAuth } from "../../../context/NavContext";

const MyOrders = () => {
  // === MOCK DATA ===
  const { orders, setOrders } = useAuth();
  const notyf = new Notyf();

  useEffect(() => {
    // Fetch orders from backend API when component mounts
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://bakeverse-bk.vercel.app/orders/get-orders",
          {
            withCredentials: true,
          }
        );
        // Make sure orders is an array, fallback to empty array if undefined
        setOrders(response.data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
        // Keep the default mock data on error, or set to empty array
        setOrders([]);
      }
    };
    fetchOrders();
  }, []);

  // Helper to get status color and icon
  const getStatusConfig = (status) => {
    switch (status) {
      case "delivered":
        return { color: "green", icon: <CheckCircle size={14} /> };
      case "shipped":
        return { color: "blue", icon: <Clock size={14} /> };
      case "cancelled":
        return { color: "red", icon: <XCircle size={14} /> };
      default:
        return { color: "gray", icon: <Package size={14} /> };
    }
  };

  const cancelHandler = async (orderId) => {
    try{
      await axios.patch(`https://bakeverse-bk.vercel.app/orders/updateOrderStatus/${orderId}`, {status:"cancelled"}, {
        withCredentials: true,
      });
      getStatusConfig("cancelled");
      setOrders(orders.map(order => order._id === orderId ? {...order, status: "Cancelled"} : order));
      notyf.success("Order cancelled successfully")

    }catch(error){
      console.error("Error cancelling order:", error);
      notyf.error("Failed to cancel order");
    }
  };

  return (
    <div className="my-orders-wrapper">
      <div className="orders-list">
        {orders.map((order) => {
          const statusConfig = getStatusConfig(order.status);

          return (
            <div key={order._id} className="order-card">
              {/* === CARD HEADER (ID & STATUS) === */}
              <div className="card-header">
                <div className="order-meta">
                  <h3 className="order-id">{order._id}</h3>
                  <span className="order-date">
                    {dayjs(order.createdAt).fromNow()}
                  </span>
                </div>
                <div className={`status-badge ${statusConfig.color}`}>
                  {statusConfig.icon}
                  <span>{order.status}</span>
                </div>
              </div>

              {/* === CARD BODY (IMAGES & PREVIEW) === */}
              <div className="card-body">
                <div className="items-preview">
                  <div className="item-thumb" title={order.productId.name}>
                    <img
                      src={order.productId.imageUrl}
                      alt={order.productId.name}
                    />
                  </div>
                  {/* Optional: Logic to show "+2 more" if too many items */}
                </div>
                <div className="items-text">
                  <p>
                    {order.productId.name}{" "}
                    {order.productId.length > 1 &&
                      `+ ${order.productId.length - 1} more`}
                  </p>
                </div>
              </div>

              {/* === CARD FOOTER (TOTAL & ACTIONS) === */}
              <div className="card-footer">
                <div className="total-wrapper">
                  <span className="label">Total Amount</span>
                  <span className="amount">
                    ₹{order.productId.price.toFixed(2)}
                  </span>
                </div>
                <div className="quantity-wrapper">
                  <span className="label">Quantity</span>
                  <span className="quantity">{order.quantity}</span>
                </div>

                <div className="actions">
                  <button
                    onClick={() => cancelHandler(order._id)}
                    className={`btn-details ${
                      order.status === "cancelled" || order.status === "delivered" || order.status === "shipped"
                        ? "disabled"
                        : ""
                    }`}
                    disabled={order.status === "cancelled" || order.status === "delivered" || order.status === "shipped"}
                  >
                    Cancel Order
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {orders.length === 0 && (
          <div className="empty-state">
            <Package size={48} />
            <p>You haven't placed any orders yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
