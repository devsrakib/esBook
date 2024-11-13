/**
 * CustomerView Component
 *
 * This component is responsible for displaying detailed information about a specific customer or supplier,
 * including their transaction history and contact information. The view adapts based on whether the user
 * is viewing a customer or supplier, adjusting the displayed data and actions accordingly.
 *
 * Key Features:
 * - **Profile Information**: Displays the profile photo, name, and an option to view the full profile of the customer or supplier.
 * - **Transaction Data**: Fetches and displays a list of transactions, including details such as the transaction amount,
 *   date, and type (cash sell, balance, due, or extra amounts).
 * - **Reminder**: Allows users to set or view a collection reminder date for a customer.
 * - **Contact Options**: Provides a button to call the customer or supplier directly using the device's phone app.
 * - **Modal for Adding Transactions**: Includes a modal that allows users to record new transactions, either as "You Got" or "You Gave".
 *
 * State Management:
 * - `customerTransaction`: Stores the list of transactions associated with the customer.
 * - `amount`, `description`: Used to capture input values when recording new transactions.
 * - `lendDataById`: Stores specific lend data fetched by customer ID.
 * - `activeTab`: Determines whether the "You Got" or "You Gave" tab is active in the modal.
 * - `isModalVisible`: Controls the visibility of the modal for adding transactions.
 * - `collectionDate`: Holds the reminder date information for collecting amounts due.
 * - `customer`, `supplier`: Stores customer or supplier data fetched by ID.
 *
 * Database Operations:
 * - Fetches data from the SQLite database using functions like `getCustomerById`, `getSupplierById`, and transaction-related methods.
 * - Updates the database when new transactions are recorded via `customer_lend` and `customer_gave`.
 *
 * Usage:
 * This component is used within the application to provide users with a detailed view of customer or supplier
 * interactions, including financial transactions and contact management.
 *
 * Dependencies:
 * - Relies on `expo-sqlite` for database interactions.
 * - Uses `react-native-modal` for the modal implementation.
 * - Uses `expo-router` for navigation between different app screens.
 * - Custom UI components like `Button`, `GoBack`, and `FilterAndTextSection` are used for consistent design and interaction.
 */

import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  TextInput,
  ToastAndroid,
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import FilterAndTextSection from "@/components/UI/parties/filterAndTextSection";
import { Fonts } from "@/constants/Fonts";
import Button from "@/components/UI/Button";
import GoBack from "@/components/UI/header/GoBack";
import {
  customer_gave,
  customer_lend,
  getCashSellsByCustomerId,
  getCollectionReminderByCustomerId,
  getCustomerById,
  getGaveLendById,
  getLendById,
  getSupplierById,
} from "@/databases/Database";
import { useSQLiteContext } from "expo-sqlite";
import Modal from "react-native-modal";
import { radius } from "@/constants/sizes";
import { currency } from "@/global/currency";
import FormatDate from "@/utils/FormatDate";
import getInitials from "@/utils/namePlaceholder";
import CustomerViewModal from "@/components/UI/parties/CustomerViewModal";
import Cart from "./Cart";
import useApiHook from "@/hooks/all_api_hooks";

const CustomerView = () => {
  const { bottom, top } = useSafeAreaInsets();
  const router = useLocalSearchParams<any>();
  const [customerTransaction, setCustomerTransaction] = useState<any>([]);
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [lendDataById, setLendDataById] = useState<any>([]);
  const [activeTab, setActiveTab] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [collectionDate, SetCollectionDate] = useState<any>([]);
  const [customer, setCustomer] = useState<any>();
  const [totalGiveAmount, setTotalGiveAmount] = useState<number>(0);
  const [supplier, setSupplier] = useState<any>([]);
  const formatCollectionDate = new Date(collectionDate?.collectionDate);
  const db = useSQLiteContext();
  const lendData: any = {
    customerId: router?.id,
    amount: amount,
    description: description,
  };
  const { data } = useApiHook(`suppliers/${router?.id}`);
  const getCustomer = async () => {
    if (router?.text === "Supplier") {
      // const supplier = await getSupplierById(db, router?.id);
      const supplier = data;
      console.log(supplier);

      setSupplier(supplier);
    } else if (router?.text === "Customer") {
      const result = await getCustomerById(
        db,
        router?.id || router?.customerId
      );
      setCustomer(result);
    }
  };

  useEffect(() => {
    getCustomer();
  }, []);

  const handleLend = async () => {
    try {
      const result = await customer_lend(db, lendData);
      if (result?.success) {
        ToastAndroid.showWithGravity(
          "success",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        getCustomer();
      }
      setIsModalVisible(false);
    } catch (error) {
      ToastAndroid.showWithGravity(
        "sorry!",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  };

  const handleGave = async () => {
    try {
      const result = await customer_gave(db, lendData);
      if (result?.success) {
        ToastAndroid.showWithGravity(
          "success",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        getCustomer();
      }
      setIsModalVisible(false);
    } catch (error) {
      ToastAndroid.showWithGravity(
        "sorry!",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  };

  useEffect(() => {
    async function getDataById() {
      if (router?.text === "Supplier") {
        const supplier = await getSupplierById(db, router?.id);
        setSupplier(supplier);
      } else {
        const result = await getCashSellsByCustomerId(db, router?.id);
        const lendData = await getLendById(db, router?.id);
        const gaveLand = await getGaveLendById(db, router?.id);
        const collectionReminder: any = await getCollectionReminderByCustomerId(
          db,
          router?.id ? router?.id : customer?.id
        );

        const gaveLandAmount = gaveLand?.reduce(
          (sum: number, record: any) => sum + record?.amount,
          0
        );
        const customerExtraAmount: any = result?.reduce(
          (sum: number, record: any) => sum + record?.extraAmount,
          0
        );
        setTotalGiveAmount(gaveLandAmount + customerExtraAmount);
        setLendDataById(lendData.concat(gaveLand));
        setCustomerTransaction(result);
        SetCollectionDate(collectionReminder[0]);
      }
    }
    getDataById();
  }, []);

  const interleaveArrays = (array1: any[], array2: any[]) => {
    const result = [];
    const maxLength = Math.max(array1?.length, array2?.length);

    for (let i = 0; i < maxLength; i++) {
      if (i < array1?.length) result.push(array1[i]);
      if (i < array2?.length) result.push(array2[i]);
    }

    return result;
  };

  const concatLendDataAndCustomerData = useMemo(
    () => interleaveArrays(customerTransaction, lendDataById),
    [customerTransaction, lendDataById]
  );

  const handlePress = useCallback(() => {
    const phoneNumber = `tel:+88${
      router?.phoneNumber || customer?.phoneNumber
    }`;
    Linking.openURL(phoneNumber);
  }, [router?.phoneNumber, customer?.phoneNumber]);

  console.log(isModalVisible);

  return (
    <View
      style={[styles.container, { paddingBottom: bottom, paddingTop: top }]}
    >
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
          animationDuration: 100,
        }}
      />
      <View style={styles.header}>
        <GoBack color={Colors.white} />
        <Link
          href={{
            pathname: "/pages/profile/profile",
            params: router,
          }}
          asChild
        >
          <TouchableOpacity style={styles.headerImageAndTextCon}>
            {router?.profile || customer?.profilePhoto ? (
              <Image
                style={styles.userImage}
                source={{ uri: router?.profile || customer?.profilePhoto }}
              />
            ) : (
              <View style={styles.placeholder}>
                <Text style={styles.placeholderText}>
                  {getInitials(router?.name || customer?.name)}
                </Text>
              </View>
            )}
            <View>
              <Text style={styles.headerText}>
                {router?.name || customer?.name}
              </Text>
              <Text style={styles.viewProfile}>View Profile</Text>
            </View>
          </TouchableOpacity>
        </Link>
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
            <View style={styles.cardSubtitleContainer}>
              <Text style={styles.cardSubtitle}>{router?.text}</Text>
            </View>
          </View>
          <Text style={styles.amount}>
            {currency} {totalGiveAmount?.toLocaleString("en-US")}
          </Text>
          {collectionDate &&
          collectionDate?.collectionDate &&
          router.text === "Customer" ? (
            <View style={styles.reminderButton}>
              <Ionicons name="calendar-outline" size={16} color="black" />
              <Text style={styles.reminderText}>
                {FormatDate(formatCollectionDate)}
              </Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.reminderButton}>
              <Ionicons name="calendar-outline" size={16} color="black" />
              <Text style={styles.reminderText}>Set Collection Reminder</Text>
            </TouchableOpacity>
          )}
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
          {concatLendDataAndCustomerData?.map(
            (transaction: any, index: number) => (
              <Cart transaction={transaction} key={index} />
            )
          )}
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <Button
          title="You got"
          bg={Colors.green}
          width={"48%"}
          radius={50}
          titleColor={Colors.white}
          onPress={() => {
            setIsModalVisible(true);
            setActiveTab("youGot");
          }}
        />
        <Button
          title="You gave"
          bg={Colors.red}
          width={"48%"}
          radius={50}
          titleColor={Colors.white}
          onPress={() => {
            setIsModalVisible(true);
            setActiveTab("youGave");
          }}
        />
      </View>
      <CustomerViewModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        handleLend={handleLend}
        handleGave={handleGave}
        setAmount={setAmount}
        activeTab={activeTab}
        setDescription={setDescription}
      />
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
    gap: 10,
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
  cardSubtitleContainer: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.small,
    backgroundColor: Colors.VeroneseGreen,
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

  placeholder: {
    width: 36,
    height: 36,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    fontSize: Fonts.medium,
    fontWeight: "500",
    color: Colors.white,
  },
});

export default CustomerView;
