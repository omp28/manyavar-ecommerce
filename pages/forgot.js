import React from "react";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleChange = async (e) => {
    if (e.target.name == "email") {
      setEmail(e.target.value);
    }
    if (e.target.name == "password") {
      setPassword(e.target.value);
    }
    if (e.target.name == "confirmPassword") {
      setConfirmPassword(e.target.value);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push(process.env.NEXT_PUBLIC_HOST);
    }
  }, [router]);
  const sendResetEmail = async (e) => {
    let data = { email, sendMail: true };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let Res = await a.json();
    if (Res.sucess) {
      console.log("Password reset Email Sent");
    } else {
      console.log("Password reset Email not Sent");
    }
  };
  const resetPassword = async (e) => {
    if (password == confirmPassword) {
      let data = { password, sendMail: false };
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let Res = await a.json();
      if (Res.sucess) {
        console.log("Password Changed Successfully");
      } else {
        console.log("Password not Changed ");
      }
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            FORGOT PASSWORD
          </h2>
          {/* or signUp */}
          <p className="mt-2 text-center text-sm leading-5 text-gray-600 max-w">
            Or{" "}
            <Link
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            >
              LogIn
            </Link>
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {/* token check */}
          {router.query.token && (
            <div>
              {" "}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  New Password
                </label>
                <div className="mt-2">
                  <input
                    value={password}
                    onChange={handleChange}
                    placeholder="New Password"
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm New Password
                </label>
                <div className="mt-2">
                  <input
                    value={confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm New Password"
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="confirmPassword"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <button
                  onClick={resetPassword}
                  type="submit"
                  className="  flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Continue
                </button>
              </div>
              {password !== confirmPassword && (
                <span className=" text-center flex justify-center  text-red-500">
                  Password did not matched{" "}
                </span>
              )}
              {password && password === confirmPassword && (
                <span className=" text-center flex justify-center text-green-800">
                  Password Matched{" "}
                </span>
              )}
            </div>
          )}
          {!router.query.token && (
            <>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2 mb-4">
                  <input
                    value={email}
                    onChange={handleChange}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={sendResetEmail}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Continue
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Forgot;
