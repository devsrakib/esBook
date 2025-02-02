import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { Fragment, memo, useEffect, useState } from "react";
import { Entypo, Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { radius } from "@/constants/sizes";
import { Fonts } from "@/constants/Fonts";
import { Link } from "expo-router";
import { getCustomerById, getSupplierById } from "@/databases/Database";
import { useSQLiteContext } from "expo-sqlite";
import FormatDate from "@/utils/FormatDate";
import Animated, { FadeInDown } from "react-native-reanimated";

import { LinearGradient } from "expo-linear-gradient";
const SearchCustomerAndAddCustomer = ({
  text,
  id,
  setActiveModal
}: {
  text: string;
  id: number;
  setActiveModal: Function
}) => {
  const [customerData, setCustomerData] = useState<any>([]);
  const db = useSQLiteContext();
  const path =
    text === "Customer"
      ? "/pages/cashbox/allCustomers"
      : "/pages/cashbox/allSuppliers";

  useEffect(() => {
    async function getCustomerOrSupplier() {
      try {
        if (text === "Customer") {
          const customer = await getCustomerById(db, id);
          setCustomerData(customer);
        } else {
          const supplier = await getSupplierById(db, id);
          setCustomerData(supplier);
        }
      } catch (error) {
        console.error("Error fetching customer or supplier:", error);
      }
    }
    if (db && id) {
      getCustomerOrSupplier();
    }
  }, [db, id]);

  const CustomTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  return (
    <LinearGradient
      colors={["#168F88", "#006B60", "#4D89A1"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Link
        href={{
          pathname: path,
        }}
        asChild
      >
        <CustomTouchable
          entering={FadeInDown.delay(50).duration(400).damping(80).springify()}
          style={styles.inputContainer}
        >
          <View style={styles.userIconCon}>
            {id && customerData?.profile_photo ? (
              <Image
                style={styles.image}
                source={{ uri: customerData?.profile_photo }}
              />
            ) : (
              <Feather name="user" size={24} color={Colors.text} />
            )}
          </View>
          {id ? (
            <Fragment>
              <View style={styles.nameContainer}>
                <Text style={styles.name}>{customerData?.name}</Text>
                <Text style={styles.date}>
                  {customerData?.createdAt
                    ? FormatDate(customerData?.createdAt)
                    : null}
                </Text>
              </View>
              <View style={[styles.userIconCon, { borderWidth: 0 }]}>
                <AntDesign name="retweet" size={26} color={Colors.text} />
              </View>
            </Fragment>
          ) : (
            <Text style={styles.text}>Select {text}</Text>
          )}
        </CustomTouchable>
      </Link>
      {/* <Link
        href={{
          pathname: "/pages/parties/addNewParties",
          params: {
            text: "Add Customer",
          },
        }}
        asChild
      > */}
        <CustomTouchable
        onPress={() => setActiveModal(true)}
          entering={FadeInDown.delay(100).duration(400).damping(80).springify()}
          style={styles.plusCon}
        >
          <Entypo name="plus" size={24} color={Colors.text} />
          <Text style={styles.addText}>Add Slip</Text>
        </CustomTouchable>
      {/* </Link> */}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 15,
  },
  inputContainer: {
    backgroundColor: Colors.white,
    flex: 1,
    height: 50,

    borderRadius: radius.small,

    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  userIconCon: {
    borderWidth: 1,
    borderRadius: radius.small,
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.border,
  },
  text: {
    flex: 1,
    fontSize: Fonts.regular,
    color: Colors.text,
  },
  plusCon: {
    backgroundColor: Colors.white,
    borderRadius: radius.small,
    height: 50,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
    gap: 5,

  },
  addText:{
    fontSize: Fonts.regular,
    color: Colors.text,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: radius.small,
  },
  nameContainer: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: Fonts.medium,
    fontWeight: "600",
  },
  date: {
    fontSize: Fonts.small,
    color: Colors.text,
  },
});
export default memo(SearchCustomerAndAddCustomer);
