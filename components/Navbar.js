import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "./logo.png";
import { IoIosHeart } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { IoBagCheckOutline } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { IoLogIn } from "react-icons/io5";
import { useRouter } from "next/router";

const Nav = ({
  Logout,
  user,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) => {
  const [dropdown, setDropdown] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const ref = useRef();
  const router = useRouter();

  const toggleCart = ({}) => {
    const cartSidebar = ref.current; // Get the element
    if (cartSidebar) {
      // Safety check
      cartSidebar.classList.toggle("hidden");
      cartSidebar.classList.toggle("translate-x-0");
    } else if (!ref.current?.classList.contains("hidden")) {
      ref.current?.classList.remove("translate-x-0");
      ref.current?.classList.add("hidden");
    }
  };
  useEffect(() => {
    const hideSidebarRoutes = ["/orders", "/login", "/checkout"];

    if (hideSidebarRoutes.includes(router.pathname)) {
      setIsSidebarVisible(false);
    } else {
      setIsSidebarVisible(true);
    }
    const cartSidebar = ref.current;
    if (cartSidebar) {
      if (Object.keys(cart).length > 0) {
        ref.current.classList.remove("hidden");
        ref.current.classList.add("translate-x-0");
      } else {
        ref.current.classList.remove("translate-x-0");
        ref.current.classList.add("hidden");
      }
    }
  }, [cart]);
  return (
    <div
      className={
        isSidebarVisible ? "sidebar duration-500 overflow-x-hidden" : ""
      }
    >
      <div className="flex-col bg-red-950">
        <div className="bg-custom-skin">
          <div className="flex justify-center items-center py-2">
            <Link href="/">
              <Image
                priority={true}
                draggable="false"
                width={275}
                className=""
                src={logo}
                alt="logo"
              />
            </Link>
          </div>
          <div className="flex border-b-2 border-red-900 justify-between pb-2  font-semibold">
            <div className="flex items-center  justify-around w-2/4">
              <Link href="/men">
                <button>Men</button>
              </Link>
              <Link href="/women">
                <button>Women</button>
              </Link>

              <Link href="/accessories">
                <button>Accessories </button>
              </Link>
            </div>
            <div className="flex w-1/4 justify-around">
              <button className="items-center  flex-col">
                <h1
                  onClick={() => {
                    setDropdown(!dropdown);
                  }}
                >
                  {dropdown && (
                    <div className="absolute right-52 text-white top-28 bg-custom-bg-footer rounded-md w-28 leading-8 text-sm z-10">
                      <ul>
                        <Link href={"/myaccount"}>
                          <li className="hover:text-yellow-400">My Account</li>
                        </Link>
                        <Link href={"/orders"}>
                          <li className="hover:text-yellow-400">Orders</li>
                        </Link>

                        <li onClick={Logout} className="hover:text-yellow-400">
                          LogOut
                        </li>
                      </ul>
                    </div>
                  )}
                  {user.value && (
                    <div className="flex-col flex justify-center p-auto">
                      <div className=" justify-center items-center flex">
                        <MdAccountCircle
                          className="text-red-900 justify-center items-center"
                          size={20}
                        />
                      </div>

                      <h1 className="text-center">Account</h1>
                    </div>
                  )}
                </h1>
                {!user.value && (
                  <Link href="/login">
                    <div>
                      <div className="flex-col justify-center items-center p-auto">
                        {" "}
                        <IoLogIn className="text-red-900" size={25} />
                      </div>

                      <h1>LogIn</h1>
                    </div>
                  </Link>
                )}
              </button>
              <button onClick={toggleCart}>
                {isSidebarVisible && (
                  <>
                    <div className="flex justify-center items-center ">
                      <FaCartShopping className="text-red-900" size={20} />
                    </div>
                    <h1>cart</h1>
                  </>
                )}
              </button>
              {/* SIDECART  */}
              {isSidebarVisible && (
                <div
                  ref={ref}
                  className={
                    " max-w-80 z-10 flex-col sidebar absolute top-0 right-0 bg-custom-skin p-10   border-4 border-red-950  "
                  }
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
                    {Object.keys(cart).length === 0 && (
                      <div>
                        <h1>Cart is EMPTY !</h1>
                        <h1>Add items to checkout</h1>
                      </div>
                    )}
                    {Object.keys(cart).map((k) => (
                      <li key={k} className=" list-decimal">
                        <div className="flex font-semibold my-1">
                          <div className="   text-start  w-2/3">
                            <h1 className="overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[100%] max-h-9 ">
                              {cart[k].name}
                            </h1>
                            <h1>
                              ( {cart[k].variant} / {cart[k].size} )
                            </h1>
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
                            <h1 className=" items-center flex">
                              {cart[k].qty}
                            </h1>

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
                  <span className=" w-1/3  ">subTotal : ₹{subTotal}</span>
                  {/* checkout */}
                  <Link href="/checkout">
                    <button
                      disabled={Object.keys(cart).length === 0 || !user.value}
                      className=" disabled:bg-orange-200 my-2 w-full  bg-orange-500  flex text-center hover:bg-orange-700 text-white font-semibold hover:text-white py-2 px-4 border border-orange-700 hover:border-transparent rounded-lg"
                    >
                      <IoBagCheckOutline size={20} /> CheckOut
                    </button>
                  </Link>

                  <button
                    disabled={Object.keys(cart).length === 0}
                    onClick={clearCart}
                    className="disabled:bg-orange-200 my-2 w-full  bg-orange-500  flex text-center hover:bg-orange-700 text-white font-semibold hover:text-white py-2 px-4 border border-orange-700 hover:border-transparent rounded-lg"
                  >
                    Clear Cart
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
