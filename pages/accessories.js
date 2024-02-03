// men.js
import React from "react";
import Link from "next/link";
import Product from "../models/Products";
import mongoose from "mongoose";
const accessories = ({ products }) => {
  // console.log(products);
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {Object.keys(products).length === 0 && (
              <p>SORRY ! OUT OF STOCK STAY TUNED FOR NEW STOCK !!!</p>
            )}
            {Object.keys(products).map((item) => {
              return (
                <div key={item._id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                  <Link
                    passHref={true}
                    href={`/product/${products[item].slug}`}
                  >
                    <div className="block relative h-48 rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className=" object-cover object-top w-full h-full block"
                        src={products[item].img}
                      />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        JACKET
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {products[item].title}
                      </h2>
                      <p className="mt-1">₹{products[item].price}</p>
                      <div>
                        {products[item].size.includes("S") && (
                          <span className="inline-block py-1 px-2 rounded bg-gray-200 text-gray-700 text-xs font-medium tracking-widest mr-1">
                            S
                          </span>
                        )}
                        {products[item].size.includes("M") && (
                          <span className="inline-block py-1 px-2 rounded bg-gray-200 text-gray-700 text-xs font-medium tracking-widest mr-1">
                            M
                          </span>
                        )}
                        {products[item].size.includes("L") && (
                          <span className="inline-block py-1 px-2 rounded bg-gray-200 text-gray-700 text-xs font-medium tracking-widest mr-1">
                            L
                          </span>
                        )}
                        {products[item].size.includes("XL") && (
                          <span className="inline-block py-1 px-2 rounded bg-gray-200 text-gray-700 text-xs font-medium tracking-widest mr-1">
                            XL
                          </span>
                        )}
                        {products[item].size.includes("XXL") && (
                          <span className="inline-block py-1 px-2 rounded bg-gray-200 text-gray-700 text-xs font-medium tracking-widest mr-1">
                            XXL
                          </span>
                        )}
                      </div>
                      <div>
                        {products[item].color.includes("black") && (
                          <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[item].color.includes("white") && (
                          <button className="border-2 border-gray-300 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[item].color.includes("red") && (
                          <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGODB_URI);
  }
  let products = await Product.find({ category: "accessories" });
  let tshirts = {};
  for (let item of products) {
    if (item.title in tshirts) {
      if (
        !tshirts[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        tshirts[item.title].color.push(item.color);
      }
      if (
        !tshirts[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        tshirts[item.title].size.push(item.size);
      }
    } else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        tshirts[item.title].color = [item.color];
        tshirts[item.title].size = [item.size];
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(tshirts)) },
  };
}

export default accessories;
