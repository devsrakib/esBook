import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { Fragment, useEffect, useState, memo } from "react";
import Divider from "./Divider";
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

import Animated, { FadeInDown } from "react-native-reanimated";

const Customers = ({
  item,
  text,
  selectedIndex,
  deleteFrom,
  index,
}: {
  item: any;
  index: number;
  text?: string;
  selectedIndex?: number;
  deleteFrom?: string;
}) => {
  const [totalDue, setTotalDue] = useState<any>([]);


  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("");
  };

  // useEffect(() => {
  //   const getTotalDue = async () => {
  //     if (text === "Supplier") {
  //       const totalDue = await getCashBuyBySupplierId(db, item?.id);
  //       setTotalDue(totalDue);
  //     } else {
  //       const totalDue = await getCashSellsByCustomerId(db, item?.id);
  //       setTotalDue(totalDue);
  //     }
  //   };
  //   getTotalDue();
  // }, [selectedIndex]);

  const due = totalDue?.reduce(
    (sum: number, record: any) => sum + record?.dueAmount,
    0
  );

  const stringToColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str?.length; i++) {
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
    <Animated.View
      entering={FadeInDown.delay(index * 50)
        .duration(200)
        .springify()
        .damping(80)
        .stiffness(200)}
    >
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
            <View style={[styles.avatar, { backgroundColor: Colors.mainColor }]}>
              {item?.profile_photo ? (
                <Image
                  style={styles.profile}
                  source={{ uri: item?.profile_photo }}
                />
              ) : (
                <Text style={styles.initials}>{initials}</Text>
              )}
            </View>
            <View style={styles.nameSection}>
              <Text style={styles.name}>{item?.name}</Text>
              
                <Text>{item?.email}</Text>
            </View>
           <View style={styles.dateAndDueCon}>
           <Text style={styles.date}>
                {/* {format(item?.createdAt, "dd MMM, yyyy").toString()} */}
                {FormatDate(item?.createdAt)}
              </Text>
            <Text adjustsFontSizeToFit style={[styles.money, {color: selectedIndex === 0 ? Colors.green : Colors.red }]}>
              <Text style={{color: Colors.text}}>{currency}</Text> {due}
            </Text>
           </View>

          </TouchableOpacity>
        </Link>
      </Fragment>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  customerDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    // height: 50,
    paddingVertical: 5,
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
    borderRadius: radius.small,
    resizeMode: 'cover'
  },
  money:{
fontWeight: '600',
fontSize: Fonts.medium,
  },
  initials: {
    textDecorationStyle: "solid",
    textTransform: "uppercase",
    fontSize: Fonts.medium,
    fontWeight: "600",
    color: Colors.white
  },
  dateAndDueCon:{
    flexDirection: 'column',
    alignItems: 'flex-end'
  }
});
export default memo(Customers);
