import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import mongoose from "mongoose";
import Order from "../models/Order";
import { key } from "localforage";
const Myorder = ({ order }) => {
  // if (!order) {
  //   return <div className=" text-center my-4">Order not found</div>;
  // }
  const products = order.products;

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container  px-5 py-24 mx-auto">
        <div className="lg:w-11/12  mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              MANYAVAR
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
              ORDER ID : {order.orderId}
            </h1>
            <h1 className=" text-sm my-4 ">
              <p>Your order has been successfully pladced. </p>
              <p>
                Your payment status is
                <span className=" px-1 underline font-bold text-l capitalize">
                  {" "}
                  {order.status}
                </span>
              </p>
            </h1>
            <div className="grid grid-cols-5 gap-4 mb-4 items-center">
              <div className="text-center border-t border-b border-gray-300 py-2 text-lg font-bold">
                ITEM
              </div>
              <div className="text-center border-t border-b border-gray-300 py-2 text-lg font-bold">
                QUANTITY
              </div>
              <div className="text-center border-t border-b border-gray-300 py-2 text-lg font-bold">
                SIZE
              </div>
              <div className="text-center border-t border-b border-gray-300 py-2 text-lg font-bold">
                ITEM TOTAL
              </div>
            </div>

            {Object.keys(products).map((key) => (
              <div
                key={key}
                className="grid grid-cols-5 gap-4 border-t border-gray-200 py-2 items-center"
              >
                <div className="text-gray-500">{products[key].name}</div>

                <div className="text-gray-900">{products[key].quantity}</div>
                <div className="text-gray-900">{products[key].size}</div>
                <div className="text-gray-900">{products[key].price}</div>
              </div>
            ))}

            <div className="flex-col">
              <div className=" my-2 title-font font-medium text-2xl text-gray-900">
                subTotal : ₹{order.amount}
              </div>
              <button className=" my-2 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                Track Order
              </button>
            </div>
          </div>
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src="https://dummyimage.com/400x400"
          />
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGODB_URI);
  }

  // try {
  let order;

  // Check if the provided id is a valid ObjectId
  // if (mongoose.Types.ObjectId.isValid(context.query.id)) {
  //   order = await Order.findById(context.query.id);
  // }
  // }

  //   // If it's not a valid ObjectId, try finding by orderId
  order = await Order.findOne({ orderId: context.query.id });
  // }

  if (!order) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    },
  };
  // } catch (error) {
  //   console.error("Error fetching order:", error);
  //   return {
  //     notFound: true,
  //   };
  // }
}

export default Myorder;
