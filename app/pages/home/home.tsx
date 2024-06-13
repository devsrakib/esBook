import { View, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import UserViewHome from "@/components/UI/UserViewHome";
import Chart from "@/components/UI/Chart";
import AmountCon from "@/components/UI/AmountCon";
import Dashboard from "@/components/UI/Dashboard";
import CustomerAndSupplierList from "@/components/UI/CustomerAndSupplierList";
import { getSuppliers } from "@/databases/database";
import { useSQLiteContext } from "expo-sqlite";
import CustomModal from "@/components/UI/modal/Modal";

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const db = useSQLiteContext();
  useEffect(() => {
    async function setup() {
      const result = await getSuppliers(db);
      console.log(result);

      // setCustomer(result);
    }
    setup();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[Styles.container]}>
        <UserViewHome />
        <AmountCon
          bg_image={require("../../../assets/images/amountFrame.png")}
          leftTextColor={Colors.white}
          leftAmountTColor={Colors.white}
          logo1={require("../../../assets/images/receive.png")}
          logo2={require("../../../assets/images/give.png")}
        />
        <Dashboard />
        <Chart setIsModalVisible={setIsModalVisible} />
        <CustomerAndSupplierList bg={Colors.JazzBerry} />
        {isModalVisible && (
          <CustomModal
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
          />
        )}
      </View>
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: Colors.white,
    gap: 15,
  },
});

export default Home;
