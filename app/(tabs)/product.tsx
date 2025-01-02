import { View, StyleSheet, FlatList } from "react-native";
import React, { useCallback, useState, useEffect } from "react";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/UI/products/Header";
import ProductCard from "@/components/UI/products/ProductCard";
import CategorySegment from "@/components/UI/products/CategorySegment";
import EmptyState from "@/components/UI/EmptyState";
import CustomLoader from "@/components/UI/CustomLoader";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchProducts } from "@/redux/features/product/productSlice";

const Product = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [categoryId, setCategoryId] = useState<string>("");
  const { top } = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    console.log(categoryId, '********')
    
    dispatch(fetchProducts( categoryId));
  }, [categoryId]);

  console.log(categoryId, ':::: c');
  

  const handleActiveIndex = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);
console.log(products);

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Header />
      <CategorySegment
        activeIndex={activeIndex}
        setActiveIndex={handleActiveIndex}
        setCategoryId={setCategoryId}
      />
      {loading ? (
        <CustomLoader />
      ) : (
        <FlatList
          data={products?.data}
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
              message={`No products found.`}
              icon="cube-outline"
              iconSize={50}
              color={Colors.text}
            />
          }
        />
      )}
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
    flexGrow: 1,
    backgroundColor: Colors.page_bg,
  },
});
