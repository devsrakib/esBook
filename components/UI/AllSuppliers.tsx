import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { Fragment, memo } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { radius } from "@/constants/sizes";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { Link } from "expo-router";
import { currency } from "@/global/currency";
import { useNavigation } from "@react-navigation/native";

const AllSuppliers = ({ item }: any) => {
  const navigation = useNavigation<any>();
  return (
    <Fragment>
      <Link
        href={{
          pathname: "/pages/cashbox/details",
          params: {
            id: item?.id,
            name: item?.name,
            text: "Cash buy",
            isCustomerOrSupplier: "yes",
            phone: item?.phoneNumber,
          },
        }}
        asChild
      >
        <TouchableOpacity style={styles.customerDetails}>
          <View style={styles.avatar}>
            {item?.profilePhoto ? (
              <Image style={styles.img} source={{ uri: item?.profilePhoto }} />
            ) : (
              <FontAwesome6 name="user-secret" size={24} color="black" />
            )}
          </View>
          <View style={styles.nameSection}>
            <Text style={styles.name}>{item?.name}</Text>
            <Text style={styles.date}>
              {/* {format(item?.createdAt, "dd MMM, yyyy").toString()} */}
              {item?.createdAt}
            </Text>
          </View>
          <Text adjustsFontSizeToFit>{currency}23,000</Text>
        </TouchableOpacity>
      </Link>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  customerDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    height: 50,
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
    borderRadius: radius.medium,
  },
  avatar: {
    borderWidth: 1,
    borderRadius: radius.large,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.border,
    width: 36,
    height: 36,
  },
  nameSection: {
    flex: 1,
  },
  name: {
    fontSize: Fonts.medium,
    fontWeight: "600",
    color: Colors.darkCharcoal,
  },
  date: {
    fontSize: Fonts.regular,
    color: Colors.text,
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: radius.medium,
  },
});
export default memo(AllSuppliers);
