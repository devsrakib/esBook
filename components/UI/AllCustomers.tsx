import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { Fragment, useEffect, useState, memo } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { radius } from "@/constants/sizes";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { Link } from "expo-router";
import { currency } from "@/global/currency";
import { useNavigation } from "@react-navigation/native";
import { getCash_sell, getCashSellsByCustomerId } from "@/databases/Database";
import { useSQLiteContext } from "expo-sqlite";
import getInitials from "@/utils/namePlaceholder";
import Animated, { FadeInDown } from "react-native-reanimated";
import FormatDate from "@/utils/FormatDate";

const AllCustomers = ({ item, index }: any) => {
  const navigation = useNavigation<any>();
  const [totalDue, setTotalDue] = useState<any>([]);
  const db = useSQLiteContext();

  useEffect(() => {
    const getTotalDue = async () => {
      const result = (await getCashSellsByCustomerId(db, item?.id))?.filter(
        (item: any) => item?.dueAmount > 0
      );
      setTotalDue(result);
    };
    getTotalDue();
  }, []);

  const totalCash_buy = totalDue?.reduce(
    (sum: number, record: any) => sum + record?.dueAmount,
    0
  );

  const CustomLink = Animated.createAnimatedComponent(Link);

  return (
    <Fragment>
      <CustomLink
        entering={FadeInDown.delay(index * 50)
          .duration(400)
          .damping(8)
          .springify()}
        href={{
          pathname: "/pages/cashbox/details",
          params: {
            id: item?.id,
            name: item?.name,
            text: "Cash Sell",
            isCustomerOrSupplier: "yes",
            phone: item?.phoneNumber,
          },
        }}
        asChild
      >
        <TouchableOpacity style={styles.customerDetails}>
          <View style={styles.avatar}>
            {item?.profilePhoto ? (
              <Image
                style={styles.profilePhoto}
                source={{ uri: item?.profilePhoto }}
              />
            ) : (
              <Text style={styles.placeholder}>{getInitials(item?.name)}</Text>
            )}
          </View>
          <View style={styles.nameSection}>
            <Text style={styles.name}>{item?.name}</Text>
            <Text style={styles.date}>
              {/* {format(item?.createdAt, "dd MMM, yyyy").toString()} */}
              {FormatDate(item?.createdAt)}
            </Text>
          </View>
          <Text adjustsFontSizeToFit>
            {currency} {totalCash_buy}
          </Text>
        </TouchableOpacity>
      </CustomLink>
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
    marginBottom: 10,
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
  profilePhoto: {
    width: "100%",
    height: "100%",
    borderRadius: radius.regular,
  },
  placeholder: {
    fontSize: Fonts.large,
    color: Colors.black,
    fontWeight: "600",
  },
});
export default memo(AllCustomers);
