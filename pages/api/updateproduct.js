import Product from "../../models/Products";
import connectDB from "../../middleware/mongoose";
const handler = async (req, res) => {
  if (req.method === "POST") {
    for (let i = 0; i < req.body.length; i++) {
      let p = await Product.findByIdAndUpdate(req.body[i]._id, req.body[i]);
    }
    res.status(200).json({ message: "Success !" });
  } else {
    res.status(400).json({ message: "This method is not allowed" });
  }
};
export default connectDB(handler);
