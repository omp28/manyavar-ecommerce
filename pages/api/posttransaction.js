import Order from "../../models/Order";
import connectDB from "../../middleware/mongoose";
import { findDOMNode } from "react-dom";
import Products from "../../models/Products";

const handler = async (req, res) => {
  let order;
  // validate status into orders table after checking the transaction status

  console.log("hello this is req.body:--->>> ", req.body.status);
  if (req.body.success) {
    order = await Order.findOneAndUpdate(
      { orderId: req.body.oid },
      { status: "paid", paymentInfo: JSON.stringify(req.body) }
    );
    let products = order.products;
    console.log("products:--->>> ", products);
    console.log("item quantity:--->>>> ", item.quantity);
    for (let slug in products) {
      await Products.findOneAndUpdate(
        { slug: slug },
        { $inc: { availableQty: -products[slug].quantity } }
      );
    }
  } else if (req.body.STATUS == "PENDING") {
    order = await Order.findOneAndUpdate(
      { orderId: req.body.oid },
      { status: "pending", paymentInfo: JSON.stringify(req.body) }
    );
  }
  // chenge it for stripe ^^^^

  // initiate shipping
  // redirect to order confirmation page
  // res.redirect(`/order?id=` + order._id, 200),
  res

    .status(200)
    .json({ success: true, message: "Order successfully marked as paid." });
};

export default connectDB(handler);
