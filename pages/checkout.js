import React from "react";
import { useState } from "react";
import { IoIosHeart } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { IoBagCheckOutline } from "react-icons/io5";
import Link from "next/link";
import Head from "next/head";
import Script from "next/script";
const checkout = ({ cart, clearCart, addToCart, removeFromCart, subTotal }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(true);

  const handleChange = async (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "address") {
      setAddress(e.target.value);
    } else if (e.target.name === "zip") {
      setZip(e.target.value);
      if (e.target.value.length === 6) {
        let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
        let pinJson = await pins.json();
        if (Object.keys(pinJson).includes(e.target.value)) {
          setCity(pinJson[e.target.value][0]);
          setState(pinJson[e.target.value][1]);
        } else {
          setCity("");
          setState("");
        }
      } else {
        setCity("");
        setState("");
      }
    } else if (e.target.name === "phone") {
      setPhone(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    }

    // console.log(name, address, city, state, zip, phone, email);
    setTimeout(() => {
      if (
        name.length > 3 &&
        address.length > 3 &&
        zip.length > 3 &&
        phone.length > 3 &&
        email.length > 3
      ) {
        setDisabled(false);
      }
    }, 100);
  };

  const initiatePayment = async () => {
    let txnToken;
    let oid = Math.floor(Math.random() * Date.now());

    // Create an array to store detailed product information
    const productsArray = Object.keys(cart).map((k) => ({
      productId: k,
      quantity: cart[k].qty,
      price: cart[k].price,
      name: cart[k].name,
      size: cart[k].size,
      variant: cart[k].variant,
    }));

    console.log("orderId:--->>>>", oid);

    // get transaction token
    const data = {
      cart: productsArray,
      subTotal,
      oid,
      email,
      name,
      address,
      zip,
      phone,
    };

    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let txnRes = await a.json();
    if (txnRes.success) {
      // // commenting paytm script for now
      // txnToken = txnRes.txnToken;
      // console.log(txnToken);

      // var config = {
      //   root: "",
      //   flow: "DEFAULT",
      //   data: {
      //     orderId: oid,
      //     token: txnToken,
      //     tokenType: "TXN_TOKEN",
      //     amount: subTotal,
      //   },
      //   handler: {
      //     notifyMerchant: function (eventName, data) {
      //       console.log("notifyMerchant handler function called");
      //       console.log("eventName => ", eventName);
      //       console.log("data => ", data);
      //     },
      //   },
      // };

      // // initialze configuration using init method
      // console.log("window.Paytm:", window.Paytm);

      // window.Paytm.CheckoutJS.init(config)
      //   .then(function onSuccess() {
      //     // after successfully updating configuration, invoke JS Checkout
      //     window.Paytm.CheckoutJS.invoke();
      //   })
      //   .catch(function onError(error) {
      //     console.log("error => ", error);
      //   });
      console.log("Transaction Token generated ");
    } else {
      clearCart(); // clear cart when transaction token is not generated due to temporing
      console.log("Transaction Token not generated :" + txnRes.error);
    }
  };

  return (
    <div className=" bg-custom-skin">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      {/* <Script
        type="application/javascript"
        crossorigin="anonymous"
        src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgui/checoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}
        onLoad="onScriptLoad()"
      ></Script> */}

      <h1 className=" font-bold text-2xl text-center py-8">Checkout</h1>
      <h2 className=" text-center ">Delivery Details</h2>
      <div className=" mx-auto">
        <div className="flex flex-col justify-center items-center">
          <input
            onChange={handleChange}
            value={name}
            className="border border-gray-500 rounded-lg px-4 py-2 my-4 w-1/2"
            type="text"
            placeholder="Name"
            name="name"
          />
          <input
            onChange={handleChange}
            value={address}
            className="border border-gray-500 rounded-lg px-4 py-2 my-4 w-1/2"
            type="text"
            placeholder="Address"
            name="address"
          />
          <input
            onChange={handleChange}
            value={city}
            className="border border-gray-500 rounded-lg px-4 py-2 my-4 w-1/2"
            type="text"
            placeholder="City"
            name="city"
          />
          <input
            onChange={handleChange}
            value={state}
            className="border border-gray-500 rounded-lg px-4 py-2 my-4 w-1/2"
            type="text"
            placeholder="State"
            name="state"
          />
          <input
            value={zip}
            onChange={handleChange}
            className="border border-gray-500 rounded-lg px-4 py-2 my-4 w-1/2"
            type="number"
            placeholder="Zip Code"
            name="zip"
          />
          <input
            onChange={handleChange}
            value={phone}
            className="border border-gray-500 rounded-lg px-4 py-2 my-4 w-1/2"
            type="number"
            placeholder="Phone Number"
            name="phone"
          />
          <input
            onChange={handleChange}
            value={email}
            className="border border-gray-500 rounded-lg px-4 py-2 my-4 w-1/2"
            type="text"
            placeholder="Email"
            name="email"
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
                <li key={k} className=" list-decimal ml-8">
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
                disabled={disabled}
                onClick={initiatePayment}
                className={`${
                  disabled
                    ? "bg-custom-skin"
                    : "bg-orange-500 hover:bg-orange-700"
                } my-2 w-1/3 flex text-center text-white font-semibold py-2 px-4 border ${
                  disabled
                    ? "border-custom-skin"
                    : "border-orange-700 hover:border-transparent"
                } rounded-lg`}
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
