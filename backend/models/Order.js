import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  orderItems: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }],
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
   zipCode: {
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
  paymentMethod: {
    type: String,
    required: [true, "Please select payment method"],
    enum: {
      values: ["COD", "Card", "Google Pay"],
      message: "Please select: COD, Card or Google Pay",
    },
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
    enum: {
      values: ["Processing", "Shipped", "Delivered"],
      message: "Please select correct order status",
    },
    default: "Processing"
  },
  delivaryDate: { type: Date },
  orderDate: {
    type: Date,
    default: Date.now()
  }
});

export default mongoose.model("Order", OrderSchema);