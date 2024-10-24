import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign, Feather, Fontisto } from "@expo/vector-icons";
import { Fonts } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";

const Header = ({ data }: { data: any }) => {
  return (
    <View style={styles.header}>
      <View style={{ flexDirection: "row" }}>
        {routerData?.text && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={24} color={Colors.white} />
          </TouchableOpacity>
        )}
        <Text style={styles.headerText}>Parties</Text>
        <View style={styles.customerLengthCon}>
          <Text style={styles.customerLength}>
            {selectedIndex === 0
              ? filteredCustomersSuppliers?.length
              : suppliers?.length}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => handleSearch(isOpenSearch)}
        style={styles.searchButton}
      >
        {isOpenSearch ? (
          <AntDesign name="close" size={22} color={Colors.white} />
        ) : (
          <Fontisto name="search" size={18} color={Colors.white} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: 70,
    // justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: Fonts.medium,
    color: Colors.white,
    fontWeight: "500",
    marginRight: 20,
  },
  customerLengthCon: {
    width: 20,
    height: 20,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.lavender,
  },
  customerLength: {
    fontSize: Fonts.small,
  },
  backButton: {
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
  searchButton: {
    width: 40,
    height: 40,
    alignContent: "center",
    justifyContent: "center",
  },
});
