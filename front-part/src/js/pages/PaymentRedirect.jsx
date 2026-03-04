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
                    <h1 className="payment-redirect__title">Проверка оплаты</h1>
                    <p className="payment-redirect__text">Пожалуйста, подождите, мы проверяем статус вашего заказа...</p>
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
                    <h1 className="payment-redirect__title">Оплата успешна!</h1>
                    <p className="payment-redirect__text">Спасибо за покупку. Ваш заказ #{orderID} успешно оплачен и принят в обработку.</p>
                    <Link to="/catalog" className="payment-redirect__btn button-primary">Вернуться в каталог</Link>
                </div>
            </div>
        );
    }

    if (order.status === "canceled" || order.status === "failed") {
        return (
            <div className="payment-redirect payment-redirect--error">
                <div className="payment-redirect__content">
                    <div className="payment-redirect__icon">❌</div>
                    <h1 className="payment-redirect__title">Ошибка оплаты</h1>
                    <p className="payment-redirect__text">К сожалению, оплата не прошла. Попробуйте еще раз или свяжитесь с поддержкой.</p>
                    <Link to="/catalog" className="payment-redirect__btn">Вернуться к покупкам</Link>
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
                    <h1 className="payment-redirect__title">Ожидаем оплату</h1>
                    <p className="payment-redirect__text">Платеж обрабатывается. Это может занять несколько минут...</p>
                </div>
            </div>
        );
    }

    return null;
};

export default PaymentRedirect;

