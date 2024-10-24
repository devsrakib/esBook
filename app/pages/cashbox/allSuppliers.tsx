import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import Header from "@/components/UI/header/Header";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSQLiteContext } from "expo-sqlite";
import { getSuppliers } from "@/databases/Database";
import AllSuppliers from "@/components/UI/AllSuppliers";
import Empty from "@/components/UI/Empty";
import { FontAwesome5 } from "@expo/vector-icons";

const page = () => {
  const { bottom, top } = useSafeAreaInsets();
  const [suppliers, setSuppliers] = useState<any>();
  const db = useSQLiteContext();
  useEffect(() => {
    async function setup() {
      const result = await getSuppliers(db);
      setSuppliers(result);
    }
    setup();
  }, []);
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
        children="All Supplier"
        backgroundColor={Colors.mainColor}
        textColor={Colors.white}
      />

      {suppliers?.length === 0 ? (
        <Empty
          text="No Supplier"
          icon={<FontAwesome5 name="user-alt-slash" size={24} color="black" />}
        />
      ) : (
        <FlatList
          data={suppliers}
          contentContainerStyle={{
            gap: 10,
            paddingTop: 10,
          }}
          renderItem={({ item }) => {
            return <AllSuppliers item={item} />;
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default page;
