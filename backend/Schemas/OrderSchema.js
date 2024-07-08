const mongoose = require('mongoose');

// Define the order schema
const orderSchema = new mongoose.Schema({
  "orderNumber": { type: String, required: true },
  "customerName": { type: String, required: true },
  "email": { type: String, required: true, unique: true },
  "address": { type: String, required: true },
  "city": { type: String, required: true },
  "state": { type: String, required: true },
  "zipCode": { type: String, required: true },
  "status": { type: String, default:"pending"},
  "orderdate": { type: Date, default: Date.now},
  "paidAmount":{type:Number,required:true},
  "coupon":{type:String},
  "products": [{
    "productId": { type: String, required: true },
    "productName": { type: String, required: true },
    "productColor": { type: String, required: true },
    "productSize": { type: String, required: true },
    "productDiscount":{type:Number}
  }]
});

// Create the Order model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
