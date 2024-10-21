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

import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useCallback, useState, memo } from "react";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/UI/products/Header";
import ProductCard from "@/components/UI/products/ProductCard";
import CategorySegment from "@/components/UI/products/CategorySegment";

// Memoize ProductCard component to prevent unnecessary re-renders

const Product = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const { bottom, top } = useSafeAreaInsets();

  const handleActiveIndex = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Header />
      <CategorySegment
        activeIndex={activeIndex}
        setActiveIndex={handleActiveIndex}
      />
      <FlatList
        data={Array(1000)} // Example data
        contentContainerStyle={styles.contentCon}
        numColumns={2}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
      />
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.page_bg,
  },
  contentCon: {
    paddingHorizontal: 8,
  },
});
