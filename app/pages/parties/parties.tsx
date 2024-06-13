import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { radius } from "@/constants/sizes";
import FilterAndTextSection from "@/components/UI/parties/filterAndTextSection";
import Customers from "@/components/UI/shared/Customers";
import AmountCon from "@/components/UI/AmountCon";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { getCustomers, getSuppliers } from "@/databases/database";
import { ICustomerDataInput } from "@/types/interfaces/input.interface";

const Parties = () => {
  const { bottom, top } = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [customers, setCustomers] = useState<any>();
  const [suppliers, setSuppliers] = useState<any>();

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

  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      <View style={styles.topSection}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Parties</Text>
        </View>
        <View style={styles.navigationCon}>
          <TouchableOpacity
            style={[
              styles.tabs,
              {
                borderBottomColor:
                  activeTab === 0 ? Colors.white : "transparent",
              },
            ]}
            onPress={() => setActiveTab(0)}
          >
            <Text style={styles.navigationText}>Customers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabs,
              {
                borderBottomColor:
                  activeTab === 1 ? Colors.white : "transparent",
              },
            ]}
            onPress={() => setActiveTab(1)}
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
        <FilterAndTextSection />
        {activeTab === 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 50,
            }}
            data={customers}
            renderItem={({ item }) => {
              return <Customers item={item} />;
            }}
          />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 50,
            }}
            data={suppliers}
            renderItem={({ item }) => {
              return <Customers item={item} />;
            }}
          />
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
    justifyContent: "center",
  },
  headerText: {
    fontSize: Fonts.medium,
    color: Colors.white,
    fontWeight: "500",
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
});

export default Parties;
