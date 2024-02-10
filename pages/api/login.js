import connectDB from "../../middleware/mongoose";
import User from "../../models/User";
const handler = async (req, res) => {
  if (req.method === "POST") {
    console.log(req.body);
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      if (req.body.email == user.email && req.body.password == user.password) {
        res
          .status(200)
          .json({ message: "Success !", email: user.email, name: user.name });
      } else {
        res.status(400).json({ message: "Invalid credentials !" });
      }
    } else {
      res.status(400).json({ message: "no user FOUND !" });
    }
  } else {
    res.status(400).json({ message: "This method is not allowed" });
  }
};
export default connectDB(handler);
