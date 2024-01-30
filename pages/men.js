import React from "react";
import Link from "next/link";
import Product from "../models/Products";
import mongoose from "mongoose";
const men = ({ producs }) => {
  // console.log(producs);
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {Object.keys(producs).map((item) => {
              return (
                <div key={item._id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                  <Link passHref={true} href={`/product/${producs[item].slug}`}>
                    <div className="block relative h-48 rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className=" object-cover object-top w-full h-full block"
                        src={producs[item].img}
                      />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        JACKET
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {producs[item].title}
                      </h2>
                      <p className="mt-1">${producs[item].price}</p>
                      <div>
                        {producs[item].size.includes("S") && (
                          <span className="inline-block py-1 px-2 rounded bg-gray-200 text-gray-700 text-xs font-medium tracking-widest mr-1">
                            S
                          </span>
                        )}
                        {producs[item].size.includes("M") && (
                          <span className="inline-block py-1 px-2 rounded bg-gray-200 text-gray-700 text-xs font-medium tracking-widest mr-1">
                            M
                          </span>
                        )}
                        {producs[item].size.includes("L") && (
                          <span className="inline-block py-1 px-2 rounded bg-gray-200 text-gray-700 text-xs font-medium tracking-widest mr-1">
                            L
                          </span>
                        )}
                        {producs[item].size.includes("XL") && (
                          <span className="inline-block py-1 px-2 rounded bg-gray-200 text-gray-700 text-xs font-medium tracking-widest mr-1">
                            XL
                          </span>
                        )}
                        {producs[item].size.includes("XXL") && (
                          <span className="inline-block py-1 px-2 rounded bg-gray-200 text-gray-700 text-xs font-medium tracking-widest mr-1">
                            XXL
                          </span>
                        )}
                      </div>
                      <div>
                        {producs[item].color.includes("black") && (
                          <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {producs[item].color.includes("white") && (
                          <button className="border-2 border-gray-300 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {producs[item].color.includes("red") && (
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
  let producs = await Product.find({ category: "men" });
  let tshirts = {};
  for (let item of producs) {
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
    props: { producs: JSON.parse(JSON.stringify(tshirts)) },
  };
}

export default men;
