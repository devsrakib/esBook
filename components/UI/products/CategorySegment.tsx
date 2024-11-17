import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { memo, useMemo, useState } from "react";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
<<<<<<< HEAD
import useApiHook, { apiUrl } from "@/hooks/all_api_hooks";
=======
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b

const CategorySegment = ({
  activeIndex,
  setActiveIndex,
<<<<<<< HEAD
  setCategoryId,
}: {
  activeIndex: number | null;
  setActiveIndex: Function;
  setCategoryId: Function;
}) => {
  const { data: category } = useApiHook("category/");
  console.log(category);
=======
}: {
  activeIndex: number | null;
  setActiveIndex: Function;
}) => {
  const category = useMemo(() => ["grocery", "cosmetics", "books"], []);
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b

  const renderItem = ({ item, index }: { item: string; index: number }) => {
    const isActive = index === activeIndex;
    return (
      <TouchableOpacity
        style={[
          styles.item,
          { backgroundColor: isActive ? Colors.mainColor : Colors.white },
        ]}
<<<<<<< HEAD
        onPress={() => {
          setActiveIndex(index);
          setCategoryId(item?.id);
        }} // Set active index on press
=======
        onPress={() => setActiveIndex(index)} // Set active index on press
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
      >
        <Text
          style={[
            styles.itemText,
            { color: isActive ? Colors.white : Colors.mainColor },
          ]}
        >
<<<<<<< HEAD
          {item?.title}
=======
          {item}
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <TouchableOpacity
        onPress={() => {
          setActiveIndex(null);
          setCategoryId("");
        }}
        style={[
          styles.allSegment,
          {
            backgroundColor:
              activeIndex === null ? Colors.mainColor : Colors.white,
          },
        ]}
      >
        <Text
          style={[
            styles.itemText,
            { color: activeIndex === null ? Colors.white : Colors.mainColor },
          ]}
        >
          All
        </Text>
      </TouchableOpacity>
      <FlatList
        data={category?.data}
        horizontal
        contentContainerStyle={styles.content}
        showsHorizontalScrollIndicator={false}
=======
      <FlatList
        data={category}
        horizontal
        contentContainerStyle={styles.content}
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()} // Add a keyExtractor for better performance
      />
    </View>
  );
};

export default memo(CategorySegment);

const styles = StyleSheet.create({
  container: {
<<<<<<< HEAD
    paddingVertical: 5,
    paddingHorizontal: 16,
    flexDirection: "row",
=======
    paddingVertical: 10,
    paddingHorizontal: 16,
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
<<<<<<< HEAD
    shadowColor: Colors.shadow,
    elevation: 10,
    marginVertical: 10,
=======
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
  },
  itemText: {
    fontSize: Fonts.regular,
    fontWeight: "500",
  },

  content: {
    gap: 10,
<<<<<<< HEAD
    paddingLeft: 10,
    paddingRight: 3,
  },
  allSegment: {
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    shadowColor: Colors.shadow,
    elevation: 10,
    height: 30,
    marginVertical: 10,
=======
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
  },
});
