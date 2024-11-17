<<<<<<< HEAD
=======
// import { View, Text, StyleSheet, FlatList } from "react-native";
// import React, { useCallback, useState } from "react";
// import { Colors } from "@/constants/Colors";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import Header from "@/components/UI/products/Header";
// import ProductCard from "@/components/UI/products/ProductCard";
// import CategorySegment from "@/components/UI/products/CategorySegment";

// const product = () => {
//   const [activeIndex, setActiveIndex] = useState<number | null>(0);
//   const { bottom, top } = useSafeAreaInsets();

//   const handleActiveIndex = useCallback((index: number) => {
//     setActiveIndex(index);
//   }, []);

//   return (
//     <View style={[styles.container, { paddingTop: top }]}>
//       <Header />
//       <CategorySegment
//         activeIndex={activeIndex}
//         setActiveIndex={handleActiveIndex}
//       />
//       <FlatList
//         data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
//         contentContainerStyle={styles.contentCon}
//         numColumns={2}
//         renderItem={({ item }) => {
//           return <ProductCard item={item} />;
//         }}
//         keyExtractor={(item, index) => index.toString()}

//       />
//     </View>
//   );
// };

// export default product;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.page_bg,
//   },
//   contentCon: {
//     paddingHorizontal: 8,
//   },
// });

>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useCallback, useState, memo } from "react";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/UI/products/Header";
import ProductCard from "@/components/UI/products/ProductCard";
import CategorySegment from "@/components/UI/products/CategorySegment";
import useApiHook from "@/hooks/all_api_hooks";
<<<<<<< HEAD
import EmptyState from "@/components/UI/EmptyState";
=======
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b

// Memoize ProductCard component to prevent unnecessary re-renders

const Product = () => {
<<<<<<< HEAD
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [categoryId, setCategoryId] = useState<string>("");
  const { bottom, top } = useSafeAreaInsets();
  const { data: product, loading } = useApiHook(
    categoryId ? `product/?category=${categoryId}` : "product/"
  );
=======
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const { bottom, top } = useSafeAreaInsets();
  const { data: product } = useApiHook("product/create/");
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
  const handleActiveIndex = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

<<<<<<< HEAD
  const handleCategorySelect = (id: string) => {
    if (id === "all") {
      setCategoryId(""); // Show all products
    } else {
      setCategoryId(id); // Filter by category
    }
  };

=======
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Header />
      <CategorySegment
        activeIndex={activeIndex}
        setActiveIndex={handleActiveIndex}
<<<<<<< HEAD
        setCategoryId={handleCategorySelect}
      />
      <FlatList
        data={product?.data}
=======
      />
      <FlatList
        // data={product?.results} // Example data
        data={[1, 2, 1, 1]}
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
        contentContainerStyle={styles.contentCon}
        numColumns={2}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
<<<<<<< HEAD
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          <EmptyState
            message="No products found."
            icon="cube-outline"
            iconSize={50}
            color={Colors.text}
          />
        }
=======
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
      />
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: Colors.background,
  },
  contentCon: {
    paddingHorizontal: 8,
    flex: 1,
=======
    backgroundColor: Colors.page_bg,
  },
  contentCon: {
    paddingHorizontal: 8,
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
  },
});
