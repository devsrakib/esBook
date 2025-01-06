import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  RefreshControl,
} from "react-native";
import { Colors } from "@/constants/Colors";
import UserViewHome from "@/components/UI/UserViewHome";
import AmountCon from "@/components/UI/AmountCon";
import { FontAwesome } from "@expo/vector-icons";
import Dashboard from "@/components/UI/Dashboard";
import CustomerAndSupplierList from "@/components/UI/home/CustomerAndSupplierList";
import Chart from "@/components/UI/home/Chart";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchOwner } from "@/redux/features/owner/ownerSlice";
import { fetchSupplier } from "@/redux/features/supplier/supplierSlice";
import { fetchCustomers } from "@/redux/features/customer/customerSlice";
import { RootState } from "@/redux/store";
import NetworkError from "@/components/UI/networkError/NetworkError";
import UserViewHomeSkeleton from "@/components/skeloton/userHome";
const Home = () => {
  const { width } = Dimensions.get("window");
  const isTablet = width >= 600;

  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useAppDispatch();
  const { owners: data, loading, error } = useAppSelector(state => state.owner);
  const { customers, loading: customerLoading, error: customerError } = useAppSelector((state: RootState) => state.customers);
  const { suppliers, loading: supplierLoading, error: supplierError } = useAppSelector((state: any) => state.suppliers);




  useEffect(() => {
    dispatch(fetchCustomers())
  }, []);

  useEffect(() => {
    dispatch(fetchSupplier({supplierId:''}));
  }, [])

  useEffect(() => {
    dispatch(fetchOwner())
  }, [])

  if (error) {
    return (
      <NetworkError
        message={"Failed to load data. Please check your connection."}
        onRetry={() => {
          dispatch(fetchCustomers());
          dispatch(fetchSupplier({supplierId:''}));
          dispatch(fetchOwner());
        }}
      />
    );
  }



  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate a network request or data fetching
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Replace with your fetch logic
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  };




  return (
    <ScrollView showsVerticalScrollIndicator={false} refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <View style={styles.container}>
        {/* User View Component */}
        {loading ? <UserViewHomeSkeleton /> : <UserViewHome data={data} />}

        {/* AmountCon Component with Props */}
        <AmountCon
          // leftBgColor={Colors.green}
          leftBgColor={'#168F88'}
          leftTextColor={Colors.white}
          leftAmountTColor={Colors.white}
          icon1={
            <FontAwesome
              name="money"
              size={isTablet ? 60 : 30}
              color={Colors.white}
            />
          }
          icon2={
            <FontAwesome
              name="money"
              size={isTablet ? 60 : 30}
              color={Colors.white}
            />
          }
        />

        {/* Dashboard and Chart Layout */}
        <View
          style={isTablet ? styles.tabletContainer : styles.defaultContainer}
        >
          <View style={{ flex: 1 }}>
            <Dashboard customers={customers} customerLoader={customerLoading} customerError={customerError} suppliers={suppliers} supplierError={supplierError} supplierLoader={supplierLoading} />
          </View>
          <View style={{ flex: 1 }}>
            <Chart />
          </View>
        </View>

        {/* Customer and Supplier List */}
        <CustomerAndSupplierList customers={customers} customerLoader={customerLoading} customerError={customerError} suppliers={suppliers} supplierError={supplierError} supplierLoader={supplierLoading} />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: Colors.background,
    gap: 15,
  },
  defaultContainer: {
    flexDirection: "column", // Stacks components vertically on phones
    gap: 20,
  },
  tabletContainer: {
    flexDirection: "row", // Arranges components side by side on tablets
    flex: 1,
    gap: 20,
  },
});
