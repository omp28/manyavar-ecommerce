import React from "react";

const order = () => {
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              MANYAVAR
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
              ORDER ID : ebef6364hbew
            </h1>
            <h1 className=" text-sm my-4 ">
              Your order has been successfully pladced
            </h1>
            <div class="flex mb-4">
              <a class="flex-grow text-center    py-2 text-lg px-1">ITEM</a>
              <a class="flex-grow text-center  border-gray-300 py-2 text-lg px-1">
                QUANTITY
              </a>
              <a class="flex-grow text-center  border-gray-300 py-2 text-lg px-1">
                ITEM TOTAL
              </a>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">under armour jacket</span>
              <span className="ml-auto text-gray-900">1</span>
              <span className="ml-auto text-gray-900">499</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">under armour jacket</span>
              <span className="ml-auto text-gray-900">1</span>
              <span className="ml-auto text-gray-900">499</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">under armour jacket</span>
              <span className="ml-auto text-gray-900">1</span>
              <span className="ml-auto text-gray-900">499</span>
            </div>
            <div className="flex-col">
              <div className=" my-2 title-font font-medium text-2xl text-gray-900">
                subTotal : ₹499
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

export default order;
