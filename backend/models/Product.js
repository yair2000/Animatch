const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
   productName: {
      type: String,
      required: [true, "Please enter a product name"],
      trim: true
   },
   images: [
      {
         public_id: {
            type: String,
            required: true
         },
         url: {
            type: String,
            required: true
         },
      }
   ],
   description: {
      type: String,
      required: [true, "Please enter a product description"]
   },
   price: {
      type: Number,
      required: [true, "Please enter a price"],
      default: 0.0
   },
   category: {
      type: String,
      required: [true, "Please select a category"],
      enum: {
         values: [
            "Manga",
            "Toys",
            "Miscellaneous"
         ],
         message: "Select the correct category for the product"
      }
   },
   seller: { type: String },
   stock: {
      type: Number,
      required: [true, "Please enter product stock"],
      default: 0
   },
   date: {
      type: Date,
      default: Date.now
   },
   status: {
     type: String,
     required: true,
     enum: ["New", "Like New", "Refurbished"],
     default: "New"
   },
   rating: {
      type: Number,
      default: 0
   },
   reviews: [
      {
         user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
         },
         name: {
            type: String,
            required: true
         },
         rating: {
            type: Number,
            required: true
         },
         comment: {
            type: String,
            required: true
         }
      }
   ],
   user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
   },
   totalReviews: {
      type: Number,
      default: 0
   }
});

module.exports = mongoose.model("Product", ProductSchema);