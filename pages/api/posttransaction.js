import Order from "../../models/Order";
import connectDB from "../../middleware/mongoose";
import Products from "../../models/Products";

const handler = async (req, res) => {
  // stripe - pending
  // save transactionID and mark order as paid - pending

  if (req.method === "POST") {
    if (!req.body.oid || !req.body.paymentStatus) {
      return res.status(400).json({ error: "Invalid request data" });
    }
    try {
      const order = await Order.findOneAndUpdate(
        { orderId: req.body.oid },
        { status: req.body.paymentStatus }
      );
      if (req.body.paymentStatus === "success") {
        // decrement the stock
        console.log("success true order is placed and paid");
        let products = order.products;
        for (const item of req.body.cart) {
          await Products.findOneAndUpdate(
            { slug: item.productId },
            { $inc: { availableQty: -item.quantity } }
          );
        }

        res.status(200).json({ txnStatus: true });
      } else {
        res.status(200).json({ txnStatus: false });
      }
    } catch (error) {
      console.log("Error updating order", error);
      res.status(500).json({ txnStatus: false });
    }
  } else {
    console.log("order not placed method not allowed");
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default connectDB(handler);
