import { ShoppingCart, Package } from 'lucide-react';


const CartPage = () => {
    const cartItems = 0;
    const totalOrders = 0;
    const cartTotal = 0.00;

    return (
        <div className="cart-page">
            <h1 className="cart-page__title">My Account</h1>

            <div className="cart-container">
                {/* Sidebar Navigation */}
                <aside className="cart-sidebar">
                    <h2 className="cart-sidebar__heading">NAVIGATION</h2>

                    <nav className="cart-nav">
                        <button className="cart-nav__item cart-nav__item--active">
                            <ShoppingCart className="cart-nav__icon" size={20} />
                            <div className="cart-nav__details">
                                <span className="cart-nav__label">Shopping Cart</span>
                                <span className="cart-nav__count">{cartItems} items</span>
                            </div>
                        </button>

                        <button className="cart-nav__item">
                            <Package className="cart-nav__icon" size={20} />
                            <div className="cart-nav__details">
                                <span className="cart-nav__label">Order History</span>
                                <span className="cart-nav__count">{totalOrders} orders</span>
                            </div>
                        </button>
                    </nav>

                    <div className="cart-summary">
                        <div className="cart-summary__row">
                            <span className="cart-summary__label">Cart Total</span>
                            <span className="cart-summary__value">${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="cart-summary__row">
                            <span className="cart-summary__label">Total Orders</span>
                            <span className="cart-summary__value">{totalOrders}</span>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="cart-main">
                    <div className="empty-cart">
                        <div className="empty-cart__icon-wrapper">
                            <ShoppingCart className="empty-cart__icon" size={40} />
                        </div>

                        <h2 className="empty-cart__title">Your Cart is Empty</h2>

                        <p className="empty-cart__description">
                            Discover our collection of premium storage solutions crafted
                            with Scandinavian quality.
                        </p>

                        <button className="explore-btn">
                            Explore Collection
                            <span className="explore-btn__arrow">›</span>
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CartPage;