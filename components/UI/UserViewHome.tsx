import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Fontisto } from "@expo/vector-icons";
import { FontW, Fonts } from "@/constants/Fonts";

const UserViewHome = () => {
  return (
    <View style={styles.container}>
      {/* <Image style={styles.userAvatar} /> */}
      <View style={styles.avatarContainer}>
        <Fontisto name="user-secret" size={22} color={Colors.icon} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text1}>Hello,</Text>
        <Text style={styles.userName}>Nazrul Islam</Text>
      </View>
      <TouchableOpacity style={styles.magnify}>
        <Ionicons name="search" size={18} color={Colors.darkCharcoal} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    gap: 15,
  },
  avatarContainer: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
  },
  userAvatar: {
    width: 36,
    height: 36,
  },
  textContainer: {
    flex: 1,
  },
  text1: {
    fontSize: Fonts.small,
    color: Colors.text,
  },
  userName: {
    fontWeight: "bold",
  },
  magnify: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default UserViewHome;
