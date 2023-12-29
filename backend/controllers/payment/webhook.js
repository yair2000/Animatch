import Stripe from "stripe";
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

import asyncErrors from "../../middlewares/asyncErrors.js";
import Order from "../../models/Order.js";

const getOrderItems = async(line_items) =>{
  return new Promise((resolve, reject) =>{
    let cartItems = [];
    line_items?.data?.forEach(async(item) =>{
      const product = await stripe.products.retrieve(item.price.product); // product in parenthesis - Stripe product ID
      const productId = product.metadata.productId;
      
      cartItems.push({
        product: productId,
        name: product.name,
        price: item.price.unit_amount_decimal / 100,
        quantity: item.quantity,
        image: product.images[0],
      });

      if(cartItems.length === line_items?.data?.length){
        resolve(cartItems);
      }
    });
  });
};

export const webhook = asyncErrors(async(req, res, next) =>{
  try{
    const signature = req.headers["stripe-signature"];
    const event = stripe.webhooks.constructEvent(
    req.rawBody,
    signature,
    process.env.STRIPE_WEBHOOK_KEY);

    if(event.type === "checkout.session.completed"){
      const session = event.data.object;
      const line_items = await stripe.checkout.sessions.listLineItems(session.id);
      
      const orderItems = await getOrderItems(line_items);
      const user = session.client_reference_id;

      const totalPrice = session.amount_total / 100;
      const taxPrice = session.total_details.amount_tax / 100;
      const shippingPrice = session.total_details.amount_shipping / 100;
      const itemsPrice = session.metadata.itemsPrice;
  
      const shippingInfo ={
        address: session.metadata.address,
        city: session.metadata.city,
        phoneNumber: session.metadata.phoneNumber,
        zipCode: session.metadata.zipCode,
        country: session.metadata.country,
      };

      const paymentInfo ={
        id: session.payment_intent,
        status: session.payment_status,
      };

      const orderData ={
        shippingInfo,
        orderItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        paymentInfo,
        paymentMethod: "Card",
        user,
      };
      await Order.create(orderData);
      res.status(200).json({ success: true });
    }
  }
  catch(error){
    console.log("Error: ", error);
  }
});