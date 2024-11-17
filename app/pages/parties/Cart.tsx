import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { currency } from "@/global/currency";
import FormatDate from "@/utils/FormatDate";

const Cart = ({ transaction }: any) => {
  return (
    <View style={styles.transactionCard}>
      <Text style={styles.transactionTitle}>{transaction?.description}</Text>
      <View
        style={[
          styles.badge,
          {
            backgroundColor: transaction?.dueAmount
              ? Colors.red
              : transaction?.extraAmount
              ? Colors.green
              : "transparent",
          },
        ]}
      >
        <Text style={styles.badgeText}>
          {transaction?.dueAmount
            ? "due"
            : transaction?.extraAmount
            ? "extra"
            : null}
        </Text>
      </View>
      <Text style={styles.transactionType}>
        {transaction?.saleAmount ? "Cash sell: " : "Bal : "}
        {transaction?.saleAmount || transaction?.amount || "N/A"}{" "}
        {/* Provide a default value */}
      </Text>

      <View style={styles.amountCon}>
        <Text style={styles.transactionDate}>
          {FormatDate(transaction?.createdAt) || "Date not available"}
        </Text>
        <Text
          style={[
            styles.transactionAmount,
            {
              color: transaction?.dueAmount
                ? Colors.red
                : transaction?.extraAmount
                ? Colors.red
                : Colors.green,
            }, // Default color
          ]}
        >
          {currency}{" "}
          {(
            transaction?.dueAmount ||
            transaction?.amount ||
            transaction?.extraAmount
          )?.toLocaleString("en-US") || "0"}{" "}
          {/* Provide a default value */}
        </Text>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  transactionCard: {
    backgroundColor: Colors.lavender,
    padding: 16,
    borderRadius: 10,
    marginVertical: 8,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
  },
  transactionType: {
    fontSize: 14,
    color: Colors.green,
    fontWeight: "500",
  },
  transactionDate: {
    fontSize: 12,
    color: Colors.text,
  },
  amountCon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  badge: {
    width: 46,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    right: 0,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  badgeText: {
    fontSize: Fonts.regular,
    color: Colors.white,
  },
});
