import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { MotiView } from "moti";
import { radius } from "@/constants/sizes";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { tabProps } from "@/app/(tabs)/Cash";
import Animated, {
  FadeInRight,
  LinearTransition,
} from "react-native-reanimated";

type props = {
  item: tabProps;
  isSelected: boolean;
  setSelectedIndex: Function;
  index: number;
};
const Tab = ({ item, isSelected, setSelectedIndex, index }: props) => {
  return (
    <MotiView
      animate={{
        backgroundColor: isSelected ? Colors.mainColor : Colors.white,
        borderRadius: radius.small,
        borderColor: Colors.white,
        borderWidth: 1,
      }}
      layout={LinearTransition.springify().damping(80).stiffness(200)}
    >
      <Pressable
        onPress={() => setSelectedIndex(index)}
        style={[
          styles.container,
          { backgroundColor: isSelected ? Colors.white : Colors.mainColor },
        ]}
      >
        <Text
          style={[
            styles.Text,
            { color: isSelected ? Colors.mainColor : Colors.white },
          ]}
        >
          {item?.label}
        </Text>
        {isSelected && (
          <Animated.View
            entering={FadeInRight.delay(50).damping(80).springify()}
          >
            {item?.icon}
          </Animated.View>
        )}
      </Pressable>
    </MotiView>
  );
};

export default Tab;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.small,
    backgroundColor: Colors.mainColor,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
    // height: 28,
    borderWidth: 1,
    borderColor: Colors.mainColor,
  },
  Text: {
    fontSize: Fonts.regular,
  },
});
