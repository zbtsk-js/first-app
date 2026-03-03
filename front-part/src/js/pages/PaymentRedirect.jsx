import PaymentService from "/front-part/src/js/services/PaymentService.js";
import {useEffect, useState} from "react";


const PaymentRedirect =  () => {
    const params = new URLSearchParams(window.location.search);
    const orderID = params.get("orderID");
    const [order, setOrder] = useState(null);

    useEffect(() => {
        try {
            let timeout
            const checkStatus = async () => {
                if(!orderID) return;
                const orderData = await PaymentService.getOrderStatus(orderID);
                setOrder(orderData)
                console.log(orderData)
                if(orderData.status === 'pending') {
                    timeout = setTimeout(checkStatus, 3000);
                }
            }
            checkStatus();
            return () => clearTimeout(timeout);
        } catch (e) {
            console.error(e)
        }


       }, [orderID])
        if (!order) return <div>⏳ Проверяем оплату...</div>;
        if (order.status === "paid") return <h1>✅ Спасибо за покупку!</h1>;
        if (order.status === "canceled" || order.status === "failed") return <h1>❌ Оплата не прошла</h1>;
        if (order.status === "pending") return <h1>Pending is payment</h1>
}
export default PaymentRedirect

