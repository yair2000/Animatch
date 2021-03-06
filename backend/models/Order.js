const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
   orderItems: [
     {
       productName: {
          type: String,
          required: true
       },
       quantity: {
          type: Number,
          required: true
       },
       productImage: {
          type: String,
          required: true
       },
       price: {
          type: Number,
          required: true
       },
       product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
       },
     }
   ],
   shippingInfo: {
      address: {
         type: String,
         required: true
      },
      city: {
         type: String,
         required: true
      },
      phoneNumber: {
         type: String,
         required: true
      },
      postalCode: {
         type: String,
         required: true
      },
      country: {
         type: String,
         required: true
      },
   },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   paymentInfo: {
      id: { type: String },
      status: { type: String }
   },
   paymentDate: { type: Date },
   itemsPrice: {
      type: Number,
      required: true,
      default: 0.0
   },
   taxPrice: {
      type: Number,
      required: true,
      default: 0.0
   },
   shippingPrice: {
      type: Number,
      required: true,
      default: 0.0
   },
   totalPrice: {
      type: Number,
      required: true,
      default: 0.0
   },
   orderStatus: {
      type: String,
      required: true,
      default: "Processing"
   },
   delivaryDate: { type: Date },
   orderDate: {
      type: Date,
      default: Date.now()
   }
});

module.exports = mongoose.model("Order", OrderSchema);