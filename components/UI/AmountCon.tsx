import { View, Text, ImageBackground, StyleSheet } from "react-native";
import React from "react";

const receiveAmount = 4000;

const AmountCon = () => {
  return (
    <ImageBackground
      imageStyle={{ borderRadius: 15 }}
      style={styles.container}
      source={require("../../assets/images/amountFrame.png")}
    >
      <View style={styles.amountCon}>
        <View>
          <Text>You will Receive</Text>
          <Text>{receiveAmount}</Text>
        </View>
      </View>
      <View style={styles.amountCon}></View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 126,
    flexDirection: "row",
    // padding: 4,
    gap: 10,
    resizeMode: "stretch",
  },
  amountCon: {
    backgroundColor: "transparent",
    flexBasis: "50%",
  },
});

export default AmountCon;
