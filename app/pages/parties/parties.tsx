import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { radius } from "@/constants/sizes";
import Customers from "@/components/UI/shared/Customers";
import AmountCon from "@/components/UI/AmountCon";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import {
  CustomerData,
  getCustomers,
  getSuppliers,
  SupplierData,
} from "@/databases/Database";
import AddPartiesButton from "@/components/UI/parties/AddPartiesButton";
import Search from "@/components/UI/parties/Search";
import useApiHook from "@/hooks/all_api_hooks";
import { LinearGradient } from "expo-linear-gradient";
import ActivityIndicator from "@/components/UI/ActivityIndicator";
import EmptyState from "@/components/UI/EmptyState";

type PartiesProps = {
  isOpenSearch: boolean;
};
const Parties = ({isOpenSearch}: PartiesProps) => {
  // const { bottom, top } = useSafeAreaInsets();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const routerData = useLocalSearchParams();
  // const db = useSQLiteContext();

  const { data: customerData, loading, error } = useApiHook("customers/");
  const {
    data: supplierData,
    loading: supplierLoading,
    error: supplierError,
  } = useApiHook("suppliers/");

  // Fetch customers and suppliers from SQLite database
  // useEffect(() => {
  //   const setup = async () => {
  //     if (customers.length === 0) {
  //       const customersData = await getCustomers(db);
  //       setCustomers(customersData as CustomerData[]);
  //     }
  //     if (suppliers.length === 0) {
  //       const suppliersData = await getSuppliers(db);
  //       setSuppliers(suppliersData as SupplierData[]);
  //     }
  //   };
  //   setup();
  // }, [db, customers.length, suppliers.length]);

  // Update selected index based on router data
  // useEffect(() => {
  //   if (
  //     routerData?.text === "Total Customers" ||
  //     routerData?.text === "Add Customer"
  //   ) {
  //     setSelectedIndex(0);
  //   } else if (routerData?.text === "Total Supplier") {
  //     setSelectedIndex(1);
  //   }
  // }, [routerData?.text]);

  // Filter customers or suppliers based on selected index and search term
  const filteredCustomersSuppliers = useMemo(() => {
    if (selectedIndex === 0) {
      return customerData?.data?.filter((customer) =>
        customer?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (selectedIndex === 1) {
      return supplierData?.data?.filter((supplier) =>
        supplier?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return [];
  }, [selectedIndex, searchTerm, customerData, supplierData]);

  // Handle tab switch
  const handleSegment = useCallback((val: number) => {
    setSelectedIndex(val);
  }, []);


  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#168F88", "#006B60", "#4D89A1"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.topSection}
      >
        <AmountCon
          leftBgColor={Colors.white}
          leftAmountTColor={Colors.mainColor}
          leftTextColor={Colors.mainColor}
          icon1={
            <FontAwesome name="money" size={30} color={Colors.mainColor} />
          }
          icon2={<FontAwesome name="money" size={30} color={Colors.white} />}
        />
        <View style={styles.navigationCon}>
          <TouchableOpacity
            style={[
              styles.tabs,
              {
                borderBottomColor:
                  selectedIndex === 0 ? Colors.white : "transparent",
              },
            ]}
            onPress={() => handleSegment(0)}
          >
            <Text style={styles.navigationText}>Customers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabs,
              {
                borderBottomColor:
                  selectedIndex === 1 ? Colors.white : "transparent",
              },
            ]}
            onPress={() => handleSegment(1)}
          >
            <Text style={styles.navigationText}>Suppliers</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.bodySection}>
        {isOpenSearch && (
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        )}

        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          data={filteredCustomersSuppliers}
          renderItem={({ item, index }) => {
            if (!item) {
              return null; // or render some placeholder
            }
            return (
              <Customers
                item={item}
                index={index}
                selectedIndex={selectedIndex}
                text={selectedIndex === 0 ? "Customer" : "Supplier"}
                deleteFrom="parties"
              />
            );
          }}
          ListEmptyComponent={
            <EmptyState
              message="No data found"
              icon="person"
              iconSize={50}
              color={Colors.text}
            />
          }
        />
        {/* )} */}

        <AddPartiesButton />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  topSection: {
    paddingHorizontal: 20,
    borderBottomRightRadius: radius.regular,
    borderBottomLeftRadius: radius.regular,
    paddingBottom: 20,
  },
  navigationCon: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingBottom: 20,
  },
  navigationText: {
    fontSize: Fonts.medium,
    color: Colors.white,
  },
  bodySection: {
    flex: 1,
  },
  tabs: {
    height: 25,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
  listContent: {
    paddingBottom: 100,
    marginTop: 20,
    paddingHorizontal: 20,
  },
});

export default Parties;
