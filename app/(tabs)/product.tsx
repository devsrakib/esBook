import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useCallback, useState, memo } from "react";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/UI/products/Header";
import ProductCard from "@/components/UI/products/ProductCard";
import CategorySegment from "@/components/UI/products/CategorySegment";
import useApiHook from "@/hooks/all_api_hooks";
import EmptyState from "@/components/UI/EmptyState";

// Memoize ProductCard component to prevent unnecessary re-renders

const Product = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [categoryId, setCategoryId] = useState<string>("");
  const { bottom, top } = useSafeAreaInsets();
  const { data: product, loading } = useApiHook(
    categoryId ? `product/?category=${categoryId}` : "product/"
  );
  const handleActiveIndex = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleCategorySelect = (id: string) => {
    if (id === "all") {
      setCategoryId(""); // Show all products
    } else {
      setCategoryId(id); // Filter by category
    }
  };

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Header />
      <CategorySegment
        activeIndex={activeIndex}
        setActiveIndex={handleActiveIndex}
        setCategoryId={handleCategorySelect}
      />
      <FlatList
        data={product?.data}
        contentContainerStyle={styles.contentCon}
        numColumns={2}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          <EmptyState
            message="No products found."
            icon="cube-outline"
            iconSize={50}
            color={Colors.text}
          />
        }
      />
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentCon: {
    paddingHorizontal: 8,
    flex: 1,
  },
});
