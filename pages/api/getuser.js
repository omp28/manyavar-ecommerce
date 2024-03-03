import User from "../../models/User";
import connectDB from "../../middleware/mongoose";
import e from "cors";
import jsonwebtoken from "jsonwebtoken";
const handler = async (req, res) => {
  if (req.method === "POST") {
    let jwt = req.body.token;
    let user = jsonwebtoken.verify(jwt, process.env.JWT_SECRET, {});
    let dbuser = await User.findOne({ email: user.email });
    const { name, email, address, zip, phone } = dbuser;
    res.status(200).json({ name, email, address, zip, phone });
  } else {
    res.status(400).json({ error: error });
  }
};

export default connectDB(handler);
