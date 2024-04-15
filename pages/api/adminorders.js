import Order from "../../models/Order";
import connectDB from "../../middleware/mongoose";

const handler = async (req, res) => {
  //  simply return all the orders in the database
  if (req.method === "GET") {
    try {
      const orders = await Order.find({});
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: "Error fetching orders" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default connectDB(handler);
