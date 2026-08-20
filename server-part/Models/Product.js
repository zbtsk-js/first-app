import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    id: Number,
    title: String,
    subtitle: String,
    capacity: String,
    price: Number,
    imageSrc: String,
    imageAlt: String,
    quantity: Number
})

export default mongoose.model('ProductModule', ProductSchema)