import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { Fragment, useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { radius } from "@/constants/sizes";
import { Fonts } from "@/constants/Fonts";
import { Link } from "expo-router";
import { getCustomerById, getSupplierById } from "@/databases/Database";
import { useSQLiteContext } from "expo-sqlite";
import FormatDate from "@/utils/FormatDate";
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

  return (
    <View style={styles.container}>
      <Link
        href={{
          pathname: path,
        }}
        asChild
      >
        <TouchableOpacity style={styles.inputContainer}>
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
        </TouchableOpacity>
      </Link>
      <Link
        href={{
          pathname: "/pages/parties/parties",
          params: {
            text: "Add Customer",
          },
        }}
        asChild
      >
        <TouchableOpacity style={styles.plusCon}>
          <AntDesign name="plus" size={24} color="black" />
        </TouchableOpacity>
      </Link>
    </View>
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
    marginBottom: 10,
  },
  inputContainer: {
    backgroundColor: Colors.white,
    flex: 1,
    height: 50,
    borderRadius: radius.medium,
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
    borderRadius: radius.medium,
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
export default SearchCustomerAndAddCustomer;
