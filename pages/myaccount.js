import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";

const myaccount = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [user, setUser] = useState({ value: null });
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let router = useRouter();
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("myuser"));
    if (!user) {
      router.push("/");
    }
    if (user && user.token) {
      setUser(user);
      setEmail(user.email);
    }
  }, []);
  const handleUserUpdate = async () => {
    let data = { token: user.token };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let Res = await a.json();
    console.log(Res);
  };

  const handleChange = async (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "address") {
      setAddress(e.target.value);
    } else if (e.target.name === "zip") {
      setZip(e.target.value);
    } else if (e.target.name === "phone") {
      setPhone(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "confirmPassword") {
      setConfirmPassword(e.target.value);
    }

    setTimeout(() => {
      if (
        name.length > 2 &&
        address.length > 3 &&
        zip.length >= 5 &&
        phone.length >= 10 &&
        email.length > 3
      ) {
        setDisabled(false);
      }
    }, 100);
  };
  return (
    <>
      <div className=" text-center text-2xl pt-4 pb-2">Update Your Account</div>
      <div className="text-gray-500 text-sm text-center">
        Email can not be changed
      </div>
      <form>
        <div className=" mx-auto">
          <div className="flex flex-col justify-center items-center">
            <input
              onChange={handleChange}
              value={name}
              className="border border-gray-500 rounded-lg px-4 py-2 my-4 w-1/2"
              type="text"
              placeholder="Name"
              name="name"
            />

            <input
              onChange={handleChange}
              // value={user.email}
              className="border border-gray-500 rounded-lg px-4 py-2 my-4 w-1/2 text-gray-500 "
              type="email"
              placeholder="Email "
              name="email"
              // readOnly
            />

            <input
              onChange={handleChange}
              value={phone}
              className="border border-gray-500 rounded-lg px-4 py-2 my-4 w-1/2"
              type="number"
              placeholder="Phone Number"
              name="phone"
            />
            <input
              onChange={handleChange}
              value={address}
              className="border border-gray-500 rounded-lg px-4 py-2 my-4 w-1/2"
              type="text"
              placeholder="Address Line"
              name="address"
            />
            <input
              value={zip}
              onChange={handleChange}
              className="border border-gray-500 rounded-lg px-4 py-2 my-4 w-1/2"
              type="number"
              placeholder="Zip Code"
              name="zip"
            />
          </div>
          {/* change password  */}
          <div className="flex flex-col justify-center items-center">
            <input
              className="border border-gray-500 rounded-lg px-4 py-2 my-4 w-1/2"
              type="password"
              placeholder="Old Password"
            />
            <input
              className="border border-gray-500 rounded-lg px-4 py-2 my-4 w-1/2"
              type="password"
              placeholder="New Password"
            />
            <input
              value={confirmPassword}
              id="confirmPassword"
              className="border border-gray-500 rounded-lg px-4 py-2 my-4 w-1/2"
              type="password"
              placeholder="Confirm Password"
            />

            <button
              // disabled={disabled}
              onClick={handleUserUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg my-4 w-1/3"
            >
              Update
            </button>
            <div />
          </div>
          <div />
        </div>
      </form>
    </>
  );
};

export default myaccount;
