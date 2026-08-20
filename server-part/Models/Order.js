import mongoose,{ Schema, model } from 'mongoose';
import User from './User.js';
const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    items: [{ productId: String, name: String, quantity: Number, imageSrc: String}],

        customerData: {
            email:     String,
            firstName: String,
            lastName:  String,
            phone:     String,
            address:   String,
            city:      String,
            postcode:  String,
            country:   String,
        },
    amount: { type: Number, required: true},
    mollieId: {type: String, unique: true, sparse: true},
    status: {type: String, enum: ['pending', 'paid', 'failed'], default: 'pending'},
    DeliveryStatus: {type: String, enum: ['processing', 'delivered'], default: 'processing', required: false}
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);