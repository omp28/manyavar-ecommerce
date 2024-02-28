// api/manual-transaction.js

import connectDB from "../../middleware/mongoose";
import Order from "../../models/Order";
import Products from "../../models/Products";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      // Extract necessary information from the request
      const statuss = req.body.status;
      const oid = req.body.ORDERID;

      const cart = req.body.cart;

      //   console.log("Request Body ---:---->>>>>s", req.body);
      console.log("Request Body status ---:---->>>>>", statuss);
      // Check your conditions for marking the order as paid
      if (statuss != "TXN_SUCCESS") {
        // Update the order status to "paid" and save payment information
        const order = await Order.findOneAndUpdate(
          { orderId: oid },
          { status: "paid", paymentInfo: JSON.stringify(req.body) },
          { new: true }
        );

        // Update product quantities in the database
        for (const item of cart) {
          await Products.findOneAndUpdate(
            { slug: item.productId },
            { $inc: { availableQty: -item.quantity } }
          );
        }

        // Additional logic, if needed...

        // Respond with success
        res.status(200).json({
          success: true,
          message: "Order successfully marked as paid.",
        });
      } else {
        // Handle other conditions or payment status
        res
          .status(400)
          .json({ success: false, error: "Invalid payment status." });
      }
    } catch (error) {
      console.error("Error processing manual transaction:", error);
      res.status(500).json({ success: false, error: "Internal server error." });
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
};

export default connectDB(handler);
