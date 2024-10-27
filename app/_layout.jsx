import { Stack } from "expo-router";
import React, { createContext, useState } from "react";

export const CartContext = createContext();

export default function Layout() {
  const [cart, setCart] = useState([]);
  const [pincode, setPincode] = useState('');

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        // Increase the quantity if item already exists
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Add new item with quantity 1
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
          return item;
        })
        .filter((item) => item.quantity > 0) // Filter out items with quantity <= 0
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, pincode, setPincode }}>
      <Stack screenOptions={{ headerShown: false }} />
    </CartContext.Provider>
  );
}
