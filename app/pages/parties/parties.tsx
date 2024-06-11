import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { radius } from "@/constants/sizes";
import FilterAndTextSection from "@/components/UI/parties/filterAndTextSection";
import Customers from "@/components/UI/shared/Customers";
import AmountCon from "@/components/UI/AmountCon";
import { AntDesign } from "@expo/vector-icons";

const Parties = () => {
  const { bottom, top } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      <View style={styles.topSection}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Parties</Text>
        </View>
        <View style={styles.navigationCon}>
          <TouchableOpacity>
            <Text style={styles.navigationText}>Customers</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.navigationText}>Suppliers</Text>
          </TouchableOpacity>
        </View>
        <AmountCon
          bg_image={require("../../../assets/images/amountBg-blue.png")}
          logo1={require("../../../assets/images/receiveBlue.png")}
          logo2={require("../../../assets/images/give.png")}
          leftAmountTColor={Colors.mainColor}
          leftTextColor={Colors.mainColor}
        />
      </View>
      <View style={styles.bodySection}>
        <FilterAndTextSection />
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 50,
          }}
          data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
          renderItem={({ item }) => {
            return <Customers />;
          }}
        />
        <TouchableOpacity style={styles.addButton}>
          <AntDesign name="plus" size={18} color={Colors.white} />
          <Text style={styles.buttonText}>Add Parties</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  topSection: {
    backgroundColor: Colors.mainColor,
    paddingHorizontal: 20,
    borderBottomRightRadius: radius.regular,
    borderBottomLeftRadius: radius.regular,
    paddingBottom: 20,
  },
  header: {
    height: 70,
    justifyContent: "center",
  },
  headerText: {
    fontSize: Fonts.medium,
    color: Colors.white,
    fontWeight: "500",
  },
  navigationCon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingBottom: 20,
    marginBottom: 10,
  },
  navigationText: {
    fontSize: Fonts.medium,
    color: Colors.white,
  },
  bodySection: {
    paddingHorizontal: 20,
    flex: 1,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: Colors.mainColor,
    position: "absolute",
    right: 20,
    bottom: 40,
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 20,
  },
  buttonText: {
    color: Colors.white,
    fontSize: Fonts.medium,
  },
});

export default Parties;
