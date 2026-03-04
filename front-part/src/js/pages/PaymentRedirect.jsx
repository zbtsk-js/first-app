import PaymentService from "/front-part/src/js/services/PaymentService.js";
import {useEffect, useState} from "react";
import { Link } from "react-router-dom";


const PaymentRedirect =  () => {
    const params = new URLSearchParams(window.location.search);
    const orderID = params.get("orderID");
    const [order, setOrder] = useState(null);

    useEffect(() => {

            let timeout
            const checkStatus = async () => {
                try {
                if(!orderID) return;
                const orderData = await PaymentService.getOrderStatus(orderID);
                setOrder(orderData)
                console.log(order)
                if(orderData.status === 'pending') {
                    timeout = setTimeout(checkStatus, 3000);
                }
            }catch (e) {
                    console.error(e)
                }
        }
        checkStatus();
        return () => clearTimeout(timeout);

    }, [orderID])
    useEffect(() => {
        console.log(order)
    }, [order])
    if (!order) {
        return (
            <div className="payment-redirect">
                <div className="payment-redirect__content">
                    <div className="payment-redirect__icon">
                        <div className="loader"></div>
                    </div>
                    <h1 className="payment-redirect__title">Checking payment</h1>
                    <p className="payment-redirect__text">Please wait, we are checking your order status...</p>
                </div>
            </div>
        );
    }

    if (order.status === "paid") {
        return (
            <div className="payment-redirect payment-redirect--success">
                <div className="payment-redirect__content">
                    <div className="payment-redirect__icon">
                        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                        </svg>
                    </div>
                    <h1 className="payment-redirect__title">Payment successful!</h1>
                    <p className="payment-redirect__text">Thank you for your purchase. Your order #{orderID} has been successfully paid and accepted for processing.</p>
                    <Link to="/catalog" className="payment-redirect__btn button-primary">Back to catalog</Link>
                </div>
            </div>
        );
    }

    if (order.status === "canceled" || order.status === "failed") {
        return (
            <div className="payment-redirect payment-redirect--error">
                <div className="payment-redirect__content">
                    <div className="payment-redirect__icon">❌</div>
                    <h1 className="payment-redirect__title">Payment error</h1>
                    <p className="payment-redirect__text">Unfortunately, the payment did not go through. Please try again or contact support.</p>
                    <Link to="/catalog" className="payment-redirect__btn">Back to shopping</Link>
                </div>
            </div>
        );
    }

    if (order.status === "pending") {
        return (
            <div className="payment-redirect payment-redirect--pending">
                <div className="payment-redirect__content">
                    <div className="payment-redirect__icon">
                        <div className="loader"></div>
                    </div>
                    <h1 className="payment-redirect__title">Waiting for payment</h1>
                    <p className="payment-redirect__text">Payment is being processed. This may take a few minutes...</p>
                </div>
            </div>
        );
    }

    return null;
};

export default PaymentRedirect;

