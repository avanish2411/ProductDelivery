import React, { useContext, useState } from "react";
import { View, Text, FlatList, TextInput, StyleSheet, Alert } from "react-native";
import { CartContext } from "./_layout";
import { TouchableOpacity } from "react-native";

export default function Cart() {
  const { cart, removeFromCart, pincode, setPincode } = useContext(CartContext);
  const [deliveryDate, setDeliveryDate] = useState(null);

  const estimateDeliveryDate = () => {
    // Check if pincode is exactly 6 digits
    if (pincode.length !== 6) {
      Alert.alert("Warning", "Please enter a valid 6-digit pincode.");
      return;
    }

    const deliveryDays = Math.floor(Math.random() * (10 - 5 + 1)) + 5; // Random 5-10 days
    const date = new Date();
    date.setDate(date.getDate() + deliveryDays);
    const estimatedDate = date.toDateString();

    setDeliveryDate(estimatedDate);
    Alert.alert("Estimated Delivery Date", `Your order will arrive on: ${estimatedDate}`);
  };

  // Render function for cart items
  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <View style={styles.itemDetails}>
        <Text style={styles.quantity}>Qty: {item.quantity}</Text>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeFromCart(item.id)}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart Items</Text>
      {cart.length > 0 ? (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCartItem}
          ListHeaderComponent={
            <>
              {/* Pincode Section */}
              <Text style={styles.pincodeTitle}>Enter Pincode</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your pincode"
                value={pincode}
                onChangeText={(text) => {
                  const filteredText = text.replace(/[^0-9]/g, ''); // Allow only numbers
                  // Only set pincode if the length is <= 6
                  if (filteredText.length <= 6) {
                    setPincode(filteredText);
                  }
                }}
                keyboardType="numeric" // Show numeric keyboard
                maxLength={6} // Limit length for pincode
              />
              {/* Delivery Button */}
              <TouchableOpacity style={styles.deliveryButton} onPress={estimateDeliveryDate}>
                <Text style={styles.deliveryButtonText}>Delivery Estimate</Text>
              </TouchableOpacity>
            </>
          }
          ListFooterComponent={
            deliveryDate && <Text style={styles.deliveryDate}>Estimated Delivery Date: {deliveryDate}</Text>
          }
          showsVerticalScrollIndicator={false} // Optional: hides the scroll indicator
        />
      ) : (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f9fc',
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 15,
  },
  cartItem: {
    padding: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#f5f5dc",
    marginVertical: 5,
    borderRadius: 10,
    elevation: 3,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  itemDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  quantity: {
    fontSize: 16,
    color: "#666",
  },
  removeButton: {
    borderRadius: 8,
    backgroundColor: '#fd5c63',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  pincodeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  deliveryButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    height: 40,
    borderRadius: 8,
    marginBottom: 10,
  },
  deliveryButtonText: {
    fontWeight: 'bold',
  },
  deliveryDate: {
    marginTop: 10,
    fontSize: 16,
    color: "green",
  },
  emptyCartText: {
    fontSize: 18,
    color: "#888",
    textAlign: 'center',
    marginTop: 20,
  },
});
