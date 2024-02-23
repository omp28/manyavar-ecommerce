import Order from "../../models/Order";
import connectDB from "../../middleware/mongoose";
import { findDOMNode } from "react-dom";

const handler = async (req, res) => {
  // validate paytm checksum
  // validate status into orders table after checking the transaction status
  if (req.body.STATUS === "TXN_SUCCESS") {
    let order = await Order.findOneAndUpdate(
      { orderId: req.body.oid },
      { status: "paid", paymentInfo: Json.stringify(req.body) }
    );
  } else if (req.body.STATUS == "PENDING") {
    let order = await Order.findOneAndUpdate(
      { orderId: req.body.oid },
      { status: "pending", paymentInfo: Json.stringify(req.body) }
    );
  }
  // chenge it for stripe ^^^^

  // initiate shipping
  // redirect to order confirmation page
  res.redirect("/order", 200);
  res.status(200).json({ name: "John Doe" });
};

export default connectDB(handler);
