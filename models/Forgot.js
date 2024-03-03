const mongoose = require("mongoose");

const ForgoSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    token: { type: String, required: true },
  },
  { timeStamp: true }
);

mongoose.models = {};
export default mongoose.model("Forgot", ForgoSchema);
