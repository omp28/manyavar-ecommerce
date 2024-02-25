import Order from "../../models/Order";
import connectDB from "../../middleware/mongoose";
import jsonwebtoken from "jsonwebtoken";

const handler = async (req, res) => {
  const token = req.body.token;
  console.log("Token:--->>>", token);

  if (!token) {
    return res.status(400).json({ error: "Token not provided" });
  }

  try {
    const data = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", data);

    let orders = await Order.find({ email: data.email });
    res.status(200).json({ name: "John Doe" });
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export default connectDB(handler);
