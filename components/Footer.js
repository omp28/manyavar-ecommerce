import React from "react";
import Image from "next/image";
import logo from "../components/logo.png";
import { SiPaytm } from "react-icons/si";
import { FaApplePay } from "react-icons/fa6";
import { RiVisaFill } from "react-icons/ri";
import { FaCcMastercard } from "react-icons/fa";
import { FaCcPaypal } from "react-icons/fa";
import { IoCardSharp } from "react-icons/io5";
import Link from "next/link";

const Footer = () => {
  return (
    <div className=" bg-custom-bg-footer">
      <footer className=" text-white body-font">
        <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left md:mt-0 mt-10">
            <a className="flex title-font font-medium items-center md:justify-start justify-center text-white-900">
              <Image className=" h-34 w-34" src={logo} />
            </a>

            <span className=" inline-flex sm:ml-auto sm:mt-0 mt-2 pt-4  justify-center sm:justify-start">
              <a className="text-white-500">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  // strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a className="ml-3 text-white-500">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  // strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a className="ml-3 text-white-500">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  // strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
              <a className="ml-3 text-white-500">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  // strokeLinejoin="round"
                  strokeWidth="0"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="none"
                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                  ></path>
                  <circle cx="4" cy="4" r="2" stroke="none"></circle>
                </svg>
              </a>
            </span>
          </div>

          <div className="flex-grow flex flex-wrap md:pr-20 -mb-10 md:text-left text-center order-first">
            {/* First Column - Categories */}
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-white-900 tracking-widest text-sm mb-3">
                CATEGORIES
              </h2>
              <nav className="list-none mb-10">
                <li className="mb-2">
                  <Link href="/kurta-pajama">
                    <h1 className="text-white-600 hover:text-white-800">
                      Kurta Pajama
                    </h1>
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/indo-western">
                    <h1 className="text-white-600 hover:text-white-800">
                      Indo Western
                    </h1>
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/sherwani">
                    <h1 className="text-white-600 hover:text-white-800">
                      Sherwani
                    </h1>
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/accessories">
                    <h1 className="text-white-600 hover:text-white-800">
                      Accessories
                    </h1>
                  </Link>
                </li>
              </nav>
            </div>

            {/* Second Column - Support */}
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-white-900 tracking-widest text-sm mb-3">
                SUPPORT
              </h2>
              <nav className="list-none mb-10">
                <li className="mb-2">
                  <Link href="/track-order">
                    <h1 className="text-white-600 hover:text-white-800">
                      Track Order
                    </h1>
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/contact-us">
                    <h1 className="text-white-600 hover:text-white-800">
                      Contact Us
                    </h1>
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/my-account">
                    <h1 className="text-white-600 hover:text-white-800">
                      My Account
                    </h1>
                  </Link>
                </li>
              </nav>
            </div>

            {/* Third Column - Quick Links */}
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-white-900 tracking-widest text-sm mb-3">
                QUICK LINKS
              </h2>
              <nav className="list-none mb-10">
                <li className="mb-2">
                  <Link href="/about-us">
                    <h1 className="text-white-600 hover:text-white-800">
                      About Us
                    </h1>
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/brand-story">
                    <h1 className="text-white-600 hover:text-white-800">
                      Brand Story
                    </h1>
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/blogs">
                    <h1 className="text-white-600 hover:text-white-800">
                      Blogs
                    </h1>
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/careers">
                    <h1 className="text-white-600 hover:text-white-800">
                      Careers
                    </h1>
                  </Link>
                </li>
              </nav>
            </div>

            {/* Fourth Column - Our Policies */}
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-white-900 tracking-widest text-sm mb-3">
                OUR POLICIES
              </h2>
              <nav className="list-none mb-10">
                <li className="mb-2">
                  <Link href="/faqs">
                    <h1 className="text-white-600 hover:text-white-800">
                      FAQs
                    </h1>
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/shipping-details">
                    <h1 className="text-white-600 hover:text-white-800">
                      Shipping Details
                    </h1>
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/return-exchange-refund-policy">
                    <h1 className="text-white-600 hover:text-white-800">
                      Return, Exchange and Refund Policy
                    </h1>
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/terms-of-use">
                    <h1 className="text-white-600 hover:text-white-800">
                      Terms of Use
                    </h1>
                  </Link>
                </li>
              </nav>
            </div>
          </div>
        </div>
        <div className="bg-white-100">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col justify-around sm:flex-row">
            <p className="text-white-500 text-sm text-center sm:text-left">
              © manyavar
              <a
                href="https://twitter.com/knyttneve"
                rel="noopener noreferrer"
                className="text-white-600 ml-1"
                target="_blank"
              ></a>
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
              <a className="text-white">
                <SiPaytm className=" text-3xl mx-1" />
              </a>
              <a className="text-white">
                <FaApplePay className=" text-3xl mx-1" />
              </a>
              <a className="text-white">
                <SiPaytm className=" text-3xl mx-1" />
              </a>
              <a className="text-white">
                <RiVisaFill className=" text-3xl mx-1" />
              </a>
              <a className="text-white">
                <FaCcMastercard className=" text-3xl mx-1" />
              </a>
              <a className="text-white">
                <FaCcPaypal className=" text-3xl mx-1" />
              </a>
              <a className="text-white">
                <IoCardSharp className=" text-3xl mx-1" />
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
