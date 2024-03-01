import Order from "../../models/Order";
import connectDB from "../../middleware/mongoose";
import jsonwebtoken from "jsonwebtoken";

const handler = async (req, res) => {
  const token = req.body.token;
  try {
    const data = jsonwebtoken.verify(token, process.env.JWT_SECRET, {});
    let orders = await Order.find({ email: data.email });
    res.status(200).json({ orders });
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    res.status(401).json({ error: "Invalid token" });
  }
};

export default connectDB(handler);
