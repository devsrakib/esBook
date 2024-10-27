import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { Fragment, useEffect, useState, memo } from "react";
import Divider from "../Divider";
import { FontAwesome6 } from "@expo/vector-icons";
import { radius } from "@/constants/sizes";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { Link } from "expo-router";
import { currency } from "@/global/currency";
import { useNavigation } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";
import {
  getCashBuyBySupplierId,
  getCashSellsByCustomerId,
} from "@/databases/Database";
import FormatDate from "@/utils/FormatDate";

const Customers = ({
  item,
  text,
  selectedIndex,
  deleteFrom,
}: {
  item: any;
  text: string;
  selectedIndex?: number;
  deleteFrom: string;
}) => {
  const [totalDue, setTotalDue] = useState<any>([]);
  const db = useSQLiteContext();

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("");
  };

  useEffect(() => {
    const getTotalDue = async () => {
      if (text === "Supplier") {
        const totalDue = await getCashBuyBySupplierId(db, item?.id);
        setTotalDue(totalDue);
      } else {
        const totalDue = await getCashSellsByCustomerId(db, item?.id);
        setTotalDue(totalDue);
      }
    };
    getTotalDue();
  }, [selectedIndex]);

  const due = totalDue?.reduce(
    (sum: number, record: any) => sum + record?.dueAmount,
    0
  );

  const stringToColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Extract RGB components
    const r = (hash >> 16) & 0xff;
    const g = (hash >> 16) & 0xff;
    const b = hash & 0xff;

    // Return the color with 50% transparency
    return `rgba(${r}, ${g}, ${b}, 0.5)`;
  };

  const initials = getInitials(item?.name);
  const backgroundColor = stringToColor(initials);

  return (
    <Fragment>
      <Link
        href={{
          pathname: "/pages/parties/CustomerView",
          params: {
            id: item?.id,
            name: item?.name,
            text: text,
            deleteFrom: deleteFrom,
            profile: item?.profilePhoto,
          },
        }}
        asChild
      >
        <TouchableOpacity style={styles.customerDetails}>
          <View style={[styles.avatar, { backgroundColor: backgroundColor }]}>
            {item?.profilePhoto ? (
              <Image
                style={styles.profile}
                source={{ uri: item?.profilePhoto }}
              />
            ) : (
              <Text style={styles.initials}>{initials}</Text>
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
            {currency} {due}
          </Text>
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
    backgroundColor: Colors.VeroneseGreen,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: radius.small,
  },
  avatar: {
    borderWidth: 1,
    borderRadius: radius.small,
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
  profile: {
    width: "100%",
    height: "100%",
    borderRadius: radius.medium,
  },
  initials: {
    textDecorationStyle: "solid",
    textTransform: "uppercase",
    fontSize: Fonts.medium,
    fontWeight: "600",
  },
});
export default memo(Customers);
