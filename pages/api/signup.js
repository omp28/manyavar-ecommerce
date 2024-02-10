import connectDB from "../../middleware/mongoose";
import User from "../../models/User";
const handler = async (req, res) => {
  if (req.method === "POST") {
    console.log(req.body);
    let u = new User(req.body);
    await u.save();
    res.status(200).json({ message: "Success !" });
  } else {
    res.status(400).json({ message: "This method is not allowed" });
  }
};
export default connectDB(handler);
