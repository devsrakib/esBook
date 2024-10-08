import { View, StyleSheet, ScrollView } from "react-native";
import { Colors } from "@/constants/Colors";
import UserViewHome from "@/components/UI/UserViewHome";
import Chart from "@/components/UI/home/Chart";
import AmountCon from "@/components/UI/AmountCon";
import Dashboard from "@/components/UI/Dashboard";
import CustomerAndSupplierList from "@/components/UI/home/CustomerAndSupplierList";

const Home = () => {
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
        <Chart />
        <CustomerAndSupplierList bg={Colors.JazzBerry} />
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
