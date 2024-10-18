import { View, StyleSheet, ScrollView } from "react-native";
import { Colors } from "@/constants/Colors";
import UserViewHome from "@/components/UI/UserViewHome";
import Chart from "@/components/UI/home/Chart";
import AmountCon from "@/components/UI/AmountCon";
import Dashboard from "@/components/UI/Dashboard";
import CustomerAndSupplierList from "@/components/UI/home/CustomerAndSupplierList";
import { FontAwesome } from "@expo/vector-icons";

const Home = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[Styles.container]}>
        <UserViewHome />
        <AmountCon
          bg_image={require("../../../assets/images/amountFrame.png")}
          leftTextColor={Colors.white}
          leftAmountTColor={Colors.white}
          icon1={<FontAwesome name="money" size={30} color={Colors.white} />}
          icon2={<FontAwesome name="money" size={30} color={Colors.white} />}
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
