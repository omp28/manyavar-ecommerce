const https = require("https");
const PaytmChecksum = require("PaytmChecksum");
import connectDB from "../../middleware/mongoose";
import Order from "../../models/Order";

const handler = async (req, res) => {
  if (req.method === "POST") {
    // initialte an order corressponding to this order id

    let order = new Order({
      email: req.body.email,
      orderId: req.body.oid,
      amount: req.body.subTotal,
      address: req.body.address,
      products: req.body.cart,
    });

    await order.save();

    var paytmParams = {};

    paytmParams.body = {
      requestType: "Payment",
      mid: process.env.NEXT_PUBLIC_PAYTM_MID, // Removed quotes around process.env.PAYTM_MID
      websiteName: "YOUR_WEBSITE_NAME",
      orderId: req.body.oid,
      callbackUrl: `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`, // Removed quotes around ${NEXT_PUBLIC_HOST}
      txnAmount: {
        value: req.body.subTotal,
        currency: "INR",
      },
      userInfo: {
        custId: req.body.email,
      },
    };

    /*
     * Generate checksum by parameters we have in body
     * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
     */
    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      process.env.PAYTM_MKEY
    );
    paytmParams.head = {
      signature: checksum,
    };

    var post_data = JSON.stringify(paytmParams);

    const requestAsync = async () => {
      return new Promise((resolve, reject) => {
        var options = {
          /* for Staging */
          // hostname: "securegw-stage.paytm.in" /*
          //   for Production
          hostname: "securegw.paytm.in",
          port: 443,
          path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=ORDERID_98765`, // Used process.env.PAYTM_MID
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": post_data.length,
          },
        };

        var response = "";
        var post_req = https.request(options, function (post_res) {
          post_res.on("data", function (chunk) {
            response += chunk;
          });

          post_res.on("end", function () {
            console.log("Response: ", response);
            resolve(response);
          });
        });

        post_req.write(post_data);
        post_req.end();
      });
    };

    // Call the requestAsync function
    //   const responseData = await requestAsync();
    //   console.log("responseData: ", responseData);

    let myr = await requestAsync();
    res.status(200).json(myr);
  }
};

export default connectDB(handler);
