import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "@/components/UI/header/Header";
import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSQLiteContext } from "expo-sqlite";
import { getCustomers } from "@/databases/Database";
import AllCustomers from "@/components/UI/AllCustomers";
import useApiHook from "@/hooks/all_api_hooks";

const Page = () => {
  const { bottom, top } = useSafeAreaInsets();
  const [customer, setCustomer] = useState<any>();
  const db = useSQLiteContext();
  useEffect(() => {
    async function setup() {
      // const result = await getCustomers(db);
      const { data, loading } = useApiHook("customers/");
      setCustomer(data);
    }
    setup();
  }, []);

  console.log(customer, "customer data");

  return (
    <View
      style={[styles.container, { paddingBottom: bottom, paddingTop: top }]}
    >
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
          animationDuration: 100,
        }}
      />
      <Header
        children="All Customer"
        textColor={Colors.white}
        backgroundColor={Colors.mainColor}
      />
      <View style={styles.bodySection}>
        <FlatList
          data={customer}
          renderItem={({ item, index }) => {
            return <AllCustomers item={item} index={index} />;
          }}
        />
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
    paddingVertical: 10,
  },
});
export default Page;
