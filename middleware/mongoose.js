import mongoose from "mongoose";
import cors from "cors";

const connectDB = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }
  await mongoose.connect(process.env.MONGODB_URI);
  return handler(req, res);
};

const corsConfig = {
  origin: "https://myyecommerce.vercel.app/",
  methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
};

const corsMiddleware = cors(corsConfig);

export default connectDB(
  corsMiddleware((handler) => async (req, res) => {
    return handler(req, res);
  })
);
