import Order from "../Models/Order.js";

 class OrderService {
        async createOrder(data){
            const order = await Order.create({email: data.email, amount: data.amount, items: data.items})
return order;
            }}
export default new OrderService()