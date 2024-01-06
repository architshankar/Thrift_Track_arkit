import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    url: { type: String, required: true, unique: true },
    currency: { type: String, default: '₹' },
    image: { type: String },
    title: { type: String },
    currentPrice: { type: Number },
    originalPrice: { type: Number },
    priceHistory: [{
        price: { type: Number, required: true },
        date: { type: Date, default: Date.now }
    }],
    discountRate: { type: Number },
    isOutOfStock: { type: Boolean, default: false },
    deliveryText: { type: String },
    lowestPrice: { type: Number },
    highestPrice: { type: Number },
    average: { type: Number },
    description: { type: String },
    reviewsCount: { type: Number },
    users: [
        { email: { type: String, required: true } } 
    ],
}, { timestamps: true });


const Product = mongoose.models.Product|| mongoose.model('Product',productSchema)

export default Product