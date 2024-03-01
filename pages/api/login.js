import connectDB from "../../middleware/mongoose";
import User from "../../models/User";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method === "POST") {
    console.log(req.body);
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      const bytes = CryptoJS.AES.decrypt(user.password, "123456");
      let decryptedString = bytes.toString(CryptoJS.enc.Utf8);
      console.log("Decrypted String:", decryptedString);
      let decryptPass = decryptedString;
      if (req.body.email == user.email && req.body.password == decryptPass) {
        var token = jwt.sign(
          { message: "Success !", email: user.email, name: user.name },
          "123456"
        );
        res.status(200).json({ success: true, token, email: user.email });
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
