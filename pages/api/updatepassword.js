import User from "../../models/User";
import connectDB from "../../middleware/mongoose";
import e from "cors";
import jsonwebtoken from "jsonwebtoken";
var CryptoJS = require("crypto-js");
const handler = async (req, res) => {
  if (req.method === "POST") {
    let jwt = req.body.token;
    let user = jsonwebtoken.verify(jwt, process.env.JWT_SECRET, {});
    let dbuser = await User.findOne({ email: user.email });
    const bytes = CryptoJS.AES.decrypt(dbuser.password, "123456");
    let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
    if (
      decryptedPass == req.body.Password &&
      req.body.newPassword == req.body.confirmPassword
    ) {
      let a = await User.findOneAndUpdate(
        { email: dbuser.email },
        {
          password: CryptoJS.AES.encrypt(
            req.body.newPassword,
            "123456"
          ).toString(),
        }
      );
      res.status(200).json({ sucess: true });
      return;
    } else {
      res.status(400).json({ sucess: false });
    }
  } else {
    res.status(400).json({ error: error });
  }
};

export default connectDB(handler);
