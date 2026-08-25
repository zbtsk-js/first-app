import {useState, useEffect, useContext} from 'react';
import {X, ShoppingCart, Sidebar} from 'lucide-react';
import SideBarItem from "../Layout/sidebarMenu/SideBarItem.jsx";
import {useCart} from "/front-part/src/js/hooks/useCart";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import { AuthContext } from '../../../js/main.jsx';
import PaymentService from "../../../js/services/PaymentService.js";
const SidebarMenu = ({className}) => {
    const {AuthStore} = useContext(AuthContext)
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
const {cart, CartPriceSummary, CartQuantitySummary} = useCart()
    useEffect(() => {
        document.body.classList.toggle('sidebar-open', isOpen);
    }, [isOpen]);
    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    };
    const HandlecheckOut = () => {
        if (AuthStore.isAuth){
            const user = AuthStore.user;
            const onSubmit = async () => {
                try {
                    const payload = {
                        "items": cart.map(item => ({
                            productId: item.id,
                            name: item.title,
                            quantity: item.quantity,
                            imageSrc: item.imageSrc})),

                        "email": user.email,
                        "firstName": user.firstName,
                        "lastName": user.lastName,
                        "address": user.address,
                        "city": user.city,
                        "country": user.country,
                        "postcode": user.postcode,
                    }

                    const res = await PaymentService.createPayment(payload)
                    const PaymentLink = res.data.checkoutUrl
                    window.location.href = PaymentLink;
                } catch (e) {
                    console.error("Payment creation failed:", e);
                }
            }
            onSubmit()
            return
        }
        navigate('/checkout');
    }
    return (
        <div className="header__cart-wrapper">
            <a onClick={toggleMenu} className={className}>
                <ShoppingCart size={20} />
                {CartQuantitySummary > 0 && (<span className="cart-count" > {CartQuantitySummary} </span>
                )}
            </a>

            <div className={`sidebar-menu__overlay ${isOpen ? 'is-active' : ''}`} onClick={toggleMenu}>

            <aside className={`sidebar-menu ${isOpen ? 'is-open' : ''}`} onClick={(e)=>{
            e.stopPropagation()
            }}>
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
                        <span>{CartPriceSummary} KR</span>
                    </div>
                    <button disabled={CartPriceSummary <= 0} className='sidebar-menu__button button-primary' onClick={HandlecheckOut}> Checkout</button>
                </div>
            </aside>
        </div>
        </div>
    );
};

export default observer(SidebarMenu);