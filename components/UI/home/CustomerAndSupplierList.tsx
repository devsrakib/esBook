import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { radius } from "@/constants/sizes";
import { Colors } from "@/constants/Colors";
import { Entypo, FontAwesome, FontAwesome5, Fontisto, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Fonts } from "@/constants/Fonts";
import { Link } from "expo-router";
import Customers from "../Customers";
import { getCustomers, getSuppliers } from "@/databases/Database";
import { useSQLiteContext } from "expo-sqlite";
import Empty from "../Empty";
import CustomSegment from "./CustomSegment";
import Divider from "../Divider";
import useApiHook from "@/hooks/all_api_hooks";
import { debounce } from "lodash";
import CustomLoader from "../CustomLoader";
import { Customer, CustomerResponse, CustomerState } from "@/types/customer";
import { Supplier, SupplierResponse } from "@/types/supplier";

export type TabProps = {
  label: string;
  icon: any;
};

interface Props {
  bg?: string;
  customers: CustomerResponse | null,
  customerLoader: boolean;
  customerError: any;
  suppliers: SupplierResponse;
  supplierError: any;
  supplierLoader: boolean;
}



const CustomerAndSupplierList: React.FC<Props> = ({ bg, customers, customerLoader, customerError, suppliers, supplierError, supplierLoader }: Props) => {

  console.log();


  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [customer, setCustomer] = useState<any>([]);
  const [supplier, setSupplier] = useState<any>([]);

  // Tabs definition
  const tab: TabProps[] = [
    {
      label: "Customers",
      icon: <FontAwesome name="user" size={18} color={Colors.white} />,
    },
    {
      label: "Suppliers",
      icon: (
        <FontAwesome name="handshake-o" size={18} color={Colors.white} />
      ),
    },
  ];

  // Fetch from SQLite as a fallback or for offline data

  // Debounced index change handler
  const handleIndexChange = useCallback(
    debounce((index: number) => {
      setSelectedIndex(index);
    }, 100),
    []
  );

  // Data selection based on the index
  const dataList =
    selectedIndex === 0
      ? customers?.data || customer
      : suppliers?.data || supplier;

  return (
    <View style={[styles.container, { backgroundColor: bg || Colors.white }]}>
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
                <MaterialCommunityIcons name="wallet-plus" size={24} color={Colors.white} />
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

        <View style={styles.customerList}>
          {customerLoader || supplierLoader ? <CustomLoader /> : <FlatList
            contentContainerStyle={{ flexGrow: 1, paddingTop: 20 }}
            data={dataList}
            renderItem={({ item, index }) => (
              <Customers
                item={item}
                text={selectedIndex === 0 ? "Customer" : "Supplier"}
                selectedIndex={selectedIndex}
                deleteFrom={"index"}
                index={index}
              />
            )}
            keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
            ListEmptyComponent={
              <Empty
                text={`No ${selectedIndex === 0 ? "customer" : "supplier"
                  } found`}
                icon={
                  <FontAwesome5
                    name="user-alt-slash"
                    size={40}
                    color={Colors.text}
                  />
                }
              />
            }
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
          />}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: radius.regular,
  },
  usersCon: {
    backgroundColor: Colors.white,
    shadowColor: Colors.shadow,
    elevation: 10,
    marginVertical: 16,
    padding: 16,
    borderRadius: radius.large,
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
    backgroundColor: Colors.mainColor,
  },
  messageIcon: {
    width: "100%",
    height: "100%",
  },
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
  customerList: {
    height: 300,
  },
});

export default CustomerAndSupplierList;
