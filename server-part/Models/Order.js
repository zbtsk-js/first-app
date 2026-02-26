import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
    items: [{ productId: String, name: String, quantity: Number}],
    email: String,
    amount: { type: Number, required: true},
    mollieId: {type: String, unique: true, sparse: true},
    status: {type: String, enum: ['pending', 'paid', 'failed'], default: 'pending'}

}, { timestamps: true });

export default model('Order', orderSchema);