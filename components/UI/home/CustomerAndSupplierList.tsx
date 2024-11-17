import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { Fragment, useEffect, useState, useCallback } from "react";
import { radius } from "@/constants/sizes";
import { Colors } from "@/constants/Colors";
import { FontAwesome5, Fontisto, MaterialIcons } from "@expo/vector-icons";
import { Fonts } from "@/constants/Fonts";
import { Link } from "expo-router";
import Customers from "../shared/Customers";
import { getCustomers, getSuppliers } from "@/databases/Database";
import { useSQLiteContext } from "expo-sqlite";
import Empty from "../Empty";
import { debounce } from "lodash";
import CustomSegment from "./CustomSegment";
import Divider from "../Divider";
import useApiHook from "@/hooks/all_api_hooks";

export type tab_props = {
  label: string;
  icon: any;
};

const CustomerAndSupplierList = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  // const [customer, setCustomer] = useState<any>([]);
  // const [supplier, setSupplier] = useState<any>([]);

  const { data: customer } = useApiHook("customers/");
  const { data: supplier } = useApiHook("suppliers/");

  const db = useSQLiteContext();

  const tab: tab_props[] = [
    {
      label: "Customers",
      icon: <MaterialIcons name="sell" size={18} color={Colors.white} />,
    },
    {
      label: "Suppliers",
      icon: (
        <MaterialIcons name="add-business" size={18} color={Colors.white} />
      ),
    },
  ];

  // useEffect(() => {
  //   async function getCustomer() {
  //     const result = await getCustomers(db);
  //     const supplier = await getSuppliers(db);
  //     setCustomer(result);
  //     setSupplier(supplier);
  //   }
  //   getCustomer();
  // }, []);

  const handleIndexChange = useCallback(
    debounce((index: number) => {
      setSelectedIndex(index);
    }, 100), // adjust debounce timing as needed
    []
  );

  return (
    <View style={styles.container}>
      {/* segments tabs */}

      {/* customer list */}
      <View style={styles.usersCon}>
        <CustomSegment
          tab={tab}
          handleIndexChange={handleIndexChange}
          setSelectedIndex={setSelectedIndex}
          selectedIndex={selectedIndex}
        />
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
                  source={require("../../../assets/images/message.png")}
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
        <Divider height={1} width={"100%"} aligns={"center"} />

        {
          <View style={styles.customerList}>
            <FlatList
              contentContainerStyle={{
                paddingTop: 20,
                flexGrow: 1,
              }}
              data={selectedIndex === 0 ? customer?.data : supplier?.data}
              renderItem={({ item, index }) => {
                return (
                  <Customers
                    item={item}
                    index={index}
                    text={selectedIndex === 0 ? "Customer" : "Supplier"}
                    selectedIndex={selectedIndex}
                    deleteFrom={"index"}
                  />
                );
              }}
              ListEmptyComponent={
                <Empty
                  text={`No ${selectedIndex === 0 ? "customer" : "supplier"}`}
                  icon={
                    <FontAwesome5
                      name="user-alt-slash"
                      size={40}
                      color={Colors.text}
                    />
                  }
                />
              }
              // style={{ flex: 1 }}
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item?.id?.toString()}
            />
          </View>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: radius.regular,
    // backgroundColor: Colors.white,
  },

  content: {
    alignItems: "center",
    justifyContent: "center",
  },

  usersCon: {
    // backgroundColor: Colors.VeroneseGreen,
    backgroundColor: Colors.white,
    shadowColor: Colors.shadow,
    elevation: 10,
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
  customerList: {
    height: 300,
  },
  customerText: {
    color: Colors.text,
    fontSize: Fonts.regular,
  },
});

export default CustomerAndSupplierList;
