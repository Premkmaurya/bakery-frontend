import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Trash2,
  IndianRupee,
} from "lucide-react";
import "./AdminAllOrders.scss";
import axios from "axios";
import { useAuth } from "../../../context/NavContext";

const AdminAllOrders = () => {
  // === MOCK DATA ===
  const { orders, setOrders } = useAuth();
  const notyf = new Notyf();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderAddress, setSelectedOrderAddress] = useState(null);

  useEffect(() => {
    // Fetch orders from backend API when component mounts
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://bakery-backend-two.vercel.app/orders/admin/getAllOrders",
          {
            withCredentials: true,
          },
        );
        setOrders(response.data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
        // Keep the default mock data on error, or set to empty array
        setOrders([]);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    if (selectedOrder) {
      const findAddress = selectedOrder.userId.address.find(
        (addr) => addr._id === selectedOrder.address,
      );
      setSelectedOrderAddress(findAddress);
    }
  }, [selectedOrder]);

  const orderDetails = {
    id: "153468790876",
    trackingId: "TRK-88990022",
    date: "11/03/25; 04:54pm",
    address: "45 Onye's House, Omaha",
    mainItem: {
      name: "Red Velvet Cake",
      variant: "Size: 1kg • Eggless",
      price: 1500.0,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=200&auto=format&fit=crop",
    },
  };
  const deliveryIllustration =
    "https://cdn-icons-png.flaticon.com/512/7541/7541900.png";

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

  const updateHandler = async (orderId, newStatus) => {
    try {
      const response = await axios.patch(
        `https://bakery-backend-two.vercel.app/orders/updateOrderStatus/${orderId}`,
        { status: newStatus },
        { withCredentials: true },
      );
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order,
        ),
      );
      getStatusConfig(newStatus);
      notyf.success("Order status updated successfully");
    } catch (err) {
      console.error("Error updating order status:", err);
      notyf.error("Failed to update order status");
    }
  };

  const deleteHandler = async (orderId) => {
    try {
      await axios.delete(
        `https://bakery-backend-two.vercel.app/orders/deleteOrder/${orderId}`,
        {
          withCredentials: true,
        },
      );
      notyf.success("Order deleted successfully");
      // After successful deletion, update the orders state
      setOrders(orders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error);
      notyf.error("Failed to delete order");
    }
  };

  return (
    <>
      <div className={`my-orders-wrapper ${isOpen ? "blur-bg" : ""}`}>
        <div className="orders-list">
          {orders.map((order) => {
            const statusConfig = getStatusConfig(order.status);

            return (
              <div
                onClick={() => {
                  setSelectedOrder(order);
                  setIsOpen(true);
                }}
                key={order._id}
                className={`order-card ${isOpen ? "hide" : ""}`}
              >
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
                    <select
                      className="update-actions"
                      name="update"
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => {
                        updateHandler(order._id, e.target.value);
                      }}
                      defaultValue={order.status}
                    >
                      <option value="">---select a option---</option>
                      <option value="pending">pending</option>
                      <option value="shipped">shipped</option>
                      <option value="cancelled">cancelled</option>
                      <option value="delivered">delivered</option>
                    </select>
                  </div>
                  <div className="delete-order">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteHandler(order._id);
                      }}
                      className="btn-delete"
                      title="Delete Order"
                    >
                      <Trash2 size={16} />
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

      
      {isOpen && (
        <div className="order-status-wrapper">
          <div className="container">
            {/* === TOP SECTION: STATUS === */}
            <div className="left-section">
              <div className="status-header">
                <div className="image-circle">
                  <img src={deliveryIllustration} alt="Delivery Scooter" />
                </div>
                <h1 className="status-title">Order Status</h1>
                <p className="status-subtitle">Your package is on the way</p>
              </div>

              {/* === MAIN ITEM CARD === */}
              <div className="product-highlight-card">
                <div className="product-img">
                  <img
                    src={selectedOrder.productId.imageUrl}
                    alt={selectedOrder.productId.name}
                  />
                </div>
                <div className="product-info">
                  <span className="label">Cake</span>
                  <h3 className="name">{selectedOrder.productId.name}</h3>
                </div>
                <div className="product-price">
                  <IndianRupee size={16} />
                  {selectedOrder.productId.price.toFixed(2)}
                </div>
              </div>
            </div>

            {/* === ORDER SUMMARY DETAILS === */}
            <div className="right-section">
              <div className="order-summary-card">
                <h3 className="card-heading">Order Summary</h3>

                <div className="summary-row">
                  <span className="label">Order ID</span>
                  <span className="value">{selectedOrder._id}</span>
                </div>

                <div className="summary-row">
                  <span className="label">Shipping Address</span>
                  <span className="value">
                    {selectedOrderAddress?.street}, {selectedOrderAddress?.city}
                  </span>
                </div>

                <div className="summary-row">
                  <span className="label">Estimated Delivery Time</span>
                  <span className="value">1-2 days</span>
                </div>
              </div>
              {/* === CLOSE BUTTON === */}
              <button onClick={() => setIsOpen(false)} className="close-btn">
                close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminAllOrders;
