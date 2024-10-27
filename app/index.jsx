import React, { useEffect, useState, useContext } from "react";
import { View, Text, Button, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { CartContext } from "./_layout";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product List</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          style={{marginBottom:20,}}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <Text>{item.title}</Text>
              <Button title="Add to Cart" onPress={() => addToCart(item)} />
            </View>
          )}
        />
      )}

      <Button title="View Cart" onPress={() => router.push("/cart")} />
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
    marginVertical: 10,
  },
  productItem: {
    padding: 10,
    marginVertical: 5,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#f9f9f9",
  },
});
