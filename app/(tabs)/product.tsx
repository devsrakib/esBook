import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/UI/products/Header";
import ProductCard from "@/components/UI/products/ProductCard";

const product = () => {
  const { bottom, top } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Header />
      <FlatList
        data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
        contentContainerStyle={styles.contentCon}
        numColumns={2}
        renderItem={({ item }) => {
          return <ProductCard item={item} />;
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.page_bg,
  },
  contentCon: {
    paddingHorizontal: 8,
  },
});
