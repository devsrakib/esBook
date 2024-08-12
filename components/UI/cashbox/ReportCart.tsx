import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { radius } from "@/constants/sizes";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { currency } from "@/global/currency";
import { useSQLiteContext } from "expo-sqlite";
import {
  getCashBuyBySupplierId,
  getCustomerById,
  getSupplierById,
} from "@/databases/Database";
import { Link } from "expo-router";
import FormatDate from "@/utils/FormatDate";

const ReportCart = ({ item, text }: any) => {
  const [customer, setCustomer] = useState<any>({});
  const [supplier, setSupplier] = useState<any>({});
  const db = useSQLiteContext();

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const customerData = await getCustomerById(db, item?.customerId);
        setCustomer(customerData || {});
        if (!customerData) {
          console.log("No customer found with this ID.");
        }
      } catch (error) {
        console.error("Error fetching customer:", error);
      }
    };

    if (item?.customerId) {
      fetchCustomer();
    }
  }, [db, item?.customerId]);

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const supplierData = await getSupplierById(db, item?.supplierId);
        setSupplier(supplierData || {});
        if (!supplierData) {
          console.log("No supplier found with this ID.");
        }
      } catch (error) {
        console.error("Error fetching supplier:", error);
      }
    };

    if (item?.supplierId) {
      fetchSupplier();
    }
  }, [db, item?.supplierId]);

  console.log(item?.dueAmount, text);

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
                    : text === "cash buy"
                    ? Colors.red
                    : "",
              },
            ]}
          >
            {text}
          </Text>
          <Text style={styles.divider}>|</Text>
          <Text style={styles.time}>{FormatDate(item?.createdAt)}</Text>
        </View>
        {text === "Due" ? (
          <Link
            href={{
              pathname: "pages/cashbox/details",
              params: {
                id: item?.id,
                text: text,
                customerId: item?.customerId,
                dueAmount: `due ${item?.dueAmount}`,
                data: "::::::",
              },
            }}
            asChild
          >
            <TouchableOpacity style={styles.collectButton}>
              <Text style={styles.buttonText}>Collect</Text>
            </TouchableOpacity>
          </Link>
        ) : (
          <Text style={styles.amount}>
            {currency}{" "}
            {text === "Due" && item?.dueAmount > 0
              ? item?.dueAmount
              : text === "cash buy"
              ? item?.amount
              : text === "cash sell" && item?.saleAmount}
          </Text>
        )}
      </View>
      <Text style={styles.dummyText}>{item?.description}</Text>
      <View>
        <View style={styles.bottomSection}>
          <Image
            style={styles.img}
            source={{ uri: customer?.profilePhoto || supplier?.profilePhoto }}
          />
          <Text style={styles.name}>{customer?.name || supplier?.name}</Text>
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
                    : text === "cash buy"
                    ? Colors.red
                    : "",
                fontWeight: "600",
                fontSize: Fonts.medium,
              }}
            >
              {currency}{" "}
              {text === "Due" && item?.dueAmount > 0
                ? item?.dueAmount
                : text === "cash buy"
                ? item?.dueAmount
                : text === "cash sell" && item?.collectedAmount}
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
  collectButton: {
    backgroundColor: Colors.mainColor,
    width: 55,
    height: 25,
    borderRadius: radius.small,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: Colors.white,
  },
});

export default ReportCart;
