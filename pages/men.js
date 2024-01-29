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
            {producs.map((item) => {
              return (
                <div key={item._id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                  <Link passHref={true} href={`/product/${item.slug}`}>
                    <div className="block relative h-48 rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className=" object-cover object-top w-full h-full block"
                        src={item.img}
                      />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        JACKET
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {item.title}
                      </h2>
                      <p className="mt-1">${item.price}</p>
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
  return {
    props: { producs: JSON.parse(JSON.stringify(producs)) },
  };
}

export default men;
