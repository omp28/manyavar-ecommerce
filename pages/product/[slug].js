import { useRouter } from "next/router";
import Image from "next/image";
import { use, useState } from "react";
import mongoose from "mongoose";
import Product from "../../models/Products";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Error from "next/error";
import e from "cors";

export default function Post({ buyNow, addToCart, product, variants, error }) {
  const router = useRouter();
  const { slug } = router.query;
  const [pin, setPin] = useState();
  const [service, setService] = useState();
  const [color, setColor] = useState();
  const [size, setSize] = useState();
  const [logedIn, setLogedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("myuser")) {
      setLogedIn(true);
    }
  }, []);

  console.log("product--->>>", product);

  useEffect(() => {
    if (!error) {
      setColor(product.color);
      setSize(product.size);
    }
  }, [router.query, error, product.color, product.size]);

  const checkPincodeService = async () => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinJson = await pins.json();
    if (Object.keys(pinJson).includes(pin)) {
      setService(true);
      toast.success("Your Pincode is SERVICABLE", { toastId: "success1" });
    } else {
      setService(false);
      toast.warn("SORRY !Pincode not SERVICABLE", { toastId: "error1" });
    }
  };

  const onChangePin = (e) => {
    setPin(e.target.value);
  };

  const refereshVariant = (newSize, newColor) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newColor][newSize]["slug"]}`;
    router.push(url);
  };
  // next custom error page
  if (error === 404) {
    return <Error statusCode={404} />;
  }
  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
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
                      {color && Object.keys(variants[color]).includes("S") && (
                        <option value={"S"}>S</option>
                      )}
                      {color && Object.keys(variants[color]).includes("M") && (
                        <option value={"M"}>M</option>
                      )}
                      {color && Object.keys(variants[color]).includes("L") && (
                        <option value={"L"}>L</option>
                      )}
                      {color && Object.keys(variants[color]).includes("XL") && (
                        <option value={"XL"}>XL</option>
                      )}
                      {color &&
                        Object.keys(variants[color]).includes("XXL") && (
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
              <div className="flex flex-col items-center justify-center md:flex-row">
                {product.availableQty <= 0 && (
                  <div className="text-red-800 text-xl mt-4">Out of Stock</div>
                )}
                {product.availableQty > 0 && (
                  <span className="title-font font-medium text-2xl text-gray-900 mb-2">
                    ₹{product.price}
                  </span>
                )}

                <div className="flex flex-col md:flex-row w-full">
                  {logedIn ? (
                    <button
                      disabled={product.availableQty <= 0 || !logedIn}
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
                      className="  disabled:bg-orange-200 bg-orange-500
                           hover:bg-orange-700 hover:duration-500 ml-4
                     my-2 w-1/3 flex text-center text-white font-semibold py-2 px-4 border  
                        border-orange-700 hover:border-transparent
                     rounded-lg"
                    >
                      BUY NOW
                    </button>
                  ) : (
                    <div
                      onClick={() => {
                        toast.error("Please Login to Buy", {
                          toastId: "error2",
                        });
                      }}
                      className=" cursor-pointer bg-orange-200 
                            hover:duration-500 ml-4
                     my-2 w-1/3 flex text-center text-white font-semibold py-2 px-4 border  
                        border-orange-700 hover:border-transparent
                     rounded-lg"
                    >
                      BUY NOW
                    </div>
                  )}
                  <button
                    disabled={product.availableQty <= 0}
                    onClick={() => {
                      addToCart(
                        slug,
                        1,
                        product.price,
                        product.title,
                        product.size,
                        product.color
                      );
                    }}
                    className="  disabled:bg-orange-200 bg-orange-500
                           hover:bg-orange-700 hover:duration-500 ml-4
                     my-2 w-1/3 flex text-center text-white font-semibold py-2 px-4 border  
                        border-orange-700 hover:border-transparent
                     rounded-lg"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* pincode  */}
              <div className="  flex items-center justify-center p-4">
                <input
                  onChange={onChangePin}
                  placeholder="Enter Pincode"
                  type="number"
                  id="pincode-input"
                  aria-describedby="helper-text-explanation"
                  className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />

                <button
                  onClickCapture={checkPincodeService}
                  onClick={checkPincodeService}
                  type="button"
                  className="  border-2 border-red-700  focus:outline-none text-white bg-gray-900   focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 dark:bg-gray-600 dark:hover:bg-gray-900 "
                >
                  Check
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  let error = null;

  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGODB_URI);
  }
  let product = await Product.findOne({ slug: context.query.slug });
  if (product === null) {
    return {
      props: {
        error: 404,
      },
    };
  }
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
      error: error,
      product: JSON.parse(JSON.stringify(product)),
      variants: JSON.parse(JSON.stringify(colorSizeSlug)),
    },
  };
}
