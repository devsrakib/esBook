import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { radius } from "@/constants/sizes";
import FilterAndTextSection from "@/components/UI/parties/filterAndTextSection";
import Customers from "@/components/UI/shared/Customers";
import AmountCon from "@/components/UI/AmountCon";
import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome5,
  Fontisto,
} from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import {
  CustomerData,
  getCustomers,
  getSuppliers,
  SupplierData,
} from "@/databases/Database";
import Empty from "@/components/UI/Empty";
import AddPartiesButton from "@/components/UI/parties/AddPartiesButton";
import Search from "@/components/UI/parties/Search";
import useApiHook from "@/hooks/all_api_hooks";

const Parties = () => {
  const { bottom, top } = useSafeAreaInsets();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [suppliers, setSuppliers] = useState<SupplierData[]>([]);
  const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [focusInput, setFocusInput] = useState<boolean | null>(null);
  const routerData = useLocalSearchParams();

  const { data: CustomerData, loading, error } = useApiHook("customers");
  const {
    data: supplierData,
    loading: supplierLoading,
    error: supplierError,
  } = useApiHook("suppliers");
  const db = useSQLiteContext();

  useEffect(() => {
    const setup = async () => {
      if (customers.length === 0) {
        const customersData = await getCustomers(db);
        setCustomers(customersData as CustomerData[]);
      }
      if (suppliers.length === 0) {
        const suppliersData = await getSuppliers(db);
        setSuppliers(suppliersData as SupplierData[]);
      }
    };
    setup();
  }, [db, customers.length, suppliers.length]); // Only fetch if lists are empty

  useEffect(() => {
    if (
      routerData?.text === "Total Customers" ||
      routerData?.text === "Add Customer"
    ) {
      // setSelectedIndex(0); // Set to Customer tab
    } else if (routerData?.text === "Total Supplier") {
      // setSelectedIndex(1); // Set to Supplier tab
    }
  }, [routerData?.text]);

  // Memoize filtered customers/suppliers based on the selected index
  const filteredCustomersSuppliers = useMemo(() => {
    if (selectedIndex === 0) {
      return CustomerData?.results?.filter((customer) =>
        customer?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (selectedIndex === 1) {
      return supplierData?.results?.filter((supplier) =>
        supplier?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return [];
  }, [selectedIndex, searchTerm, customers, suppliers]);

  // Handle segment change (Customer/Supplier tab switch)
  const handleSegment = useCallback((val: number) => {
    setSelectedIndex(val);
  }, []);

  // Handle search toggle
  const handleSearch = useCallback((val: boolean) => {
    setIsOpenSearch(!val);
  }, []);

  return (
    <View style={[styles.container]}>
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
          animationDuration: 100,
        }}
      />

      <View style={styles.topSection}>
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

        <AmountCon
          bg_image={require("../../../assets/images/amountBg-blue.png")}
          leftAmountTColor={Colors.mainColor}
          leftTextColor={Colors.mainColor}
          icon1={
            <FontAwesome name="money" size={30} color={Colors.mainColor} />
          }
          icon2={<FontAwesome name="money" size={30} color={Colors.white} />}
        />
      </View>

      <View style={styles.bodySection}>
        {isOpenSearch && (
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setFocusInput={setFocusInput}
          />
        )}
        {/* <FilterAndTextSection /> */}

        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 100,
            // flex: 1,
            marginTop: 20,
            paddingHorizontal: 20,
          }}
          data={filteredCustomersSuppliers}
          renderItem={({ item }) => {
            return (
              <Customers
                item={item}
                selectedIndex={selectedIndex}
                text={selectedIndex === 0 ? "Customer" : "Supplier"}
                deleteFrom={"parties"}
              />
            );
          }}
          ListEmptyComponent={
            <Empty
              text="No Supplier"
              icon={
                <FontAwesome5
                  name="user-alt-slash"
                  size={40}
                  color={Colors.text}
                />
              }
            />
          }
        />

        <AddPartiesButton />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    // backgroundColor: "red",
  },
  topSection: {
    backgroundColor: Colors.mainColor,
    paddingHorizontal: 20,
    borderBottomRightRadius: radius.regular,
    borderBottomLeftRadius: radius.regular,
    paddingBottom: 20,
  },

  navigationCon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingBottom: 20,
    marginBottom: 10,
  },
  navigationText: {
    fontSize: Fonts.medium,
    color: Colors.white,
  },
  bodySection: {
    // paddingHorizontal: 20,
    flex: 1,
    // backgroundColor: "red",
  },

  tabs: {
    height: 25,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
});

export default Parties;
