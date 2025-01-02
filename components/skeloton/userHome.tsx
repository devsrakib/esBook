import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const UserViewHomeSkeleton = () => {
  return (
    <View style={styles.container}>
      {/* Skeleton for Avatar */}
      <Animated.View
        entering={FadeIn.delay(50).duration(200)}
        exiting={FadeOut.duration(200)}
        style={[styles.avatarContainer, styles.skeleton]}
      />

      {/* Skeleton for Text */}
      <View style={styles.textContainer}>
        <Animated.View
          entering={FadeIn.delay(100).duration(200)}
          exiting={FadeOut.duration(200)}
          style={[styles.textLine, styles.skeleton]}
        />
        <Animated.View
          entering={FadeIn.delay(150).duration(200)}
          exiting={FadeOut.duration(200)}
          style={[styles.textLine, styles.skeleton, { width: "60%" }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    gap: 15,
  },
  avatarContainer: {
    borderRadius: 50,
    width: 44,
    height: 44,
  },
  textContainer: {
    flex: 1,
    gap: 5,
  },
  textLine: {
    height: 10,
    borderRadius: 5,
    width: "80%",
    // marginTop: 10
  },
  skeleton: {
    backgroundColor: Colors.shadow, // Add a color for the skeleton placeholder
    opacity: 0.4,
  },
});

export default UserViewHomeSkeleton;
