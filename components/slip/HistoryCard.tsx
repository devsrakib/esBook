import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { radius } from "@/constants/sizes";
import { Fonts } from "@/constants/Fonts";
import { FontAwesome6 } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";

const HistoryCard = () => {
  return (
    <View style={styles.container}>
      <Link href={"/pages/slip/slipHistoryView"} asChild>
        <TouchableOpacity style={styles.imageAndTitleCon}>
          <Image
            style={styles.image}
            source={require("../../assets/images/onion.jpg")}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Rakibul islam</Text>
            <Text style={styles.location}>10/10/2003</Text>
            <View style={styles.locationCon}>
              <FontAwesome6 name="location-dot" size={11} color={Colors.red} />
              <Text numberOfLines={1} style={styles.location}>
                Chaprashir hat, kobirhat
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default HistoryCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: radius.small,
    shadowColor: Colors.shadow,
    elevation: 10,
    padding: 8,
    flexBasis: "48%",
  },
  imageAndTitleCon: {
    flexDirection: "row",
    gap: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: radius.small,
    resizeMode: "cover",
  },
  locationCon: { flexDirection: "row", gap: 5, alignItems: "center" },
  titleContainer: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: Fonts.regular,
    color: Colors.mainColor,
    fontWeight: "500",
  },
  location: {
    fontSize: Fonts.small,
    color: Colors.text,
  },
});
