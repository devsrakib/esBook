import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/slip/Header.createSlip";
import SlipCard from "@/components/slip/SlipCard";
import Customers from "@/components/UI/shared/Customers";
import { useSQLiteContext } from "expo-sqlite";
import { getCustomers } from "@/databases/Database";
import Button from "@/components/UI/Button";
import { radius } from "@/constants/sizes";
import { Fonts } from "@/constants/Fonts";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const CreateSlip = () => {
  const [data, setData] = useState<any>([]);
  const [isSelectCustomer, setIsSelectCustomer] = useState<boolean>(false);
  const { top } = useSafeAreaInsets();
  const db = useSQLiteContext();
  const { width } = Dimensions.get("window");
  const isTablet = width >= 600;

  useEffect(() => {
    async function customer() {
      const result = await getCustomers(db);
      console.log(result, "::::::::::");

      setData(result);
    }
    customer();
  }, []);

  console.log(data);

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
      <Header setIsSelectCustomer={setIsSelectCustomer} />

      <View style={styles.body}>
        <FlatList
          numColumns={2}
          data={Array(101)}
          contentContainerStyle={styles.content}
          renderItem={({ item, index }) => {
            return <SlipCard index={index} />;
          }}
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => setIsSelectCustomer(true)}
          style={[
            styles.selectCustomer,
            {
              flexDirection: "row",
              gap: 5,
            },
          ]}
        >
          <Text style={styles.text}>Select customer</Text>
          <AntDesign name="up" size={18} color={Colors.mainColor} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.selectCustomer,
            {
              flexDirection: "row",
              gap: 5,
              backgroundColor: Colors.mainColor,
            },
          ]}
        >
          <Text style={[styles.text, { color: Colors.white }]}>Done</Text>
          <AntDesign name="check" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <Modal
        visible={isSelectCustomer}
        style={{ margin: 0, justifyContent: "flex-end" }}
        onDismiss={() => setIsSelectCustomer(false)}
        onRequestClose={() => setIsSelectCustomer(false)}
        animationType="slide"
      >
        <View
          style={[
            styles.modalContent,
            {
              width: isTablet ? "75%" : "100%",
            },
          ]}
        >
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => setIsSelectCustomer(false)}
              style={styles.modalClose}
            >
              <Ionicons name="close" size={28} color={Colors.mainColor} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            renderItem={({ item }) => {
              return <Customers item={item} />;
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default CreateSlip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.page_bg,
  },
  body: {
    paddingTop: 16,
    flex: 1,
  },
  content: {
    paddingHorizontal: 8,
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: Dimensions.get("screen").height / 2,
    alignSelf: "center",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    height: 70,
    justifyContent: "space-between",
    padding: 16,
    shadowColor: Colors.black,
    elevation: 15,
  },
  selectCustomer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.small,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    borderColor: Colors.mainColor,
    borderWidth: 1,
    height: 40,
  },
  text: {
    fontSize: Fonts.medium,
    color: Colors.mainColor,
    fontWeight: "500",
  },
  modalHeader: {
    height: 60,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    // alignItems: "center",
    justifyContent: "center",
  },
  modalClose: {
    width: 30,
    height: 30,
    borderRadius: radius.small,
    alignItems: "center",
    justifyContent: "center",
  },
});
