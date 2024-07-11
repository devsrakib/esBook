import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { radius } from "@/constants/sizes";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { currency } from "@/global/currency";
import { useSQLiteContext } from "expo-sqlite";
import { getCustomerById } from "@/databases/Database";
import { Link } from "expo-router";

const ReportCart = ({ item, text }: any) => {
  console.log(item);
  const [customer, setCustomer] = useState<any>({});
  const db = useSQLiteContext();

  console.log(text, "==============");

  useEffect(() => {
    async function getCustomer() {
      try {
        const customer = await getCustomerById(db, item?.customerId);
        if (customer) {
          setCustomer(customer);
        } else {
          console.log("No customer found with this ID.");
        }
      } catch (error) {
        console.error("Error fetching customer:", error);
      }
    }
    if (item?.customerId) {
      getCustomer();
    }
  }, [db, item?.customerId]);

  console.log(item?.dueAmount, ":::::::");

  return (
    <View style={styles.container}>
      <View style={styles.textAndTimeCon}>
        <View style={styles.dateCon}>
          <Text
            style={[
              styles.title,
              {
                color:
                  text === "cash sell"
                    ? Colors.green
                    : text === "Due"
                    ? Colors.red
                    : "",
              },
            ]}
          >
            {text}
          </Text>
          <Text style={styles.divider}>|</Text>
          <Text style={styles.time}>12:20 PM</Text>
        </View>
        {text === "Due" ? (
          <Link
            href={{
              pathname: "pages/cashbox/details",
              params: {
                id: item?.customerId,
                text: text,
              },
            }}
            asChild
          >
            <TouchableOpacity>
              <Text>Collect</Text>
            </TouchableOpacity>
          </Link>
        ) : (
          <Text style={styles.amount}>
            {currency}
            {text === "Due" && item?.dueAmount
              ? item?.dueAmount
              : text === "cash sell" && item?.saleAmount}
          </Text>
        )}
      </View>
      <Text style={[styles.dummyText]}>{item?.description}</Text>
      <View>
        <View style={styles.bottomSection}>
          <Image style={styles.img} />
          <Text style={styles.name}>{customer?.name}</Text>
          <Text style={styles.amountText}>
            {text === "cash sell"
              ? "collection"
              : text === "Due"
              ? "Amount"
              : "buy amount"}
            :{" "}
            <Text
              style={{
                color:
                  text === "cash sell"
                    ? Colors.green
                    : text === "Due"
                    ? Colors.red
                    : null,
                fontWeight: "600",
                fontSize: Fonts.medium,
              }}
            >
              {item?.collectedAmount}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: radius.regular,
    borderColor: Colors.border,
    paddingTop: 12,
    width: "90%",
    alignSelf: "center",
    rowGap: 10,
  },
  dateCon: {
    flexDirection: "row",
    gap: 10,
  },
  textAndTimeCon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingLeft: 10,
    paddingRight: 20,
    justifyContent: "space-between",
  },
  title: {
    fontSize: Fonts.medium,
    fontWeight: "600",
    color: Colors.red,
  },
  divider: {
    color: Colors.text,
  },
  time: {
    fontSize: Fonts.regular,
    color: Colors.text,
  },
  dummyText: {
    fontSize: Fonts.regular,
    color: Colors.text,
    marginHorizontal: 10,
    lineHeight: 22,
  },
  bottomSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    backgroundColor: Colors.background2,
    borderBottomLeftRadius: radius.regular,
    borderBottomRightRadius: radius.regular,
    paddingHorizontal: 20,
    height: 40,
  },
  img: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  name: {
    flex: 1,
    fontSize: Fonts.regular,
    fontWeight: "600",
  },
  amountText: {
    color: Colors.text,
  },
  amount: {
    fontSize: Fonts.medium,
    fontWeight: "600",
  },
});
export default ReportCart;
