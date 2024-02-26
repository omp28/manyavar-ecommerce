import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { set } from "mongoose";
import { Link } from "react-router-dom";

const orders = () => {
  const router = useRouter();
  const [orders, setOrders] = React.useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
        }),
      });
      let res = await a.json();
      setOrders(res.orders);

      console.log(res);
    };
    if (!localStorage.getItem("token")) {
      router.push("/");
    } else {
      fetchOrders();
    }
  }, []);
  console.log("Orders:--->>>", orders);
  return (
    <div>
      <div className="mx-auto">
        <h1 className="text-center">My Orders</h1>
        <div className="items">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    OrderId
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Payment Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item) => {
                  return (
                    <tr key={item._id} className="bg-white border-b">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {item._id}
                      </th>
                      <td className="px-6 py-4">{item.email}</td>
                      <td className="px-6 py-4">₹{item.amount}</td>
                      <td className="px-6 py-4 underline ">
                        <a href={`/order?id=` + item.orderId}>Details</a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default orders;
