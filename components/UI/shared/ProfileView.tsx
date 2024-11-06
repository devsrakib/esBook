import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Link } from "expo-router";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { radius } from "@/constants/sizes";
import { Fonts } from "@/constants/Fonts";

const ProfileView = () => {
  return (
    <Animated.View
      entering={FadeInDown.delay(50).duration(400).damping(80).springify()}
      style={styles.profileSection}
    >
      {/* Profile Image */}
      <View style={styles.profileCon}>
        <Image
          style={styles.profile}
          source={require("../../../assets/images/picture.png")}
        />
      </View>

      <View style={styles.infoCon}>
        {/* Shop Name with Edit Icon */}
        <View style={styles.shopNameContainer}>
          <Animated.Text
            entering={FadeInDown.delay(50)
              .duration(400)
              .damping(80)
              .springify()}
            style={styles.shopName}
          >
            Farvez and brothers
          </Animated.Text>
          <Link href={"/pages/product/SupplierEdit"} asChild>
            <TouchableOpacity style={styles.editCon}>
              <FontAwesome5
                name="user-edit"
                size={18}
                color={Colors.darkCharcoal}
              />
            </TouchableOpacity>
          </Link>
        </View>

        {/* Owner Name */}
        <Animated.Text
          entering={FadeInDown.delay(100).duration(400).damping(80).springify()}
          style={styles.owner}
        >
          pro: sanaullah donu
        </Animated.Text>

        {/* Phone Number with Call Icon */}
        <View style={styles.callIconCon}>
          <Animated.Text
            entering={FadeInDown.delay(150)
              .duration(400)
              .damping(80)
              .springify()}
            style={styles.phoneNumber}
          >
            Phone: 01601113299
          </Animated.Text>
          <TouchableOpacity style={styles.callIcon}>
            <Ionicons name="call" size={16} color={Colors.mainColor} />
          </TouchableOpacity>
        </View>

        {/* Location */}
        <Animated.Text
          entering={FadeInDown.delay(200).duration(400).damping(80).springify()}
          style={styles.location}
        >
          Location: chaprashir hat, poschim bajar
        </Animated.Text>
      </View>
    </Animated.View>
  );
};

export default ProfileView;

const styles = StyleSheet.create({
  profileSection: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: Colors.white,
    padding: 8,
    borderRadius: radius.small,
    shadowColor: Colors.darkCharcoal,
    elevation: 10,
  },
  profileCon: {
    borderRadius: radius.small,
    shadowColor: Colors.darkCharcoal,
    elevation: 15,
    backgroundColor: Colors.white,
  },
  profile: {
    width: 90,
    height: 90,
    borderRadius: radius.small,
    resizeMode: "cover",
    // borderWidth: 1,
    // borderColor: Colors.mainColor,
  },
  infoCon: {
    flex: 1,
  },
  shopNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
  },
  shopName: {
    fontSize: Fonts.large,
    color: Colors.mainColor,
    fontWeight: "600",
    flex: 1,
  },
  editCon: {
    width: 24,
    height: 24,
    borderRadius: radius.small,
    alignItems: "center",
    justifyContent: "center",
  },
  owner: {
    fontSize: Fonts.regular,
    color: Colors.darkCharcoal,
    fontWeight: "500",
  },
  phoneNumber: {
    fontWeight: "500",
    fontSize: Fonts.regular,
    color: Colors.darkCharcoal,
  },
  callIconCon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  callIcon: {
    backgroundColor: Colors.white,
    borderRadius: radius.small,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    shadowColor: Colors.mainColor,
    elevation: 5,
    borderWidth: 1,
    borderColor: Colors.mainColor,
  },
  location: {
    fontWeight: "500",
    fontSize: Fonts.regular,
    color: Colors.darkCharcoal,
  },
});
