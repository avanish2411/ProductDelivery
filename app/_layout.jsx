// app/_layout.js
import { Stack } from "expo-router";
import React, { createContext, useState } from "react";

// Create Cart Context
export const CartContext = createContext();

export default function Layout() {
  const [cart, setCart] = useState([]);
  const [pincode, setPincode] = useState('');

  // Function to add items to the cart
  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  // Function to remove items from the cart
  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, pincode, setPincode }}>
      <Stack screenOptions={{ headerShown: true }} />
    </CartContext.Provider>
  );
}
