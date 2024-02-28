const https = require("https");
const PaytmChecksum = require("PaytmChecksum");
import connectDB from "../../middleware/mongoose";
import Order from "../../models/Order";
import Products from "../../models/Products";
const handler = async (req, res) => {
  if (req.method === "POST") {
    let order = new Order({
      email: req.body.email,
      orderId: req.body.oid,
      amount: req.body.subTotal,
      address: req.body.address,
      products: req.body.cart,
    });

    // await order.save();

    // Check if cart is tempered
    let product;
    let sumTotal = 0;
    let cart = req.body.cart;
    console.log("cart:--->>>this is cart ---->>> ", cart);
    for (let item of cart) {
      // sumTotal += item.price * item.quantity;
      sumTotal += (item.price * item.quantity).toFixed(2);
      const product = await Products.findOne({ slug: item.productId });

      console.log("product:--->>>> ", product);

      if (product.price != item.price) {
        res
          .status(200)
          .json({ success: false, error: "Price of some items has changed" });
        return;
      }
    }

    // Find the product in the database using the productID

    // if (sumTotal !== req.body.subTotal) {
    //   res.status(400).json({ success: false, error: "Cart is tampered" });
    //   return;
    // }
    if (parseFloat(sumTotal) !== parseFloat(req.body.subTotal)) {
      res.status(400).json({ success: false, error: "Cart is tampered" });
      return;
    }

    // check if details are correct

    // var paytmParams = {};

    // paytmParams.body = {
    //   requestType: "Payment",
    //   mid: process.env.NEXT_PUBLIC_PAYTM_MID, // Removed quotes around process.env.PAYTM_MID
    //   websiteName: "YOUR_WEBSITE_NAME",
    //   orderId: req.body.oid,
    //   callbackUrl: `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`, // Removed quotes around ${NEXT_PUBLIC_HOST}
    //   txnAmount: {
    //     value: req.body.subTotal,
    //     currency: "INR",
    //   },
    //   userInfo: {
    //     custId: req.body.email,
    //   },
    // };

    // /*
    //  * Generate checksum by parameters we have in body
    //  * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
    //  */
    // const checksum = await PaytmChecksum.generateSignature(
    //   JSON.stringify(paytmParams.body),
    //   process.env.PAYTM_MKEY
    // );
    // paytmParams.head = {
    //   signature: checksum,
    //   version: "v1",
    // };

    // var post_data = JSON.stringify(paytmParams);

    // const requestAsync = async () => {
    //   return new Promise((resolve, reject) => {
    //     var options = {
    //       /* for Staging */
    //       // hostname: "securegw-stage.paytm.in" /*
    //       //   for Production
    //       hostname: "securegw.paytm.in",
    //       port: 443,
    //       path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=ORDERID_98765`, // Used process.env.PAYTM_MID
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/JSON",
    //         "Content-Length": post_data.length,
    //       },
    //     };

    //     var response = "";
    //     var post_req = https.request(options, function (post_res) {
    //       post_res.on("data", function (chunk) {
    //         response += chunk;
    //       });

    //       post_res.on("end", function () {
    //         let ress = JSON.parse(response).body;
    //         res.sucess = true;
    //         resolve(ress);
    //       });
    //     });

    //     post_req.write(post_data);
    //     post_req.end();
    //   });
    // };

    // // Call the requestAsync function
    // const responseData = await requestAsync();
    // //   console.log("responseData: ", responseData);

    // let myr = await requestAsync();
    // res.status(200).json(myr);
    res
      .status(200)
      .json({ success: true, message: "Order saved successfully" });

    await order.save();
  }
};

export default connectDB(handler);
