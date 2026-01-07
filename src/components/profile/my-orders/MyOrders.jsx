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

const MyOrders = () => {
  // === MOCK DATA ===
  const [orders, setOrders] = useState([]);
  const notyf = new Notyf();

  useEffect(() => {
    // Fetch orders from backend API when component mounts
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/orders/get-orders",
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
      case "Delivered":
        return { color: "green", icon: <CheckCircle size={14} /> };
      case "Processing":
        return { color: "blue", icon: <Clock size={14} /> };
      case "Cancelled":
        return { color: "red", icon: <XCircle size={14} /> };
      default:
        return { color: "gray", icon: <Package size={14} /> };
    }
  };

  const deleteHandler = (orderId) => {
    // Implement delete order functionality here
    const deleteOrder = async (orderId) => {

      try {
        const response = await axios.delete(
          `http://localhost:3000/orders/deleteOrder/${orderId}`,
          {
            withCredentials: true,
          }
        );
        notyf.success("Order deleted successfully");
        // After successful deletion, update the orders state
        setOrders(orders.filter((order) => order._id !== orderId));
      } catch (error) {
        console.error("Error deleting order:", error);
        notyf.error("Failed to delete order");
      }
    };
    deleteOrder(orderId);
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
                  <span className="quantity">
                    {order.quantity}
                  </span>
                </div>

                <div className="actions">
                  {order.status === "Processing" && (
                    <button className="btn-track">
                      <Truck size={16} /> Track
                    </button>
                  )}
                  <button onClick={() => deleteHandler(order._id)} className="btn-details">
                    Delete Order <Trash2 size={16} />
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
