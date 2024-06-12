import React, { Fragment } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import FilterAndTextSection from "@/components/UI/parties/filterAndTextSection";
import { Fonts } from "@/constants/Fonts";
import Button from "@/components/UI/Button";

const CustomerView = () => {
  const { bottom, top } = useSafeAreaInsets();

  const transactions = [
    {
      type: "Cash Sale",
      amount: "$20,000",
      date: "3 Jun,2024 - 10:42 AM",
      balance: "$20,000",
      status: "Due",
      dueAmount: "$12,000",
      textColor: "green",
    },
    {
      type: "Bal",
      amount: "$20,000",
      date: "3 Jun,2024 - 10:42 AM",
      balance: "$20,000",
      status: "Due",
      dueAmount: "$20,000",
      textColor: "red",
    },
    {
      type: "Cash Sale",
      amount: "$20,000",
      date: "3 Jun,2024 - 10:42 AM",
      balance: "$20,000",
      status: "Paid",
      dueAmount: "$0.00",
      textColor: "black",
    },
    {
      type: "Bal",
      amount: "$20,000",
      date: "3 Jun,2024 - 10:42 AM",
      balance: "$20,000",
      status: "Due",
      dueAmount: "$20,000",
      textColor: "green",
    },
    {
      type: "Cash Sale",
      amount: "$20,000",
      date: "3 Jun,2024 - 10:42 AM",
      balance: "$20,000",
      status: "Extra Paid",
      dueAmount: "$10,000",
      textColor: "red",
    },
  ];

  const handlePress = () => {
    const phoneNumber = "tel:+8801601113299";
    Linking.openURL(phoneNumber);
  };

  return (
    <View
      style={[styles.container, { paddingBottom: bottom, paddingTop: top }]}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color={Colors.white} />
        <View style={styles.headerImageAndTextCon}>
          <Image style={styles.userImage} />
          <View>
            <Text style={styles.headerText}>Mehedi Hasan</Text>
            <Text style={styles.viewProfile}>View Profile</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            handlePress();
          }}
          style={styles.call}
        >
          <Ionicons name="call-outline" size={20} color={Colors.mainColor} />
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>You Will Give</Text>
            <Text style={styles.cardSubtitle}>Customer</Text>
          </View>
          <Text style={styles.amount}>$1,500</Text>
          <TouchableOpacity style={styles.reminderButton}>
            <Ionicons name="calendar-outline" size={16} color="black" />
            <Text style={styles.reminderText}>Set Collection Reminder</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 50,
            paddingHorizontal: 20,
          }}
        >
          <FilterAndTextSection />
          {transactions.map((transaction, index) => (
            <View key={index} style={styles.transactionCard}>
              <Text style={styles.transactionTitle}>
                By Transfer for my Paypal Account
              </Text>
              <Text style={styles.transactionType}>
                {transaction.type} : {transaction.amount}
              </Text>

              <View style={styles.amountCon}>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
                <Text
                  style={[
                    styles.transactionAmount,
                    { color: transaction.textColor },
                  ]}
                >
                  {transaction.dueAmount}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <Button
          title="You gave"
          bg={Colors.green}
          width={"48%"}
          radius={50}
          titleColor={Colors.white}
        />
        <Button
          title="You gave"
          bg={Colors.red}
          width={"48%"}
          radius={50}
          titleColor={Colors.white}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.mainColor,
    padding: 16,
    gap: 20,
  },
  headerImageAndTextCon: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    flex: 1,
  },
  userImage: {
    width: 32,
    height: 32,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  headerText: {
    color: Colors.white,
    fontSize: Fonts.medium,
    fontWeight: "500",
  },
  viewProfile: {
    fontSize: Fonts.regular,
    color: Colors.white,
    marginTop: 5,
  },
  call: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    borderRadius: 50,
  },
  profileContainer: {
    alignItems: "center",
    backgroundColor: Colors.mainColor,
    paddingBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  profileName: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "bold",
  },
  profileSubtitle: {
    color: Colors.white,
    fontSize: 14,
  },
  card: {
    backgroundColor: Colors.white,
    margin: 16,
    padding: 16,
    borderRadius: 10,
    width: "90%",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "green",
  },
  amount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "red",
    marginVertical: 8,
  },
  reminderButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  reminderText: {
    fontSize: 14,
    marginLeft: 4,
  },
  transactionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  transactionsTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterText: {
    fontSize: 14,
    marginLeft: 4,
  },
  // transactionsContainer: {
  //   paddingHorizontal: 16,
  // },
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
    color: Colors.text,
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
  transactionBalance: {
    fontSize: 12,
    color: Colors.text,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    elevation: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  footerButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "green",
    marginHorizontal: 8,
  },
  footerButtonRed: {
    backgroundColor: "red",
  },
  footerButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomerView;
