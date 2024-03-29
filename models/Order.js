const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    orderId: { type: String, required: true },
    paymentInfo: { type: String, default: " " },
    products: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
        price: { type: Number },
        name: { type: String },
        size: { type: String },
        variant: { type: String },
      },
    ],
    address: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    transactionId: { type: String },
    phone: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "Initiated", required: true },
    deliverySatus: { type: String, default: "Unshiped", required: true },
  },
  { timeStamps: true }
);

mongoose.models = {};
export default mongoose.model("Order", OrderSchema);
