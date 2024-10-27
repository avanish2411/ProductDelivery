// app/cart.js
import React, { useContext, useState } from "react";
import { View, Text, FlatList, Button, TextInput, StyleSheet, Alert } from "react-native";
import { CartContext } from "./_layout";

export default function Cart() {
  const { cart, removeFromCart, pincode, setPincode } = useContext(CartContext);
  const [deliveryDate, setDeliveryDate] = useState(null);

  // Function to estimate delivery date
  const estimateDeliveryDate = () => {
    if (!pincode) {
      // Show warning if pincode is empty
      Alert.alert("Warning", "Please enter a pincode.");
      return;
    }

    const deliveryDays = Math.floor(Math.random() * (10 - 5 + 1)) + 5; // Random 5-10 days
    const date = new Date();
    date.setDate(date.getDate() + deliveryDays);
    const estimatedDate = date.toDateString();

    setDeliveryDate(estimatedDate);

    // Show the estimated delivery date in an alert box
    Alert.alert("Estimated Delivery Date", `Your order will arrive on: ${estimatedDate}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart Items</Text>
      {cart.length > 0 ? (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Text style={{flex:1}}>{item.title}</Text>
                <Button
                  title="Remove"
                  color="red"
                  onPress={() => removeFromCart(item.id)}
                />
              </View>
            )}
          />

          {/* Pincode Section */}
          <Text style={styles.pincodeTitle}>Enter Pincode</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your pincode"
            value={pincode}
            onChangeText={setPincode}
          />

          {/* Delivery Button */}
          <Button title="Deliver" onPress={estimateDeliveryDate} />

          {deliveryDate && <Text style={styles.deliveryDate}>Estimated Delivery Date: {deliveryDate}</Text>}
        </>
      ) : (
        <Text>Your cart is empty.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 5,
  },
  pincodeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  deliveryDate: {
    marginTop: 10,
    fontSize: 16,
    color: "green",
  },
});
