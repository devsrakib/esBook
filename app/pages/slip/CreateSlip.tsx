import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/slip/Header.createSlip";
import SlipCard from "@/components/slip/SlipCard";
import Modal from "react-native-modal";
import Customers from "@/components/UI/shared/Customers";
import { useSQLiteContext } from "expo-sqlite";
import { getCustomers } from "@/databases/Database";
import Button from "@/components/UI/Button";
import { radius } from "@/constants/sizes";

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
        <Button
          title="Done"
          bg={Colors.mainColor}
          titleColor={Colors.white}
          width={120}
          radius={radius.small}
        />
      </View>

      <Modal
        isVisible={isSelectCustomer}
        onBackdropPress={() => setIsSelectCustomer(false)}
        style={{ margin: 0, justifyContent: "flex-end" }}
        backdropOpacity={0.3}
        onBackButtonPress={() => setIsSelectCustomer(false)}
        onDismiss={() => setIsSelectCustomer(false)}
        animationIn={"fadeInUp"}
        animationInTiming={5}
        backdropTransitionInTiming={100}
        backdropTransitionOutTiming={100}
        customBackdrop={
          <TouchableOpacity
            // activeOpacity={0.7}
            onPress={() => setIsSelectCustomer(false)}
            style={{
              backgroundColor: "black",
              opacity: 0.8,
              width: "100%",
              height: "100%",
            }}
          ></TouchableOpacity>
        }
        backdropColor={Colors.black}
      >
        <View
          style={[
            styles.modalContent,
            {
              width: isTablet ? "75%" : "100%",
            },
          ]}
        >
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
    justifyContent: "flex-end",
    padding: 16,
    shadowColor: Colors.black,
    elevation: 15,
  },
});
