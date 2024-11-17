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

import useApiHook, { apiUrl } from "@/hooks/all_api_hooks";

const CategorySegment = ({
  activeIndex,
  setActiveIndex,

  setCategoryId,
}: {
  activeIndex: number | null;
  setActiveIndex: Function;
  setCategoryId: Function;
}) => {
  const { data: category } = useApiHook("category/");
  console.log(category);
  const renderItem = ({ item, index }: { item: string; index: number }) => {
    const isActive = index === activeIndex;
    return (
      <TouchableOpacity
        style={[
          styles.item,
          { backgroundColor: isActive ? Colors.mainColor : Colors.white },
        ]}
        onPress={() => {
          setActiveIndex(index);
          setCategoryId(item?.id);
        }} // Set active index on press
      >
        <Text
          style={[
            styles.itemText,
            { color: isActive ? Colors.white : Colors.mainColor },
          ]}
        >
          {item?.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
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
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()} // Add a keyExtractor for better performance
      />
    </View>
  );
};

export default memo(CategorySegment);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 16,
    flexDirection: "row",
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    shadowColor: Colors.shadow,
    elevation: 10,
    marginVertical: 10,
  },
  itemText: {
    fontSize: Fonts.regular,
    fontWeight: "500",
  },

  content: {
    gap: 10,
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
  },
});
