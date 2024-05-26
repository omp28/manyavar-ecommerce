// pages/api/pretransaction.js

import Stripe from "stripe";
import connectDB from "../../middleware/mongoose";
import Order from "../../models/Order";
import Product from "../../models/Product";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const {
        paymentMethodId,
        cart,
        oid,
        subTotal,
        email,
        name,
        city,
        address,
        zip,
        phone,
        state,
      } = req.body;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: subTotal * 100,
        currency: "inr",
        payment_method: paymentMethodId,
        confirm: true,
        error_on_requires_action: true,
      });

      if (paymentIntent.status === "succeeded") {
        let order = new Order({
          email,
          name,
          orderId: oid,
          amount: subTotal,
          address,
          city,
          zip,
          phone,
          state,
          products: cart,
          status: "paid",
        });

        await order.save();

        for (const item of cart) {
          const product = await Product.findOne({ slug: item.productId });
          product.availableQty -= item.quantity;
          await product.save();
        }

        res.status(200).json({ success: true });
      } else {
        res.status(400).json({ error: "Payment not confirmed." });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default connectDB(handler);
