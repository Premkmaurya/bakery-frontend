import React, { useState } from 'react';
import { Package, ChevronRight, Clock, CheckCircle, XCircle, Truck } from 'lucide-react';
import './MyOrders.scss';

const MyOrders = () => {
  // === MOCK DATA ===
  const [orders] = useState([
    {
      id: '#ORD-7782',
      date: 'Dec 12, 2025',
      status: 'Processing', // Processing, Delivered, Cancelled
      total: 125.50,
      items: [
        { name: 'Red Velvet Cake', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=150&auto=format&fit=crop' },
        { name: 'Macarons (Box of 6)', img: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=150&auto=format&fit=crop' }
      ]
    },
    {
      id: '#ORD-7750',
      date: 'Nov 28, 2025',
      status: 'Delivered',
      total: 45.00,
      items: [
        { name: 'French Baguette', img: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?q=80&w=150&auto=format&fit=crop' }
      ]
    },
    {
      id: '#ORD-7012',
      date: 'Oct 15, 2025',
      status: 'Cancelled',
      total: 210.00,
      items: [
        { name: '3-Tier Wedding Cake', img: 'https://images.unsplash.com/photo-1626803775151-61d756612fcd?q=80&w=150&auto=format&fit=crop' },
        { name: 'Party Poppers', img: 'https://images.unsplash.com/photo-1514525253440-b39345208668?q=80&w=150&auto=format&fit=crop' },
        { name: 'Candles', img: 'https://images.unsplash.com/photo-1570823635306-250afb86e09a?q=80&w=150&auto=format&fit=crop' }
      ]
    }
  ]);

  

  // Helper to get status color and icon
  const getStatusConfig = (status) => {
    switch (status) {
      case 'Delivered':
        return { color: 'green', icon: <CheckCircle size={14} /> };
      case 'Processing':
        return { color: 'blue', icon: <Clock size={14} /> };
      case 'Cancelled':
        return { color: 'red', icon: <XCircle size={14} /> };
      default:
        return { color: 'gray', icon: <Package size={14} /> };
    }
  };

  return (
    <div className="my-orders-wrapper">

      <div className="orders-list">
        {orders.map((order) => {
          const statusConfig = getStatusConfig(order.status);

          return (
            <div key={order.id} className="order-card">
              
              {/* === CARD HEADER (ID & STATUS) === */}
              <div className="card-header">
                <div className="order-meta">
                  <h3 className="order-id">{order.id}</h3>
                  <span className="order-date">{order.date}</span>
                </div>
                <div className={`status-badge ${statusConfig.color}`}>
                  {statusConfig.icon}
                  <span>{order.status}</span>
                </div>
              </div>

              {/* === CARD BODY (IMAGES & PREVIEW) === */}
              <div className="card-body">
                <div className="items-preview">
                  {order.items.map((item, index) => (
                    <div key={index} className="item-thumb" title={item.name}>
                      <img src={item.img} alt={item.name} />
                    </div>
                  ))}
                  {/* Optional: Logic to show "+2 more" if too many items */}
                </div>
                <div className="items-text">
                  <p>{order.items[0].name} {order.items.length > 1 && `+ ${order.items.length - 1} more`}</p>
                </div>
              </div>

              {/* === CARD FOOTER (TOTAL & ACTIONS) === */}
              <div className="card-footer">
                <div className="total-wrapper">
                  <span className="label">Total Amount</span>
                  <span className="amount">${order.total.toFixed(2)}</span>
                </div>
                
                <div className="actions">
                  {order.status === 'Processing' && (
                    <button className="btn-track">
                      <Truck size={16} /> Track
                    </button>
                  )}
                  <button className="btn-details">
                    View Details <ChevronRight size={16} />
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