import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { set } from "mongoose";
import { toast } from "react-toastify";

const Myaccount = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [user, setUser] = useState({ value: null });
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  let router = useRouter();
  useEffect(() => {
    let myuser = JSON.parse(localStorage.getItem("myuser"));
    if (!myuser) {
      router.push("/");
    }
    if (myuser && myuser.token) {
      setUser(myuser);
      setEmail(myuser.email);
      fetchData(myuser.token);
    }
  }, [router]);

  const fetchData = async (token) => {
    let data = { token: token };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let Res = await a.json();
    setName(Res.name);
    setAddress(Res.address);
    setZip(Res.zip);
    setPhone(Res.phone);
  };

  const handleUserUpdate = async () => {
    try {
      let data = { token: user.token, address, name, zip, phone };
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let Res = await a.json();
      if (Res.sucess) {
        toast.success("User Updated", { toastId: "userUpdated1" });
      }
    } catch (e) {
      console.log("Error fetching and updating user data:", e);
      toast.error("Error fetching and updating user data", {
        toastId: "userError1",
      });
    }
  };
  const handlePasswordUpdate = async () => {
    let Res;
    try {
      if (newPassword == confirmPassword) {
        let data = {
          token: user.token,
          Password,
          confirmPassword,
          newPassword,
        };
        let a = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        Res = await a.json();
      } else {
        Res = { sucess: false };
      }
      if (Res.sucess) {
        toast.success("Password Updated", { toastId: "userUpdated1" });
      } else {
        toast.error("Error updating password", {
          toastId: "userError1",
        });
      }
    } catch (e) {
      console.log("Error fetching and updating user data:", e);
      toast.error("Error fetching and updating user data", {
        toastId: "userError1",
      });
    }
    setPassword("");
    setConfirmPassword("");
    setNewPassword("");
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
    } else if (e.target.name === "newPassword") {
      setNewPassword(e.target.value);
    }

    setTimeout(() => {
      if (
        name.length > 2 &&
        address.length > 3 &&
        zip.length >= 5 &&
        phone.length >= 10 &&
        email.length > 3
      ) {
      }
    }, 100);
  };
  return (
    <>
      <div className=" text-center text-2xl pt-4 pb-2">Update Your Account</div>
      <div className="text-gray-500 text-sm text-center">
        Email can not be changed
      </div>
      {/* <form > */}
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
            value={user.email}
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
          <button
            onClick={handleUserUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg my-4 w-1/3"
          >
            Update
          </button>
        </div>
        {/* <form /> */}

        {/* change password  */}
        {/* <form> */}
        <div className="flex flex-col justify-center items-center">
          <input
            value={Password}
            onChange={handleChange}
            name="password"
            id="Password"
            className="border border-gray-500 rounded-lg px-4 py-2 my-4 w-1/2"
            type="password"
            placeholder="Old Password"
          />
          <input
            value={newPassword}
            id="newPassword"
            onChange={handleChange}
            name="newPassword"
            className="border border-gray-500 rounded-lg px-4 py-2 my-4 w-1/2"
            type="password"
            placeholder="New Password"
          />
          <input
            value={confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
            id="confirmPassword"
            className="border border-gray-500 rounded-lg px-4 py-2 my-4 w-1/2"
            type="password"
            placeholder="Confirm New Password"
          />

          <button
            onClick={handlePasswordUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg my-4 w-1/3"
          >
            Update
          </button>
          <div />
          {/* </form> */}
        </div>
        <div />
      </div>
    </>
  );
};

export default Myaccount;
