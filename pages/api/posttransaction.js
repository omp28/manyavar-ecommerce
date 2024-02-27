import Order from "../../models/Order";
import connectDB from "../../middleware/mongoose";
import { findDOMNode } from "react-dom";

const handler = async (req, res) => {
  let order;
  // validate paytm checksum
  // validate status into orders table after checking the transaction status
  if (req.body.STATUS === "TXN_SUCCESS") {
    order = await Order.findOneAndUpdate(
      { orderId: req.body.oid },
      { status: "paid", paymentInfo: JSON.stringify(req.body) }
    );
  } else if (req.body.STATUS == "PENDING") {
    order = await Order.findOneAndUpdate(
      { orderId: req.body.oid },
      { status: "pending", paymentInfo: JSON.stringify(req.body) }
    );
  }
  // chenge it for stripe ^^^^

  // initiate shipping
  // redirect to order confirmation page
  res.redirect(`/order?id=` + order._id, 200);
};

export default connectDB(handler);
