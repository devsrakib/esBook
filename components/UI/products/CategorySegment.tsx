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

const CategorySegment = ({
  activeIndex,
  setActiveIndex,
}: {
  activeIndex: number | null;
  setActiveIndex: Function;
}) => {
  const category = useMemo(() => ["grocery", "cosmetics", "books"], []);

  const renderItem = ({ item, index }: { item: string; index: number }) => {
    const isActive = index === activeIndex;
    return (
      <TouchableOpacity
        style={[
          styles.item,
          { backgroundColor: isActive ? Colors.mainColor : Colors.white },
        ]}
        onPress={() => setActiveIndex(index)} // Set active index on press
      >
        <Text
          style={[
            styles.itemText,
            { color: isActive ? Colors.white : Colors.mainColor },
          ]}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={category}
        horizontal
        contentContainerStyle={styles.content}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()} // Add a keyExtractor for better performance
      />
    </View>
  );
};

export default memo(CategorySegment);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  itemText: {
    fontSize: Fonts.regular,
    fontWeight: "500",
  },

  content: {
    gap: 10,
  },
});
