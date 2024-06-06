import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { radius } from "@/constants/sizes";
import { Colors } from "@/constants/Colors";
import { Fontisto } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@/constants/Fonts";
import Divider from "./Divider";
import { FontAwesome6 } from "@expo/vector-icons";
const tab: [string, string] = ["Customers", "Suppliers"];

const CustomerList = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleIndexChange = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <View style={styles.container}>
      {/* segments tabs */}
      <View style={styles.segments}>
        <View style={styles.segmentCon}>
          {tab?.map((t: any, index: number) => {
            return (
              <TouchableOpacity
                style={[
                  styles.tabsContainer,
                  {
                    backgroundColor:
                      selectedIndex === index ? Colors.mainColor : Colors.white,
                    borderColor:
                      selectedIndex === index ? Colors.white : Colors.border,
                  },
                ]}
                onPress={() => {
                  handleIndexChange(index);
                }}
                key={index}
              >
                <Text
                  style={[
                    {
                      color:
                        selectedIndex === index ? Colors.white : Colors.text,
                    },
                  ]}
                >
                  {t}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity style={styles.filter}>
          <MaterialCommunityIcons
            name="filter-outline"
            size={16}
            color={Colors.text}
          />
          <Text>Filter</Text>
        </TouchableOpacity>
      </View>
      {/* customer list */}
      <View style={styles.usersCon}>
        <View style={styles.topSection}>
          <Text style={styles.giveAndReceiveText}>
            Will Receive / <Text style={{ color: Colors.red }}>Will Give</Text>
          </Text>
          <View style={styles.messageAndCustomerCon}>
            <TouchableOpacity style={styles.message}>
              <Image
                style={styles.messageIcon}
                resizeMode="contain"
                source={require("../../assets/images/message.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.addCustomer}>
              <Fontisto name="plus-a" size={14} color={Colors.text} />
              <Text style={styles.customerText}>Customer</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList data={[1, 1, 1, 1, 1, 1]} renderItem={renderItem} />
      </View>
    </View>
  );
};

const renderItem = () => {
  return (
    <>
      <Divider height={1} width={"100%"} />
      <View style={styles.customerDetails}>
        <View style={styles.avatar}>
          <FontAwesome6 name="user-secret" size={24} color="black" />
        </View>
        <View style={styles.nameSection}>
          <Text style={styles.name}>Mehedi hasan</Text>
          <Text style={styles.date}>3 Jun,2024</Text>
        </View>
        <Text>$23,000</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: radius.regular,
  },
  segments: {
    backgroundColor: Colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  segmentCon: {
    width: "30%",
    flexDirection: "row",
    gap: 10,
  },
  tabsContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.small,
    borderWidth: 1,
  },

  activeTabStyle: {
    backgroundColor: "#007AFF",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  filter: {
    flexDirection: "row",
    borderRadius: radius.small,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
  },
  usersCon: {
    backgroundColor: Colors.background,
    marginVertical: 16,
    padding: 16,
    borderRadius: radius.large,
    marginTop: 10,
  },
  giveAndReceiveText: {
    fontSize: Fonts.regular,
    color: Colors.green,
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  messageAndCustomerCon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  message: {
    width: 36,
    height: 36,
    borderRadius: 20,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    padding: 8,
    backgroundColor: Colors.white,
  },
  messageIcon: { width: "100%", height: "100%" },
  addCustomer: {
    borderRadius: radius.xxxl,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: "row",
    gap: 10,
    backgroundColor: Colors.white,
    paddingVertical: 7,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  customerText: {
    color: Colors.text,
    fontSize: Fonts.regular,
  },
  customerDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    height: 50,
  },
  nameSection: {
    flex: 1,
  },
  avatar: {
    borderWidth: 1,
    borderRadius: radius.large,
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.border,
    width: 36,
    height: 36,
  },
  name: {
    fontSize: Fonts.medium,
    fontWeight: "600",
    color: Colors.darkCharcoal,
  },
  date: {
    fontSize: Fonts.regular,
    color: Colors.text,
  },
});

export default CustomerList;
