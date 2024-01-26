import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [cart, setCart] = useState({});
  const [subTotal, setTotal] = useState(0);

  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (err) {
      console.error(err);
      localStorage.clear();
    }
  }, []);

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subT = 0;
    for (let i = 0; i < Object.keys(myCart).length; i++) {
      subT +=
        myCart[Object.keys(myCart)[i]].qty *
        myCart[Object.keys(myCart)[i]].price;
    }
    setTotal(subT);
  };

  // Add to cart
  const addToCart = (itemCode, qty, price, name, size, variant) => {
    let myCart = { ...cart };
    if (itemCode in cart) {
      myCart[itemCode].qty = cart[itemCode].qty + qty;
    } else {
      myCart[itemCode] = {
        qty: 1,
        price: price,
        name: name,
        size: size,
        variant: variant,
      };
    }
    setCart(myCart);
    saveCart(myCart);
  };

  // clearcart
  const clearCart = () => {
    setCart({});
    saveCart({});
    setTotal(0);
    localStorage.removeItem("cart");
  };

  // removeFromCart
  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    let myCart = { ...cart };
    if (itemCode in cart) {
      myCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if (myCart[itemCode].qty <= 0) {
      delete myCart[itemCode];
    }
    setCart(myCart);
    saveCart(myCart);
  };

  return (
    <>
      <Nav
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
      />
      <Component
        cart={cart}
        addTocart={addToCart}
        remooveFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
        {...pageProps}
      />
      <Footer />
    </>
  );
}
