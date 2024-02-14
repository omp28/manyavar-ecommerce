import React from "react";
import { IoIosHeart } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { IoBagCheckOutline } from "react-icons/io5";
import Link from "next/link";
import Head from "next/head";
import Script from "next/script";
const checkout = ({ cart, addToCart, removeFromCart, subTotal }) => {
  const initiatePayment = async () => {
    let txnToken;
    let amount;
    // get transaction token
    let a = await fetch(`${NEXT_PUBLIC_HOST}/api/pretransaction`);
    const data = { cart, subTotal };
    async function postJSON(data) {
      try {
        const response = await fetch("https://example.com/profile", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log("Success:", result);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    postJSON(data);

    var config = {
      root: "",
      flow: "DEFAULT",
      data: {
        orderId: Math.random() /* update order id */,
        token: txnToken /* update token value */,
        tokenType: "TXN_TOKEN",
        amount: amount /* update amount */,
      },
      handler: {
        notifyMerchant: function (eventName, data) {
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        },
      },
    };

    // initialze configuration using init method
    window.Paytm.CheckoutJS.init(config)
      .then(function onSuccess() {
        // after successfully updating configuration, invoke JS Checkout
        window.Paytm.CheckoutJS.invoke();
      })
      .catch(function onError(error) {
        console.log("error => ", error);
      });
  };
  return (
    <div className=" bg-custom-skin">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <Script
        type="application/javascript"
        crossorigin="anonymous"
        src={`${process.env.PAYTM_HOST}/merchantpgui/checoutjs/merchants/${process.env.PAYTM_MID}.js`}
        onLoad="onScriptLoad()"
      ></Script>

      <h1 className=" font-bold text-2xl text-center py-8">Checkout</h1>
      <h2 className=" text-center ">Delivery Details</h2>
      <div className=" mx-auto">
        <div className="flex flex-col justify-center items-center">
          <input
            className="border border-gray-500 rounded-lg px-4 py-2 my-4 w-1/2"
            type="text"
            placeholder="Name"
          />
          <input
            className="border border-gray-500 rounded-lg px-4 py-2 my-4 w-1/2"
            type="text"
            placeholder="Address"
          />
          <input
            className="border border-gray-500 rounded-lg px-4 py-2 my-4 w-1/2"
            type="text"
            placeholder="City"
          />
          <input
            className="border border-gray-500 rounded-lg px-4 py-2 my-4 w-1/2"
            type="text"
            placeholder="State"
          />
          <input
            className="border border-gray-500 rounded-lg px-4 py-2 my-4 w-1/2"
            type="integer"
            placeholder="Zip Code"
          />
          <input
            className="border border-gray-500 rounded-lg px-4 py-2 my-4 w-1/2"
            type="integer"
            placeholder="Phone Number"
          />
          <input
            className="border border-gray-500 rounded-lg px-4 py-2 my-4 w-1/2"
            type="text"
            placeholder="Email"
          />
        </div>
        <div className="flex mt-4 justify-center items-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Review Order Items
          </button>
        </div>
        {/* review your cart  */}
        <div className="  flex justify-center items-center  ">
          <div className="  w-full md:w-1/2 m:w-full  flex-col sidebar  bg-custom-skin py-10   justify-evenly    ">
            <ol>
              {/* first list */}
              {Object.keys(cart).length === 0 && (
                <div>
                  <h1>Cart is EMPTY !</h1>
                  <h1>Add items to checkout</h1>
                </div>
              )}
              {Object.keys(cart).map((k) => (
                <li className=" list-decimal ml-8">
                  <div className="flex font-semibold my-1">
                    <div className=" text-center  w-2/3">
                      {cart[k].name} ({cart[k].variant} /{cart[k].size} )
                    </div>
                    <div className=" flex text-center justify-around  w-1/3">
                      <button>
                        <AiOutlineMinusCircle
                          onClick={() => {
                            removeFromCart(
                              k,
                              1,
                              cart[k].price,
                              cart[k].name,
                              cart[k].size,
                              cart[k].variant
                            );
                          }}
                          className="text-red-800"
                          size={20}
                        />
                      </button>
                      <h1 className=" items-center flex">{cart[k].qty}</h1>

                      <button>
                        <AiOutlinePlusCircle
                          onClick={() => {
                            addToCart(
                              k,
                              1,
                              cart[k].price,
                              cart[k].name,
                              cart[k].size,
                              cart[k].variant
                            );
                          }}
                          className="text-red-800"
                          size={20}
                        />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <div className=" flex justify-center items-center py-8">
              <span className=" w-1/3  ">subTotal : ₹{subTotal}</span>
              <button
                onClick={initiatePayment}
                className=" my-2 w-1/3  bg-orange-500  flex text-center hover:bg-orange-700 text-white font-semibold hover:text-white py-2 px-4 border border-orange-700 hover:border-transparent rounded-lg"
              >
                <IoBagCheckOutline size={20} /> PAY ₹{subTotal}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default checkout;
