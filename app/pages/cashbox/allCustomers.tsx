import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import Header from "@/components/UI/header/Header";
import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AllCustomers from "@/components/UI/AllCustomers";
import EmptyState from "@/components/UI/EmptyState";
import CustomLoader from "@/components/UI/CustomLoader";
import { RootState } from "@/redux/store";
import { fetchCustomers } from "@/redux/features/customer/customerSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";

const Page = () => {
  const { bottom, top } = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const { customers, loading, error } = useAppSelector((state: RootState) => state.customers);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, []);

  if (error) {
    return <Text>Error: {error}</Text>;
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
      <Header
        children="All Customer"
        textColor={Colors.white}
        backgroundColor={Colors.mainColor}
      />
      <View style={styles.bodySection}>
        {loading ? <CustomLoader /> : <FlatList
          data={customers?.data || []} // Fallback to an empty array
          // contentContainerStyle={[
          //   styles.flatListContainer,
          //   customers?.data?.length === 0 && styles.emptyListContainer,
          // ]}
          renderItem={({ item, index }) => (
            <AllCustomers item={item} index={index} router="/pages/cashbox/details" />
          )}
          ListEmptyComponent={
            <View style={styles.emptyStateContainer}>
              <EmptyState
                message="No Customer Found"
                icon="person"
                iconSize={60}
                color={Colors.text}
              />
            </View>
          }
        />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  bodySection: {
    flex: 1, // Take full available space
    paddingVertical: 10,
  },
  flatListContainer: {
    paddingHorizontal: 10,
    flexGrow: 1,
  },
  emptyListContainer: {
    flexGrow: 1,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Page;
