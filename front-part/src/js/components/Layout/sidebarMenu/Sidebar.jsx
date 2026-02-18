import { useState } from 'react';
import { X } from 'lucide-react';
import SideBarItem from "./SideBarItem.jsx";
import {useCart} from "/front-part/src/js/hooks/useCart";

const SidebarMenu = ({className}) => {
    const [isOpen, setIsOpen] = useState(false);
const {cart, CartPriceSummary, CartQuantitySummary} = useCart()
    const toggleMenu = () => {
        setIsOpen(prev => !prev);
        document.body.classList.toggle('sidebar-open');
    };

    return (
        <div className="header__cart-wrapper">
            <a onClick={toggleMenu} className={className}>
                Cart
                {CartQuantitySummary > 0 && (<span className="cart-count" > {CartQuantitySummary} </span>
                )}
            </a>

            <div
                className={`sidebar-menu__overlay ${isOpen ? 'is-active' : ''}`}
                onClick={toggleMenu}
            />

            <aside className={`sidebar-menu ${isOpen ? 'is-open' : ''}`}>
                <div className="sidebar-menu__header">
                    <h2 className="sidebar-menu__title">Cart</h2>
                    <button className="sidebar-menu__close" onClick={toggleMenu}>
                        <X />
                    </button>
                </div>

                <div className="sidebar-menu__body">
                    {cart?.length? (cart.map(product =>(
                        <SideBarItem key = {product.id}{...product}/>
                    )))  : (<div>Empty</div>) }


                </div>

                <div className="sidebar-menu__summary">
                    <div className="sidebar-menu__total">
                        <span>Total:</span>
                        <span>{CartPriceSummary} NOK</span>
                    </div>
                    <button disabled={CartPriceSummary <= 0} className='sidebar-menu__button button-primary'>Checkout</button>
                </div>
            </aside>
        </div>
    );
};

export default SidebarMenu;