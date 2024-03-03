const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, default: " " },
    zip: { type: String, default: " " },
  },
  { timeStamp: true }
);

mongoose.models = {};
export default mongoose.model("User", UserSchema);
