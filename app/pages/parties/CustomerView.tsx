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
  const db = useSQLiteContext();
  const lendData: any = {
    customerId: router?.id,
    amount: amount,
    description: description,
  };
  const handleLend = async () => {
    try {
      await customer_lend(db, lendData);
    } catch (error) {
      console.error("Error lending amount:", error);
    }
  };
  const handleGave = async () => {
    try {
      await customer_gave(db, lendData);
    } catch (error) {
      console.error("Error giving amount:", error);
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

  const concatLendDataAndCustomerData = useMemo(
    () => customerTransaction.concat(lendDataById),
    [customerTransaction, lendDataById]
  );

  const handlePress = useCallback(() => {
    const phoneNumber = `tel:+88${
      router?.phoneNumber || customer?.phoneNumber
    }`;
    Linking.openURL(phoneNumber);
  }, [router?.phoneNumber, customer?.phoneNumber]);

  useEffect(() => {
    const getCustomer = async () => {
      if (router?.text === "Supplier") {
        const supplier = await getSupplierById(db, router?.id);
        setSupplier(supplier);
      } else if (router?.text === "Customer") {
        const result = await getCustomerById(
          db,
          router?.id || router?.customerId
        );
        setCustomer(result);
      }
    };
    getCustomer();
  }, []);

  const formatCollectionDate = new Date(collectionDate?.collectionDate);

  return (
    <View
      style={[styles.container, { paddingBottom: bottom, paddingTop: top }]}
    >
      <Stack.Screen options={{ headerShown: false }} />
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
              <View key={index} style={styles.transactionCard}>
                <Text style={styles.transactionTitle}>
                  By Transfer for my Paypal Account
                </Text>
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
                    {transaction?.createdAt || "Date not available"}
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
      <Modal isVisible={isModalVisible} style={styles.modal}>
        <View style={styles.modalCon}>
          <View style={styles.textAndCloseCon}>
            <Text style={styles.lendText}>You Gave</Text>
            <AntDesign
              name="close"
              size={24}
              color="black"
              onPress={() => setIsModalVisible(false)}
            />
          </View>
          <TextInput
            onChangeText={(e: any) => setAmount(e)}
            style={styles.amountInput}
            placeholder="Type Amount"
          />
          <TextInput
            onChangeText={(e) => setDescription(e)}
            style={styles.textArea}
            placeholder="Description"
          />
          {activeTab === "youGot" ? (
            <Button
              bg={Colors.green}
              title="Save"
              titleColor={Colors.white}
              radius={radius.regular}
              width={"100%"}
              onPress={() => handleLend()}
            />
          ) : (
            <Button
              bg={Colors.red}
              title="Save"
              titleColor={Colors.white}
              radius={radius.regular}
              width={"100%"}
              onPress={() => handleGave()}
            />
          )}
        </View>
      </Modal>
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
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalCon: {
    height: 350,
    width: "100%",
    backgroundColor: Colors.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
    gap: 20,
  },
  textAndCloseCon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lendText: {
    fontSize: Fonts.large,
    fontWeight: "500",
  },
  amountInput: {
    height: 50,
    width: "100%",
    borderRadius: radius.regular,
    borderColor: Colors.border,
    paddingHorizontal: 10,
    fontSize: Fonts.medium,
    borderWidth: 1,
  },
  textArea: {
    width: "100%",
    borderRadius: radius.regular,
    borderColor: Colors.border,
    paddingHorizontal: 10,
    fontSize: Fonts.medium,
    borderWidth: 1,
    height: 100,
    textAlignVertical: "top",
    paddingTop: 10,
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
