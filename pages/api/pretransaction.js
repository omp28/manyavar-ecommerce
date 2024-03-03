import { redirect } from "next/dist/server/api-utils";
import connectDB from "../../middleware/mongoose";
import Order from "../../models/Order";
import Products from "../../models/Products";
import pincode from "../../pincode.json";
import payment from "../../components/payment";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      // check if pincode is servicable
      if (!Object.keys(pincode).includes(req.body.zip)) {
        res.status(400).json({
          success: false,
          error: "Service not available in your area",
        });
        return;
      }
      let cart = req.body.cart;
      let serverSideSubTotal = 0;
      if (req.body.subTotal <= 0) {
        res.status(400).json({
          success: false,
          error: "Invalid subTotal ,Please Build your Cart",
        });
        return;
      }
      for (let item of cart) {
        const product = await Products.findOne({ slug: item.productId });
        if (
          Number(product.price.toString()) !== Number(item.price.toString())
        ) {
          res.status(400).json({ success: false, error: "Cart is tampered" });
          return;
        }
        // server side subtotal
        serverSideSubTotal += product.price * item.quantity;
      }
      const ALLOWED_SUBTOTAL_TOLERANCE = 0.01;

      if (
        Math.abs(serverSideSubTotal - parseFloat(req.body.subTotal)) >
        ALLOWED_SUBTOTAL_TOLERANCE
      ) {
        res.status(400).json({ success: false, error: "Cart is tampered" });
        return;
      }

      // check out of stock
      let orderPossible = true;
      for (const item of req.body.cart) {
        const product = await Products.findOne({ slug: item.productId });
        if (product.availableQty < item.quantity) {
          orderPossible = false;
          break;
        }
      }

      if (!orderPossible) {
        res.status(400).json({
          success: false,
          error: "Order not possible: Product out of stock",
        });
        return;
      }
      // console.log("req.body---->>>>", req.body);
      const pincode_length = req.body.zip.length;
      const phone_length = req.body.phone.length;

      // form validation
      if (phone_length != 10) {
        res.status(400).json({ success: false, error: "Invalid phone number" });
        return;
      }
      if (pincode_length != 6) {
        res.status(400).json({ success: false, error: "Invalid pincode" });
        return;
        res;
      }

      // Create the order
      let order = new Order({
        email: req.body.email,
        name: req.body.name,
        orderId: req.body.oid,
        amount: req.body.subTotal,
        address: req.body.address,
        city: req.body.city,
        phone: req.body.phone,
        state: req.body.state,
        products: req.body.cart,
        status: "pending",
      });
      await order.save();
      const paymentStatus = payment.success; // failure' or 'success' for testing till stripe is integrated

      console.log("Order saved, payment status:", paymentStatus);
      res.status(200).json({
        oid: req.body.oid,
        paymentStatus,
      });
    } catch (error) {
      console.error("Error processing pre transaction:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
};

export default connectDB(handler);
