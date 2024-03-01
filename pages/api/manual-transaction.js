import connectDB from "../../middleware/mongoose";
import Order from "../../models/Order";
import Products from "../../models/Products";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      console.log(
        "Request Body from manual transaction ---:---->>>>",
        req.body
      );
      let cart = req.body.cart;
      let serverSideSubTotal = 0;
      for (let item of cart) {
        const product = await Products.findOne({ slug: item.productId });
        if (
          Number(product.price.toString()) !== Number(item.price.toString())
        ) {
          res.status(400).json({ success: false, error: "Cart is tampered" });
          return;
        }
        // server side subtotal
        serverSideSubTotal += product.price * item.quantity;
      }
      const ALLOWED_SUBTOTAL_TOLERANCE = 0.01;

      if (
        Math.abs(serverSideSubTotal - parseFloat(req.body.subTotal)) >
        ALLOWED_SUBTOTAL_TOLERANCE
      ) {
        res.status(400).json({ success: false, error: "Cart is tampered" });
        return;
      }

      // check out of stock
      let orderPossible = true;
      for (const item of req.body.cart) {
        const product = await Products.findOne({ slug: item.productId });
        if (product.availableQty < item.quantity) {
          orderPossible = false;
          break;
        }
      }

      if (!orderPossible) {
        res.status(400).json({
          success: false,
          error: "Order not possible: Product out of stock",
        });
        return;
      }

      // Create the order if all products are available and prices are valid
      let order = new Order({
        email: req.body.email,
        orderId: req.body.oid,
        amount: req.body.subTotal,
        address: req.body.address,
        products: req.body.cart,
        status: "pending",
      });
      await order.save();

      // Update product quantities in the database
      for (const item of req.body.cart) {
        await Products.findOneAndUpdate(
          { slug: item.productId },
          { $inc: { availableQty: -item.quantity } }
        );
      }

      res
        .status(200)
        .json({ success: true, message: "Order saved, pending payment" });
    } catch (error) {
      console.error("Error processing manual transaction:", error);
      res.status(500).json({ success: false, error: "Internal server error." });
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
};

export default connectDB(handler);
