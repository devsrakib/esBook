import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import { Colors } from "@/constants/Colors";
import { radius } from "@/constants/sizes";

const CustomSegment = ({
  tab,
  selectedIndex,
  handleIndexChange,
}: {
  tab: string[];
  setSelectedIndex: Function;
  selectedIndex: number;
  handleIndexChange: (index: number) => void;
}) => {
  return (
    <View style={styles.segments}>
      <View style={styles.segmentCon}>
        {tab?.map((t: any, index: number) => {
          return (
            <TouchableOpacity
              style={[
                styles.tabsContainer,
                {
                  backgroundColor:
                    selectedIndex === index ? Colors.mainColor : Colors.white,
                  borderColor:
                    selectedIndex === index ? Colors.white : Colors.border,
                },
              ]}
              onPress={() => {
                handleIndexChange(index);
              }}
              key={index}
            >
              <Text
                style={[
                  {
                    color: selectedIndex === index ? Colors.white : Colors.text,
                  },
                ]}
              >
                {t}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default memo(CustomSegment);

const styles = StyleSheet.create({
  segments: {
    backgroundColor: Colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  segmentCon: {
    width: "30%",
    flexDirection: "row",
    gap: 10,
  },
  tabsContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.small,
    borderWidth: 1,
  },

  activeTabStyle: {
    backgroundColor: "#007AFF",
  },
});
