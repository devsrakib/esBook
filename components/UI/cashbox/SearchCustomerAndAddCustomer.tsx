import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { Fragment, memo, useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { radius } from "@/constants/sizes";
import { Fonts } from "@/constants/Fonts";
import { Link } from "expo-router";
import { getCustomerById, getSupplierById } from "@/databases/Database";
import { useSQLiteContext } from "expo-sqlite";
import FormatDate from "@/utils/FormatDate";
import Animated, { FadeInDown } from "react-native-reanimated";
<<<<<<< HEAD
import { LinearGradient } from "expo-linear-gradient";
=======
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
const SearchCustomerAndAddCustomer = ({
  text,
  id,
}: {
  text: string;
  id: number;
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
<<<<<<< HEAD
    <LinearGradient
      colors={["#168F88", "#006B60", "#4D89A1"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
=======
    <Animated.View style={styles.container}>
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
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
            {id && customerData?.profilePhoto ? (
              <Image
                style={styles.image}
                source={{ uri: customerData?.profilePhoto }}
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
      <Link
        href={{
<<<<<<< HEAD
          pathname: "/pages/parties/addNewParties",
=======
          pathname: "/pages/parties/parties",
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
          params: {
            text: "Add Customer",
          },
        }}
        asChild
      >
        <CustomTouchable
          entering={FadeInDown.delay(100).duration(400).damping(80).springify()}
          style={styles.plusCon}
        >
          <AntDesign name="plus" size={24} color="black" />
        </CustomTouchable>
      </Link>
<<<<<<< HEAD
    </LinearGradient>
=======
    </Animated.View>
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
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
<<<<<<< HEAD
=======
    marginBottom: 10,
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
  },
  inputContainer: {
    backgroundColor: Colors.white,
    flex: 1,
    height: 50,
<<<<<<< HEAD
    borderRadius: radius.small,
=======
    borderRadius: radius.medium,
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
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
<<<<<<< HEAD
    borderRadius: radius.small,
=======
    borderRadius: radius.medium,
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
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
