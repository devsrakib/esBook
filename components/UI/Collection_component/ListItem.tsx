// ListItem.js
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { collection_reminder, getCustomerById } from "@/databases/Database";
import { useSQLiteContext } from "expo-sqlite";
import { currency } from "@/global/currency";
import { Link } from "expo-router";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import FormatDate from "@/utils/FormatDate";

const ListItem = ({ text, item }: { text: string; item: any }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [customer, setCustomer] = useState<any>();
  const [error, setError] = useState<string | undefined>("");
  const [show, setShow] = useState<boolean>(false);
  const db = useSQLiteContext();

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

  const handleDateChange = async (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    const currentDate = selectedDate || date;
    console.log(currentDate);

    setShow(false);
    setDate(currentDate);

    const reminderData: any = {
      customerId: String(item?.customerId),
      amount: item?.dueAmount,
      collectionDate: String(currentDate),
    };
    const result = await collection_reminder(db, reminderData);
    setModalVisible(false);
    setError(result?.message);
    console.log(reminderData, "::::::::");
    console.log(result, ":::: result ::::");
  };

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      `${error}`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  useEffect(() => {
    if (error) {
      showToastWithGravity();
    }
  }, [error]);

  console.log(text, ":::::::::::");

  return (
    <Link
      href={{
        pathname: "/pages/parties/CustomerView",
        params: {
          id: item?.customerId,
          text: "Customer",
        },
      }}
      asChild
    >
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
                <Text style={styles.date}> Added {item?.collectionDate}</Text>
              </>
            ) : (
              <TouchableOpacity
                onPress={() => setShow(!show)}
                style={styles.calenderCon}
              >
                <AntDesign name="calendar" size={14} color={Colors.text} />
                <Text style={styles.date}>
                  {date ? FormatDate(date) : "Set Date"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* <DatePicker
          background={Colors.white}
          iconSite={"left"}
          iconColor={Colors.text}
          iconSize={24}
        /> */}
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        )}
      </TouchableOpacity>
    </Link>
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
