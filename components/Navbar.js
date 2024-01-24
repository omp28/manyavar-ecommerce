import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "./logo.png";
import { IoIosHeart } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { IoBagCheckOutline } from "react-icons/io5";
const Nav = () => {
  const ref = useRef();
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };
  return (
    <div>
      <div className="flex-col bg-red-950">
        <div className="bg-custom-skin">
          <div className="flex justify-center items-center py-2">
            <Link href="/">
              <Image
                draggable="false"
                width={275}
                className=""
                src={logo}
                alt="logo"
              />
            </Link>
          </div>
          <div className="flex border-b-2 border-red-900 justify-between pb-4 font-semibold">
            <div className="flex justify-around w-2/4">
              <Link href="/men">
                <button>Men</button>
              </Link>
              <Link href="/women">
                <button>Women</button>
              </Link>
              {/* <button>Women</button>
              <button>Kids</button>
              <button>Blogs</button> */}
            </div>
            <div className="flex w-1/4 justify-around">
              <button className="items-center flex-col">
                <div className="flex justify-center p-auto">
                  <IoIosHeart className="text-red-900" size={20} />
                </div>
                <h1 className="text-center">wishlist</h1>
              </button>
              <button onClick={toggleCart}>
                <div className="flex justify-center p-auto">
                  <MdAccountCircle className="text-red-900" size={20} />
                </div>
                <h1>cart</h1>
              </button>

              {/* SIDECART  */}
              <div
                ref={ref}
                className=" z-10 flex-col sidebar absolute top-0 right-0 bg-custom-skin p-10   border-4 border-red-950 transition-transform translate-x-full transform "
              >
                <h1 className="flex justify-center items-center py-2 text-2xl text-red-900">
                  YOUR CART
                </h1>
                <div
                  onClick={toggleCart}
                  className=" text-3xl bg-red-800 cursor-pointer rounded-full absolute top-2 right-2"
                >
                  <IoIosCloseCircleOutline />
                </div>
                <ol>
                  {/* first list */}
                  <li className=" list-decimal">
                    <div className="flex font-semibold my-1">
                      <div className=" text-center  w-2/3">
                        under armour jacket{" "}
                      </div>
                      <div className=" flex text-center justify-around  w-1/3">
                        <button>
                          <AiOutlineMinusCircle
                            className="text-red-800"
                            size={20}
                          />
                        </button>
                        <h1 className=" items-center flex">1</h1>
                        <button>
                          <AiOutlinePlusCircle
                            className="text-red-800"
                            size={20}
                          />
                        </button>
                      </div>
                    </div>
                  </li>
                  <li className=" list-decimal">
                    <div className="flex font-semibold my-1">
                      <div className=" text-center  w-2/3">
                        under armour jacket{" "}
                      </div>
                      <div className=" flex text-center justify-around  w-1/3">
                        <button>
                          <AiOutlineMinusCircle
                            className="text-red-800"
                            size={20}
                          />
                        </button>
                        <h1 className=" items-center flex">1</h1>
                        <button>
                          <AiOutlinePlusCircle
                            className="text-red-800"
                            size={20}
                          />
                        </button>
                      </div>
                    </div>
                  </li>
                  <li className=" list-decimal">
                    <div className="flex font-semibold my-1">
                      <div className=" text-center  w-2/3">
                        under armour jacket{" "}
                      </div>
                      <div className=" flex text-center justify-around  w-1/3">
                        <button>
                          <AiOutlineMinusCircle
                            className="text-red-800"
                            size={20}
                          />
                        </button>
                        <h1 className=" items-center flex">1</h1>
                        <button>
                          <AiOutlinePlusCircle
                            className="text-red-800"
                            size={20}
                          />
                        </button>
                      </div>
                    </div>
                  </li>
                  <li className=" list-decimal">
                    <div className="flex font-semibold my-1">
                      <div className=" text-center  w-2/3">
                        under armour jacket{" "}
                      </div>
                      <div className=" flex text-center justify-around  w-1/3">
                        <button>
                          <AiOutlineMinusCircle
                            className="text-red-800"
                            size={20}
                          />
                        </button>
                        <h1 className=" items-center flex">1</h1>
                        <button>
                          <AiOutlinePlusCircle
                            className="text-red-800"
                            size={20}
                          />
                        </button>
                      </div>
                    </div>
                  </li>
                  <li className=" list-decimal">
                    <div className="flex font-semibold my-1">
                      <div className=" text-center  w-2/3">
                        under armour jacket{" "}
                      </div>
                      <div className=" flex text-center justify-around  w-1/3">
                        <button>
                          <AiOutlineMinusCircle
                            className="text-red-800"
                            size={20}
                          />
                        </button>
                        <h1 className=" items-center flex">1</h1>
                        <button>
                          <AiOutlinePlusCircle
                            className="text-red-800"
                            size={20}
                          />
                        </button>
                      </div>
                    </div>
                  </li>
                </ol>
                {/* checkout */}
                <button className=" my-2 w-full  bg-orange-500  flex text-center hover:bg-orange-700 text-white font-semibold hover:text-white py-2 px-4 border border-orange-700 hover:border-transparent rounded-lg">
                  <IoBagCheckOutline size={20} /> CheckOut
                </button>

                <button className="my-2 w-full  bg-orange-500  flex text-center hover:bg-orange-700 text-white font-semibold hover:text-white py-2 px-4 border border-orange-700 hover:border-transparent rounded-lg">
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
