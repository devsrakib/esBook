<<<<<<< HEAD
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
=======
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
import React from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Link } from "expo-router";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { radius } from "@/constants/sizes";
import { Fonts } from "@/constants/Fonts";
<<<<<<< HEAD
import useApiHook from "@/hooks/all_api_hooks";

const ProfileView = ({ id }: { id: string }) => {
  const { data: supplier } = useApiHook(`suppliers/${id}/`);

  console.log(supplier?.phone);

  const handleCall = () => {
    if (supplier?.phone) {
      const phoneUrl = `tel:${supplier?.phone}`;
      Linking.openURL(phoneUrl).catch((err) =>
        console.error("Error opening dialer:", err)
      );
    }
  };
=======

const ProfileView = () => {
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
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
<<<<<<< HEAD
            {supplier?.store_name}
          </Animated.Text>
          <Link
            href={{
              pathname: "/pages/product/SupplierEdit",
              params: {
                id: supplier?.id,
              },
            }}
            asChild
          >
=======
            Farvez and brothers
          </Animated.Text>
          <Link href={"/pages/product/SupplierEdit"} asChild>
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
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
<<<<<<< HEAD
          pro: {supplier?.name}
        </Animated.Text>

        {/* Phone Number with Call Icon */}
        <Animated.View
          entering={FadeInDown.delay(150).duration(400).damping(80).springify()}
          style={styles.callIconCon}
        >
          <Text style={styles.phoneNumber}>Phone: {supplier?.phone}</Text>
          <TouchableOpacity
            onPress={() => handleCall()}
            style={styles.callIcon}
          >
            <Ionicons name="call" size={16} color={Colors.mainColor} />
          </TouchableOpacity>
        </Animated.View>
=======
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
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b

        {/* Location */}
        <Animated.Text
          entering={FadeInDown.delay(200).duration(400).damping(80).springify()}
          style={styles.location}
        >
<<<<<<< HEAD
          Location: {supplier?.address}
=======
          Location: chaprashir hat, poschim bajar
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
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
<<<<<<< HEAD
    marginHorizontal: 16,
=======
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
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
