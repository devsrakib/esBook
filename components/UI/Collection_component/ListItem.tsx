// ListItem.js
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import Button from "../Button";
import CustomDatePicker from "../CustomDatePicker";
import { collection_reminder, getCustomerById } from "@/databases/Database";
import { useSQLiteContext } from "expo-sqlite";
import { currency } from "@/global/currency";

const ListItem = ({ text, item }: { text: string; item: any }) => {
  const [date, setDate] = useState({ dd: "", mm: "", yyyy: "" });
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [customer, setCustomer] = useState<any>();
  const [currentDate, setCurrentDate] = useState<string>("");
  const [data, setData] = useState<any>();
  const db = useSQLiteContext();

  useEffect(() => {
    const getCurrentDateAsString = () => {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
      const yyyy = today.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    };

    setCurrentDate(getCurrentDateAsString());

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

  const handleSave = async () => {
    const reminderData: any = {
      customerId: String(item?.customerId),
      collectionDate: currentDate,
      amount: item?.dueAmount,
    };
    await collection_reminder(db, reminderData);
    setModalVisible(false);
    console.log(reminderData, ":::::::::");
  };
  // handleSave();
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.profileContainer}>
        {customer?.profilePhoto ? (
          <Image
            source={{ uri: customer?.profilePhoto }}
            style={styles.profileImage}
          />
        ) : (
          <View style={styles.profilePlaceholder}>
            <Text style={styles.profileInitials}>
              {customer?.name?.slice(0, 1)}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{customer?.name}</Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.amount}>
          {currency}
          {item?.dueAmount || item?.amount}
        </Text>
        <View style={styles.iconContainer}>
          {text === "date" ? (
            <>
              <AntDesign name="checkcircle" size={12} color={Colors.green} />
              <Text style={styles.date}> Added {"14/07/2024"}</Text>
            </>
          ) : (
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={styles.calenderCon}
            >
              <AntDesign name="calendar" size={14} color={Colors.text} />
              <Text style={styles.date}>{"Set Date"}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <CustomDatePicker
        date={date}
        setDate={setDate}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleSave={handleSave}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  profileContainer: {
    marginRight: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profilePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitials: {
    color: "white",
    fontSize: 18,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  dateContainer: {
    alignItems: "center",
    gap: 5,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
    flexDirection: "row",
    gap: 10,
  },
  checkIcon: {
    width: 10,
    height: 10,
    backgroundColor: "green",
    borderRadius: 5,
  },
  date: {
    color: Colors.text,
    fontSize: Fonts.small,
  },
  amount: {
    fontSize: Fonts.regular,
    fontWeight: "bold",
    color: Colors.green,
  },
  calenderCon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 4,
  },
  label: {
    fontSize: 18,
    marginVertical: 5,
  },
  button: {
    backgroundColor: Colors.mainColor,
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default ListItem;
