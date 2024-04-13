import React, { useState } from "react";
import Axios from "axios";

function Addproduct() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState(null);
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState(0);
  const [availableQty, setAvailableQty] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
    const newSlug = slug + randomNumber.toString();

    const productData = [
      {
        title,
        slug: newSlug,
        desc,
        img,
        category,
        size,
        color,
        price,
        availableQty,
      },
    ];

    try {
      const response = await Axios.post("/api/addproducts", productData);
      console.log("Product Uploaded:", response.data);
    } catch (error) {
      console.error("Upload Error:", error);
      console.log("Product Data2:", productData);
    }
  };

  return (
    <>
      <h1 className=" text-center text-3xl mt-4">Add Product</h1>
      <form onSubmit={handleSubmit} className=" w-[70%] mx-auto p-6">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="slug" className="block text-gray-700">
            Slug
          </label>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="desc" className="block text-gray-700">
            Description
          </label>
          <textarea
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="img" className="block text-gray-700">
            Image
          </label>
          <input
            type="text"
            id="img"
            className="w-full border border-gray-300 p-2 rounded"
            required
            onChange={(e) => setImg(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700">
            Category
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="size" className="block text-gray-700">
            Size
          </label>
          <input
            type="text"
            id="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="color" className="block text-gray-700">
            Color
          </label>
          <input
            type="text"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="availableQty" className="block text-gray-700">
            Available Quantity
          </label>
          <input
            type="number"
            id="availableQty"
            value={availableQty}
            onChange={(e) => setAvailableQty(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className=" flex justify-center">
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex w-[70%] justify-center  rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-700
                hover:duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
          >
            Upload Product
          </button>
        </div>
      </form>
    </>
  );
}

export default Addproduct;
