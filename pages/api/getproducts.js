import Product from "../../models/Products";
import connectDB from "../../middleware/mongoose";
const handler = async (req, res) => {
  let producs = await Product.find();

  res.status(200).json({ producs });
};
export default connectDB(handler);
