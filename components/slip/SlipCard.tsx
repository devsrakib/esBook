import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { radius } from "@/constants/sizes";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";

const SlipCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View style={styles.imageCon}>
          <Image
            style={styles.image}
            source={require("../../assets/images/onion.jpg")}
          />
        </View>
        <View style={styles.stockCon}>
          <Text style={styles.pname}>Onion</Text>
          <Text>Stock: 90kg</Text>
          <Text>selling Price: 55tk</Text>
        </View>
      </View>
      <View style={styles.addQCon}>
        <View style={styles.qContainer}>
          <TouchableOpacity>
            <AntDesign name="minuscircleo" size={24} color={Colors.red} />
          </TouchableOpacity>
          <Text>Q: 5</Text>
          <TouchableOpacity>
            <AntDesign name="pluscircleo" size={24} color={Colors.mainColor} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.ButtonText}>Add</Text>
          <Entypo name="plus" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SlipCard;

const styles = StyleSheet.create({
  container: {
    width: "95%",
    padding: 10,
    borderRadius: radius.small,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    elevation: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    alignSelf: "center",
    justifyContent: "space-between",
  },
  info: {
    flexDirection: "row",
    gap: 10,
  },
  imageCon: {
    width: 80,
    height: 80,
    borderRadius: radius.small,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.VeroneseGreen,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: radius.small,
    resizeMode: "cover",
  },
  stockCon: {
    gap: 4,
  },
  pname: {
    fontSize: Fonts.medium,
    fontWeight: "500",
    color: Colors.mainColor,
  },
  stock: {
    fontSize: Fonts.small,
    color: Colors.darkCharcoal,
  },
  addQCon: {
    gap: 10,
  },
  qContainer: {
    flexDirection: "row",
    gap: 10,
  },
  quantityButton: {},
  addButton: {
    paddingHorizontal: 5,
    paddingVertical: 4,
    borderRadius: radius.small,
    backgroundColor: Colors.mainColor,
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  ButtonText: {
    fontSize: Fonts.medium,
    color: Colors.white,
    fontWeight: "500",
  },
});
