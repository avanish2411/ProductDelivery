import { Stack } from "expo-router";
import React, { createContext, useState } from "react";

export const CartContext = createContext();

export default function Layout() {
  const [cart, setCart] = useState([]);
  const [pincode, setPincode] = useState('');

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, pincode, setPincode }}>
      <Stack screenOptions={{ headerShown: true }} />
    </CartContext.Provider>
  );
}
