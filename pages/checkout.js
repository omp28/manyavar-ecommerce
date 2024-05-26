import React, { useEffect, useState } from "react";
import { IoIosHeart } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { IoBagCheckOutline } from "react-icons/io5";
import Link from "next/link";
import Head from "next/head";
import Script from "next/script";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import payment from "../components/payment";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Checkout = ({ cart, clearCart, addToCart, removeFromCart, subTotal }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [user, setUser] = useState({ value: null });
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async (token) => {
      let data = { token: token };
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let Res = await a.json();
      setName(Res.name);
      setAddress(Res.address);
      setZip(Res.zip);
      setPhone(Res.phone);
      getPincode(Res.zip);
    };

    const myUser = JSON.parse(localStorage.getItem("myuser"));
    if (myUser.token) {
      setUser(myUser);
      setEmail(myUser.email);
      fetchData(myUser.token);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const getPincode = async (pin) => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinJson = await pins.json();
    if (Object.keys(pinJson).includes(pin)) {
      setCity(pinJson[pin][0]);
      setState(pinJson[pin][1]);
    } else {
      setCity("");
      setState("");
    }
  };

  const handleChange = async (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "address") {
      setAddress(e.target.value);
    } else if (e.target.name === "zip") {
      setZip(e.target.value);
      if (e.target.value.length === 6) {
        getPincode(e.target.value);
      } else {
        setCity("");
        setState("");
      }
    } else if (e.target.name === "phone") {
      setPhone(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    }

    setTimeout(() => {
      if (
        name.length > 2 &&
        address.length > 3 &&
        zip.length >= 5 &&
        phone.length >= 10 &&
        email.length > 3
      ) {
        setDisabled(false);
      }
    }, 100);
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
      toast.error(error.message, {
        toastId: "error1",
      });
      return;
    }

    const productsArray = Object.keys(cart).map((k) => ({
      productId: k,
      quantity: cart[k].qty,
      price: cart[k].price,
      name: cart[k].name,
      size: cart[k].size,
      variant: cart[k].variant,
    }));

    let oid = Math.floor(Math.random() * Date.now());
    const data = {
      cart: productsArray,
      subTotal,
      oid,
      email,
      name,
      city,
      address,
      zip,
      phone,
      paymentMethodId: paymentMethod.id,
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
      clearCart();
      toast.success("Payment Successful!", {
        toastId: "success1",
      });
    } else {
      toast.error(txnRes.error, {
        toastId: "error1",
      });
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
          {user && user.token ? (
            <input
              value={user.email}
              className="border border-gray-500 rounded-lg px-4 py-2 my-4 w-1/2 text-gray-500 "
              type="email"
              placeholder="Email "
              name="email"
              readOnly
            />
          ) : (
            <input
              onChange={handleChange}
              value={email}
              className="border border-gray-500 rounded-lg px-4 py-2 my-4 w-1/2"
              type="email"
              placeholder="Email"
              name="email"
            />
          )}
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
            value={address}
            className="border border-gray-500 rounded-lg px-4 py-2 my-4 w-1/2"
            type="text"
            placeholder="Address Line"
            name="address"
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
              {Object.keys(cart).length === 0 && (
                <div className="my-4  font-semibold">Your cart is Empty !</div>
              )}
              {Object.keys(cart).map((k) => {
                return (
                  <li key={k}>
                    <div className=" flex mx-2 my-2 w-full ">
                      <div className=" w-2/3 mx-2  font-semibold">
                        {cart[k].name} ({cart[k].size} / {cart[k].variant})
                      </div>
                      <div className=" font-semibold items-center justify-center flex  w-1/3 text-lg">
                        <AiOutlineMinusCircle
                          onClick={() =>
                            removeFromCart(
                              k,
                              cart[k].name,
                              1,
                              cart[k].price,
                              cart[k].size,
                              cart[k].variant
                            )
                          }
                          className=" cursor-pointer mx-2 "
                        />{" "}
                        {cart[k].qty}{" "}
                        <AiOutlinePlusCircle
                          onClick={() =>
                            addToCart(
                              k,
                              cart[k].name,
                              1,
                              cart[k].price,
                              cart[k].size,
                              cart[k].variant
                            )
                          }
                          className=" cursor-pointer mx-2"
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
            <div className=" font-bold mx-2 ">SubTotal: ₹{subTotal} </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4">
        <form onSubmit={handlePayment} className="w-full md:w-1/2">
          <CardElement />
          <button
            type="submit"
            disabled={!stripe || !elements || disabled}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mt-4"
          >
            Pay ₹{subTotal}
          </button>
        </form>
      </div>
    </div>
  );
};

export default function WrappedCheckout(props) {
  return (
    <Elements stripe={stripePromise}>
      <Checkout {...props} />
    </Elements>
  );
}
