import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { CartContext } from "./_layout";
import { TouchableOpacity } from "react-native";

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
          style={{ marginBottom: 20 }}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <Text style={{ paddingBottom: 8, fontSize: 16 }}>{item.title}</Text>
              <TouchableOpacity
                style={{
                  backgroundColor: 'lightblue',
                  height: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 16,
                }}
                onPress={() => addToCart(item)}
              >
                <Text style={{ fontWeight: '400', fontSize: 15 }}>Add to cart</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <TouchableOpacity
        style={{
          backgroundColor: 'lightblue',
          height: 35,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 16,
        }}
        onPress={() => router.push("/cart")}
      >
        <Text style={{ fontWeight: '400', fontSize: 15 }}>View Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    paddingTop: 15,
    fontWeight: '800',
  },
  productItem: {
    padding: 10,
    marginVertical: 6,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#f5f5dc",
    borderRadius: 16,
    elevation: 3,
  },
});
