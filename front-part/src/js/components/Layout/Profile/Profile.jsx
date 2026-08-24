import React, {useState, useEffect, useContext} from 'react';
import { User, Mail, Phone, MapPin, Package, Calendar, Clock, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {observer} from 'mobx-react-lite';
import { AuthContext } from '../main.jsx';

const Profile = observer(() => {
    const [selectedOrder, setselectedOrder] = useState(null);
    const { AuthStore } = useContext(AuthContext);

    if (!AuthStore.isAuth) return <h1>not logged in</h1>

    const user  = AuthStore.user || {}
    const orders = AuthStore.orders || []
    return (
        <div className="profile container">
            <h1 className="profile__title">User Profile</h1>

            <div className="profile__grid">
                <aside className="profile__info">
                    <div className="profile__card">
                        <div className="profile__avatar-wrapper">
                            <div className="profile__avatar">
                                <User size={48} />
                                <User size={48} />
                            </div>
                            <h2 className="profile__name">{user.firstName} {user.lastName || ''}</h2>
                            <p className="profile__member-since">
                                Member since {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
                            </p>
                        </div>

                        <div className="profile__details">
                            <div className="profile__detail-item">
                                <Mail size={18} />
                                <span>{user.email}</span>
                            </div>
                            <div className="profile__detail-item">
                                <Phone size={18} />
                                <span>{user.phone || '—'}</span>
                            </div>
                            <div className="profile__detail-item">
                                <MapPin size={18} />
                                <span>{user.address ? `${user.address}${user.city ? `, ${user.city}` : ''}` : '—'}</span>
                            </div>
                        </div>

                        <button className="profile__edit-button button-primary">
                            Edit Profile
                        </button>
                    </div>
                </aside>

                <main className="profile__main">
                    <div className="profile__section">
                        <div className="profile__section-header">
                            <Package size={24} />
                            <h3 className="profile__section-title">Order History</h3>
                        </div>

                        <div className="profile__orders">
                            {orders.length === 0 && (
                                <p>No orders yet</p>
                            )}
                            {orders.map(order => (
                                <div key={order._id} className="profile__order-card">
                                    <div className="profile__order-header">
                                        <div className="profile__order-id-group">
                                            <span className="profile__order-id">#{order._id.slice(-6).toUpperCase()}</span>
                                            <span className={`profile__order-status profile__order-status--${order.DeliveryStatus}`}>
                                                {order.DeliveryStatus}
                                            </span>
                                        </div>
                                        <span className="profile__order-total">{order.amount} NOK</span>
                                    </div>

                                    <div className="profile__order-body">
                                        <div className="profile__order-meta">
                                            <div className="profile__meta-item">
                                                <Calendar size={14} />
                                                <span>{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '—'}</span>
                                            </div>
                                            <div className="profile__meta-item">
                                                <Clock size={14} />
                                                <span>{order.createdAt ? new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}</span>
                                            </div>
                                        </div>

                                        <div className="profile__order-items">
                                            <p className="profile__items-label">Items ({order.items?.length || 0}):</p>
                                            <ul className="profile__items-list">
                                                {order.items?.map((item, idx) => {
                                                    return (
                                                        <li key={idx} className="profile__item-with-img">
                                                            {item.imageSrc && (
                                                                <img
                                                                    src={item.imageSrc}
                                                                    alt={item.title}
                                                                    className="profile__item-thumbnail"
                                                                    width={100}
                                                                />
                                                            )}
                                                            <span>{item.name} x{item.quantity}</span>
                                                        </li>
                                                    );
                                                })}
                                                {order.items?.length > 3 && (
                                                    <li className="profile__items-more">
                                                        and {order.items.length - 3} more...
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="profile__order-footer">
                                        <button
                                            className="profile__view-order"
                                            onClick={() => setselectedOrder(order)}
                                        >
                                            View Details <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>

            <AnimatePresence>
                {selectedOrder && (
                    <motion.div  className="profile__modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setselectedOrder(null)}
                    >
                        <motion.div
                            className="profile__modal-content"
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="profile__modal-close"
                                onClick={() => setselectedOrder(null)}
                            >
                                <X size={24} />
                            </button>

                            <div className="profile__modal-body">
                                <div className="profile__modal-right">
                                    <div className="profile__modal-header">
                                        <span className="profile__modal-id">#{selectedOrder._id.slice(-6)}</span>
                                        <span className={`profile__order-status profile__order-status--${selectedOrder.status.toLowerCase()}`}>
                                            {selectedOrder.status}
                                        </span>
                                    </div>

                                    <div className="profile__modal-info">
                                        <div className="profile__meta-item">
                                            <Calendar size={16} />
                                            <span>{new Date(selectedOrder.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="profile__meta-item">
                                            <Clock size={16} />
                                            <span>{new Date(selectedOrder.createdAt).toLocaleTimeString()}</span>
                                        </div>
                                    </div>

                                    <div className="profile__modal-section">
                                        <h4 className="profile__modal-section-title">Order Items</h4>
                                        <ul className="profile__modal-items-list">
                                            {selectedOrder.items.map((item, idx) => {
                                                return (
                                                    <li key={idx} className="profile__modal-item">
                                                        {item.imageSrc ? (
                                                            <div className="profile__modal-item-img">
                                                                <img src={item.imageSrc} alt={item.name} />
                                                            </div>
                                                        ) :(
                                                            <div className="profile__modal-item-dot" />
                                                        )}
                                                        <div className="profile__modal-item-info">
                                                            <span className="profile__modal-item-name">{item.name}</span>
                                                            <span className="profile__modal-item-qty">Quantity: {item.quantity}</span>
                                                        </div>
                                                        <div className="profile__modal-item-price">
                                                            {item.price ? `${(item.price * item.quantity).toFixed(2)} NOK` : ''}
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>

                                    <div className="profile__modal-footer">
                                        <div className="profile__modal-total-label">Total Amount:</div>
                                        <div className="profile__modal-total-value">{selectedOrder.amount} NOK</div>
                                    </div>

                                    <button className="profile__modal-action button-primary">
                                        Track Order
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
});

export default Profile;