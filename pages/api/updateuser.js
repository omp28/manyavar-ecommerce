// import User from "../../models/User";
// import connectDB from "../../middleware/mongoose";
// import e from "cors";
// import jsonwebtoken from "jsonwebtoken";
// const handler = async (req, res) => {
//   if (req.method === "POST") {
//     let jwt = req.body.token;
//     let user = jsonwebtoken.verify(jwt, process.env.JWT_SECRET, {});
//     // console.log(user);
//     // let user = await User.findOne({ email: req.body.email });
//     res.status(200).json({ user });
//   } else {
//     res.status(400).json({ error: error });
//   }
// };

// export default connectDB(handler);
import User from "../../models/User";
import connectDB from "../../middleware/mongoose";
import e from "cors";
import jsonwebtoken from "jsonwebtoken";
const handler = async (req, res) => {
  if (req.method === "POST") {
    let jwt = req.body.token;
    let user = jsonwebtoken.verify(jwt, process.env.JWT_SECRET, {});
    // console.log(user);
    let dbuser = await User.findOneAndUpdate(
      { email: user.email },
      {
        name: req.body.name,
        address: req.body.address,
        zip: req.body.zip,
        phone: req.body.phone,
      }
    );

    const { name, email, address, zip } = dbuser;
    res.status(200).json({ sucess: true, name, email, address, zip });
  } else {
    res.status(400).json({ error: error });
  }
};

export default connectDB(handler);
