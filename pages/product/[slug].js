//[slug].js
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import mongoose from "mongoose";
import Product from "../../models/Products";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Post({ buyNow, addToCart, product, variants }) {
  // console.log(product, variants);
  const router = useRouter();
  const { slug } = router.query;
  const [pin, setPin] = useState();
  const [service, setService] = useState();

  const checkPincodeService = async () => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinJson = await pins.json();
    if (Object.keys(pinJson).includes(pin)) {
      setService(true);
      toast.success("Your Pincode is SERVICABLE", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    } else {
      setService(false);
      toast.warn("SORRY !Pincode not SERVICABLE", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    }
  };

  const onChangePin = (e) => {
    setPin(e.target.value);
  };

  const [color, setColor] = useState(product.color);
  const [size, setSize] = useState(product.size);
  const refereshVariant = (newSize, newColor) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newColor][newSize]["slug"]}`;
    window.location = url;
  };

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition="Slide"
        />
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-top rounded"
              src={product.img}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                BRAND NAME
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title}({product.color}/{product.size})
              </h1>

              <p className="leading-relaxed">{product.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {Object.keys(variants).includes("black") &&
                    Object.keys(variants["black"]).includes(size) && (
                      <button
                        onClick={() => {
                          refereshVariant(size, "black");
                        }}
                        className={`border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${
                          color === "black" ? "border-black" : "border-gray-300"
                        }`}
                      ></button>
                    )}

                  {Object.keys(variants).includes("white") &&
                    Object.keys(variants["white"]).includes(size) && (
                      <button
                        onClick={() => {
                          refereshVariant(size, "white");
                        }}
                        className={`border-2 border-gray-300 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none ${
                          color === "white" ? "border-black" : "border-gray-300"
                        }`}
                      ></button>
                    )}

                  {Object.keys(variants).includes("red") &&
                    Object.keys(variants["red"]).includes(size) && (
                      <button
                        onClick={() => {
                          refereshVariant(size, "red");
                        }}
                        className={`border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none ${
                          color === "red" ? "border-black" : "border-gray-300"
                        }`}
                      ></button>
                    )}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select
                      value={size}
                      onChange={(e) => {
                        refereshVariant(e.target.value, color);
                      }}
                      className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                    >
                      {Object.keys(variants[color]).includes("S") && (
                        <option value={"S"}>S</option>
                      )}
                      {Object.keys(variants[color]).includes("M") && (
                        <option value={"M"}>M</option>
                      )}
                      {Object.keys(variants[color]).includes("L") && (
                        <option value={"L"}>L</option>
                      )}
                      {Object.keys(variants[color]).includes("XL") && (
                        <option value={"XL"}>XL</option>
                      )}
                      {Object.keys(variants[color]).includes("XXL") && (
                        <option value={"XXL"}>XXL</option>
                      )}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ₹{product.price}
                </span>
                <button
                  onClick={() => {
                    buyNow(
                      slug,
                      1,
                      product.price,
                      product.title,
                      product.size,
                      product.color
                    );
                  }}
                  className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                >
                  BUY NOW
                </button>
                <button
                  onClick={() => {
                    // itemCode, qty, price, name, size, variant
                    addToCart(
                      slug,
                      1,
                      product.price,
                      product.title,
                      product.size,
                      product.color
                    );
                  }}
                  className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                >
                  Add to Cart
                </button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
              {/* pincode  */}
              <div className="  flex items-center justify-center p-4">
                <form className="  max-w-sm mx-auto">
                  <label
                    htmlFor="pincode-input"
                    className=" text-center  block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Enter Pincode:
                  </label>
                  <input
                    onChange={onChangePin}
                    type="number"
                    id="pincode-input"
                    aria-describedby="helper-text-explanation"
                    className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="90210"
                    required
                  />
                </form>

                <button
                  onClickCapture={checkPincodeService}
                  onClick={checkPincodeService}
                  type="button"
                  className="  border-2 border-red-700  focus:outline-none text-white bg-gray-900   focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 mt-2 dark:bg-gray-600 dark:hover:bg-gray-900 "
                >
                  Check
                </button>
              </div>
              {/* pincode servicebility */}
              <div className=" flex justify-center items-center">
                {!service && service != null && (
                  <div className=" text-red-800 text-sm mt-4">
                    sorry ! We dont deliver
                  </div>
                )}
                {service && service != null && (
                  <div className=" text-green-800 text-sm mt-4">
                    This Pincode is Servicable
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGODB_URI);
  }
  let product = await Product.findOne({ slug: context.query.slug });
  let variants = await Product.find({ title: product.title });

  let colorSizeSlug = {};
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    } else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      variants: JSON.parse(JSON.stringify(colorSizeSlug)),
    },
  };
}
