import React from "react";
import { StatusBar, View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors"; // Assuming you have Colors defined

const CustomStatusBar = () => {
  return (
    <View style={styles.container}>
      {/* Custom Status Bar */}
      <StatusBar barStyle="light-content" backgroundColor={Colors.mainColor} />

      {/* Your screen content */}
      <Text style={styles.text}>Hello, Custom Status Bar!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: Colors.mainColor,
  },
});

export default CustomStatusBar;
