import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { memo, useState } from "react";
import { Colors } from "@/constants/Colors";
import { radius } from "@/constants/sizes";
import Animated, {
  FadeInRight,
  FadeOutRight,
  LinearTransition,
} from "react-native-reanimated";
import { tab_props } from "./CustomerAndSupplierList";
import { MotiView } from "moti";

const CustomSegment = ({
  tab,
  selectedIndex,
  handleIndexChange,
}: {
  tab: tab_props[];
  setSelectedIndex: Function;
  selectedIndex: number;
  handleIndexChange: (index: number) => void;
}) => {

  return (
    <View style={styles.segments}>
      <View style={styles.segmentCon}>
        {tab?.map((t: any, index: number) => {
          const isSelected = selectedIndex === index;
          return (
            <MotiView
              animate={{
                backgroundColor: isSelected ? Colors.mainColor : Colors.white,
                borderRadius: 4,
              }}
              key={index}
              layout={LinearTransition.springify().damping(80).stiffness(200)}
            >
              <Pressable
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
              >
                <Animated.Text
                  style={[
                    {
                      color:
                        selectedIndex === index ? Colors.white : Colors.text,
                    },
                  ]}
                >
                  {t.label}
                </Animated.Text>
                <Animated.View
                  entering={FadeInRight.springify().damping(80).stiffness(100)}
                  exiting={FadeOutRight.springify().damping(80).stiffness(100)}
                >
                  {isSelected && t.icon}
                </Animated.View>
              </Pressable>
            </MotiView>
          );
        })}
      </View>
    </View>
  );
};

export default CustomSegment;

const styles = StyleSheet.create({
  segments: {
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
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
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  activeTabStyle: {
    backgroundColor: "#007AFF",
  },
});
