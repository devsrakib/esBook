import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { radius } from "@/constants/sizes";
import { Colors } from "@/constants/Colors";
import { Fontisto } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@/constants/Fonts";
import Divider from "./Divider";
import { FontAwesome6 } from "@expo/vector-icons";
import { Link } from "expo-router";
import Filter from "./parties/filter";
import Customers from "./shared/Customers";
import { getCustomers, getSuppliers } from "@/databases/Database";
import { useSQLiteContext } from "expo-sqlite";
const tab: [string, string] = ["Customers", "Suppliers"];

interface propsTypes {
  bg: string;
}
const CustomerAndSupplierList: React.FC<propsTypes> = ({ bg }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [customer, setCustomer] = useState<any>([]);
  const [supplier, setSupplier] = useState<any>([]);

  const db = useSQLiteContext();

  useEffect(() => {
    async function getCustomer() {
      const result = await getCustomers(db);
      const supplier = await getSuppliers(db);
      setCustomer(result);
      setSupplier(supplier);
    }
    getCustomer();
  }, []);

  const handleIndexChange = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <View style={styles.container}>
      {/* segments tabs */}
      <View style={styles.segments}>
        <View style={styles.segmentCon}>
          {tab?.map((t: any, index: number) => {
            return (
              <TouchableOpacity
                style={[
                  styles.tabsContainer,
                  {
                    backgroundColor:
                      selectedIndex === index ? Colors.mainColor : Colors.white,
                    borderColor:
                      selectedIndex === index ? Colors.white : Colors.border,
                  },
                ]}
                onPress={() => {
                  handleIndexChange(index);
                }}
                key={index}
              >
                <Text
                  style={[
                    {
                      color:
                        selectedIndex === index ? Colors.white : Colors.text,
                    },
                  ]}
                >
                  {t}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Filter />
      </View>
      {/* customer list */}
      <View style={styles.usersCon}>
        <View style={styles.topSection}>
          <Text style={styles.giveAndReceiveText}>
            Will Receive / <Text style={{ color: Colors.red }}>Will Give</Text>
          </Text>
          <View style={styles.messageAndCustomerCon}>
            <Link href="/pages/Collection/collection" asChild>
              <TouchableOpacity style={styles.message}>
                <Image
                  style={styles.messageIcon}
                  resizeMode="contain"
                  source={require("../../assets/images/message.png")}
                />
              </TouchableOpacity>
            </Link>
            <Link href="/pages/parties/addNewParties" asChild>
              <TouchableOpacity style={styles.addCustomer}>
                <Fontisto name="plus-a" size={14} color={Colors.text} />
                <Text style={styles.customerText}>Customer</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
        {selectedIndex === 0 ? (
          <FlatList
            data={customer}
            renderItem={({ item }) => {
              return <Customers item={item} text={"Customer"} />;
            }}
          />
        ) : (
          <FlatList
            data={supplier}
            renderItem={({ item }) => {
              return <Customers item={item} text={"Supplier"} />;
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: radius.regular,
  },
  segments: {
    backgroundColor: Colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  segmentCon: {
    width: "30%",
    flexDirection: "row",
    gap: 10,
  },
  tabsContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.small,
    borderWidth: 1,
  },

  activeTabStyle: {
    backgroundColor: "#007AFF",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },

  usersCon: {
    backgroundColor: Colors.background,
    marginVertical: 16,
    padding: 16,
    borderRadius: radius.large,
    marginTop: 10,
  },
  giveAndReceiveText: {
    fontSize: Fonts.regular,
    color: Colors.green,
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  messageAndCustomerCon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  message: {
    width: 36,
    height: 36,
    borderRadius: 20,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    padding: 8,
    backgroundColor: Colors.white,
  },
  messageIcon: { width: "100%", height: "100%" },
  addCustomer: {
    borderRadius: radius.xxxl,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: "row",
    gap: 10,
    backgroundColor: Colors.white,
    paddingVertical: 7,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  customerText: {
    color: Colors.text,
    fontSize: Fonts.regular,
  },
});

export default CustomerAndSupplierList;
