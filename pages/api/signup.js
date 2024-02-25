import connectDB from "../../middleware/mongoose";
import User from "../../models/User";
var CryptoJS = require("crypto-js");
const handler = async (req, res) => {
  if (req.method === "POST") {
    console.log(req.body);
    const { name, email } = req.body;
    let u = new User({
      name,
      email,
      password: CryptoJS.AES.encrypt(req.body.password, "123456").toString(),
      // passowrd: req.body.passoword.toString(),
    });
    await u.save();
    res.status(200).json({ message: "Success !" });
  } else {
    res.status(400).json({ message: "This method is not allowed" });
  }
};
export default connectDB(handler);
