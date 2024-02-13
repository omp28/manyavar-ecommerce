import React, { useEffect } from "react";
import { useRouter } from "next/router";
const myaccount = () => {
  let router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);
  return <div>myaccount</div>;
};

export default myaccount;
