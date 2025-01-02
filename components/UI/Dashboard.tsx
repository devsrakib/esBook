import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, {  useMemo, } from "react";
import { Colors } from "@/constants/Colors";
import { radius } from "@/constants/sizes";
import { Fonts } from "@/constants/Fonts";
import { sharedStyle } from "@/constants/shared.style";
import { currency } from "@/global/currency";
import { Link, useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";

const Dashboard = ({customers, customerLoader, customerError, suppliers, supplierError, supplierLoader}:any) => {
const router = useRouter()

  // if (customerLoading) {
  //   return <ActivityIndicator size="large" color="#0000ff" />;
  // }
  if(!customers || !suppliers)return

  if (customerError) {
    return <Text>Error: {customerError}</Text>;
  }


  if (supplierError) {
    return <Text>Error: {supplierError}</Text>;
  }
  // useEffect(() =>{
  //  dispatch( fetchSupplier())
  // }, [])

  const dashboardData = useMemo(() => [
    {
      text: "Total Customers",
      icon: require("../../assets/images/DUser.png"),
      quantity: customerLoader ? 0 : customers?.count || 0,
      bg_color: Colors.lavender,
      link: "/pages/cashbox/allCustomers",
    },
    {
      text: "Total Supplier",
      icon: require("../../assets/images/DHouse.png"),
      quantity: supplierLoader ? 0 : suppliers?.count || 0,
      bg_color: Colors.purpleHalf,
      link: "/pages/cashbox/allSuppliers",
    },
    {
      text: "Total Cash",
      icon: require("../../assets/images/DMoney.png"),
      amount: 12389,
      bg_color: Colors.VeroneseGreen,
    },
    {
      text: "Total Expenses",
      icon: require("../../assets/images/DDollar.png"),
      amount: 5600,
      bg_color: Colors.OrangeRed,
      color: Colors.red,
    },
  ], [customers, customerLoader,  suppliers, supplierLoader]); // Only re-compute when these dependencies change
  
  if(customerError){
    return(
      <Text>{customerError}</Text>
    )
  }

  return (
    <View style={sharedStyle.grid}>
      {dashboardData?.map((item, index) => {
        const StatusContent = (
          <Animated.View  
          key={index}
          entering={FadeInDown.delay(index * 50)
            .duration(400)
            .damping(80)
            .springify().stiffness(200)} style={styles.container}>
            <TouchableOpacity
            
            activeOpacity={item?.link ? 0.7 : 1}
            
            style={styles.action}
          >
            <View style={[styles.logoCon, { backgroundColor: item?.bg_color }]}>
              <Image source={item?.icon} style={styles.logo} />
            </View>
            <Text style={styles.text}>{item?.text}</Text>
           {customerLoader || supplierLoader? <Text>0</Text> : <Text style={[styles.amount, { color: item?.color }]}>
              {item?.amount ? currency : null}
              {item?.amount || item?.quantity}
            </Text>}
          </TouchableOpacity>
          </Animated.View>
        );

        return item?.link ? (
          <Link
            key={index}
            href={{
              pathname: `${item?.link}`,
              params: { text: item?.text },
            }}
            asChild
          >
            {StatusContent}
          </Link>
        ) : (
          StatusContent
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: radius.small,
    width: "48.5%",
    height: 120,

    shadowColor: Colors.shadow,
    elevation: 10,
  },
  logoCon: {
    width: 36,
    height: 36,
    borderRadius: 20,
    backgroundColor: Colors.lavender,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {},
  text: {
    fontSize: Fonts.regular,
    color: Colors.text,
  },
  amount: {
    fontSize: Fonts.medium,
    fontWeight: "bold",
  },
  action:{
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    height: '100%',
    padding: 10,
    gap: 10,
  }
});
export default Dashboard;
