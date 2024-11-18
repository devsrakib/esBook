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
import EmptyState from "@/components/UI/EmptyState";
import AllSuppliers from "@/components/UI/AllSuppliers";
import { FontAwesome5 } from "@expo/vector-icons";

const Page = () => {
  const { bottom, top } = useSafeAreaInsets();
  const db = useSQLiteContext();
  const { data: suppliers, loading } = useApiHook("suppliers/");

  // const db = useSQLiteContext();
  // useEffect(() => {
  //   async function setup() {
  //     const result = await getSuppliers(db);
  //     setSuppliers(result);
  //   }
  //   setup();
  // }, []);
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
        children="All Supplier"
        textColor={Colors.white}
        backgroundColor={Colors.mainColor}
      />
      <View style={styles.bodySection}>
        <FlatList
          data={loading?.data}
          contentContainerStyle={[
            styles.flatListContainer,
            loading && loading?.data?.length === 0 && styles.emptyListContainer,
          ]}
          renderItem={({ item, index }) => {
            return <AllSuppliers item={item} index={index} />;
          }}
          ListEmptyComponent={
            <View style={styles.emptyStateContainer}>
              <EmptyState
                message="No Supplier Found"
                icon="person"
                iconSize={60}
                color={Colors.text}
              />
            </View>
          }
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
    flex: 1, // Take full available space
    paddingVertical: 10,
  },
  flatListContainer: {
    paddingHorizontal: 10,
    gap: 10,
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
