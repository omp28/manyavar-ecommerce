import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "./logo.png";
import { IoIosHeart } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";

const Nav = () => {
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
              <button>
                <div className="flex justify-center p-auto">
                  <MdAccountCircle className="text-red-900" size={20} />
                </div>
                <h1>cart</h1>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
