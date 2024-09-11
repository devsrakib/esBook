import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList,
  TextInput,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { radius } from "@/constants/sizes";
import FilterAndTextSection from "@/components/UI/parties/filterAndTextSection";
import Customers from "@/components/UI/shared/Customers";
import AmountCon from "@/components/UI/AmountCon";
import { AntDesign, Feather, FontAwesome5, Fontisto } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { getCustomers, getSuppliers } from "@/databases/Database";
import Empty from "@/components/UI/Empty";
import Animated, {
  Easing,
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
  FlipInXUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const Parties = () => {
  const { bottom, top } = useSafeAreaInsets();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [customers, setCustomers] = useState<any>([]);
  const [suppliers, setSuppliers] = useState<any>([]);
  const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const routerData = useLocalSearchParams();

  const db = useSQLiteContext();
  useEffect(() => {
    async function setup() {
      const customers = await getCustomers(db);
      const suppliers = await getSuppliers(db);
      setCustomers(customers);
      setSuppliers(suppliers);
    }
    setup();
  }, []);

  let filteredCustomersSuppliers: any;
  useEffect(() => {
    if (
      routerData?.text === "Total Customers" ||
      routerData?.text === "Add Customer"
    ) {
      setSelectedIndex(0); // Set to Customer tab
    } else if (routerData?.text === "Total Supplier") {
      setSelectedIndex(1); // Set to Supplier tab
    }
  }, [routerData?.text]);

  if (selectedIndex === 0) {
    filteredCustomersSuppliers = customers?.filter((customer: any) =>
      customer?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );
  } else if (selectedIndex === 1) {
    filteredCustomersSuppliers = suppliers?.filter((customer: any) =>
      customer?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );
  }

  return (
    <View
      style={[styles.container, { paddingBottom: bottom, paddingTop: top }]}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={[styles.topSection]}>
        <Animated.View style={[styles.header]}>
          <View style={{ flexDirection: "row" }}>
            {routerData?.text && (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <Feather name="arrow-left" size={24} color={Colors.white} />
              </TouchableOpacity>
            )}
            <Text style={styles.headerText}>Parties</Text>
            <View style={styles.customerLengthCon}>
              <Text style={styles.customerLength}>
                {selectedIndex === 0
                  ? filteredCustomersSuppliers?.length
                  : suppliers?.length}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              setIsOpenSearch(!isOpenSearch);
            }}
            style={styles.searchButton}
          >
            {isOpenSearch ? (
              <AntDesign name="close" size={22} color={Colors.white} />
            ) : (
              <Fontisto name="search" size={18} color={Colors.white} />
            )}
          </TouchableOpacity>
        </Animated.View>
        <View style={styles.navigationCon}>
          <TouchableOpacity
            style={[
              styles.tabs,
              {
                borderBottomColor:
                  selectedIndex === 0 ? Colors.white : "transparent",
              },
            ]}
            onPress={() => setSelectedIndex(0)}
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
            onPress={() => setSelectedIndex(1)}
          >
            <Text style={styles.navigationText}>Suppliers</Text>
          </TouchableOpacity>
        </View>
        <AmountCon
          bg_image={require("../../../assets/images/amountBg-blue.png")}
          logo1={require("../../../assets/images/receiveBlue.png")}
          logo2={require("../../../assets/images/give.png")}
          leftAmountTColor={Colors.mainColor}
          leftTextColor={Colors.mainColor}
        />
      </View>
      <View style={styles.bodySection}>
        {isOpenSearch && (
          <Animated.View entering={FadeInUp} style={styles.searchSection}>
            <Fontisto name="search" size={18} color={Colors.text} />
            <TextInput
              placeholder="Search..."
              style={styles.input}
              onChangeText={(text) => setSearchTerm(text)} // Update search term
              value={searchTerm}
            />
          </Animated.View>
        )}
        <FilterAndTextSection />
        {selectedIndex === 0 ? (
          <>
            {filteredCustomersSuppliers?.length === 0 ? (
              <Empty
                text="No Customer"
                icon={
                  <FontAwesome5
                    name="user-alt-slash"
                    size={40}
                    color={Colors.text}
                  />
                }
              />
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: 50,
                }}
                data={filteredCustomersSuppliers}
                renderItem={({ item }) => {
                  return (
                    <Customers
                      item={item}
                      selectedIndex={selectedIndex}
                      text={"Customer"}
                      deleteFrom={"parties"}
                    />
                  );
                }}
              />
            )}
          </>
        ) : (
          <>
            {filteredCustomersSuppliers.length === 0 ? (
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
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: 50,
                }}
                data={filteredCustomersSuppliers}
                renderItem={({ item }) => {
                  return (
                    <Customers
                      item={item}
                      selectedIndex={selectedIndex}
                      text={"Supplier"}
                      deleteFrom={"parties"}
                    />
                  );
                }}
              />
            )}
          </>
        )}
        <TouchableOpacity
          onPress={() => router.navigate("/pages/parties/addNewParties")}
          style={styles.addButton}
        >
          <AntDesign name="plus" size={18} color={Colors.white} />
          <Text style={styles.buttonText}>Add Parties</Text>
        </TouchableOpacity>
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
  header: {
    height: 70,
    // justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: Fonts.medium,
    color: Colors.white,
    fontWeight: "500",
    marginRight: 20,
  },
  customerLengthCon: {
    width: 20,
    height: 20,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.lavender,
  },
  customerLength: {
    fontSize: Fonts.small,
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
    paddingHorizontal: 20,
    flex: 1,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: Colors.mainColor,
    position: "absolute",
    right: 20,
    bottom: 40,
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 20,
  },
  buttonText: {
    color: Colors.white,
    fontSize: Fonts.medium,
  },
  tabs: {
    height: 25,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
  searchButton: {
    width: 40,
    height: 40,
    alignContent: "center",
    justifyContent: "center",
  },
  searchSection: {
    height: 50,
    backgroundColor: Colors.white,
    borderRadius: radius.regular,
    width: "100%",
    alignSelf: "center",
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    gap: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.text,
    elevation: 10,
  },
  input: {
    fontSize: Fonts.medium,
    flex: 1,
  },
});

export default Parties;
