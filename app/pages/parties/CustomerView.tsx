import React, { Fragment, useEffect, useState } from "react";
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
import { Stack, useLocalSearchParams } from "expo-router";
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
  getLendById,
} from "@/databases/Database";
import { useSQLiteContext } from "expo-sqlite";
import Modal from "react-native-modal";
import { radius } from "@/constants/sizes";

const CustomerView = () => {
  const { bottom, top } = useSafeAreaInsets();
  const router = useLocalSearchParams<any>();
  const [customerTransaction, setCustomerTransaction] = useState<any>([]);
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [lendDataById, setLendDataById] = useState<any>([]);
  const [activeTab, setActiveTab] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const db = useSQLiteContext();
  const lendData: any = {
    customerId: router?.id,
    amount: amount,
    description: description,
  };
  const handleLend = async () => {
    await customer_lend(db, lendData);
    console.log(lendData);
  };
  const handleGave = async () => {
    await customer_gave(db, lendData);
    console.log(lendData);
  };

  useEffect(() => {
    async function getDataById() {
      const result = await getCashSellsByCustomerId(db, router?.id);
      const lendData = await getLendById(db, router?.id);
      setLendDataById(lendData);
      setCustomerTransaction(result);
    }
    getDataById();
  }, []);

  const concatLendDataAndCustomerData =
    customerTransaction.concat(lendDataById);

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
        <GoBack color={Colors.white} />
        <View style={styles.headerImageAndTextCon}>
          <Image style={styles.userImage} />
          <View>
            <Text style={styles.headerText}>{router?.name}</Text>
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
          {concatLendDataAndCustomerData.map(
            (transaction: any, index: number) => (
              <View key={index} style={styles.transactionCard}>
                <Text style={styles.transactionTitle}>
                  By Transfer for my Paypal Account
                </Text>
                <Text style={styles.transactionType}>
                  {transaction?.saleAmount ? "Cash sell" : "Bal"} :{" "}
                  {transaction.saleAmount || transaction?.amount}
                </Text>

                <View style={styles.amountCon}>
                  <Text style={styles.transactionDate}>
                    {transaction?.createdAt}
                  </Text>
                  <Text
                    style={[
                      styles.transactionAmount,
                      { color: transaction.textColor },
                    ]}
                  >
                    {transaction?.dueAmount || transaction?.amount}
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
});

export default CustomerView;
