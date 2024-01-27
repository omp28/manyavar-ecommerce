import React from "react";

const checkout = () => {
  return (
    <div className=" bg-custom-skin">
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
        <div className="flex justify-center items-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Review Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default checkout;
