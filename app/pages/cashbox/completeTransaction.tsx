import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
} from "react-native";
import React from "react";
import { currency } from "@/global/currency";
import { Fonts } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";
import { radius } from "@/constants/sizes";
import { Stack } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import Divider from "@/components/UI/Divider";
import { EvilIcons } from "@expo/vector-icons";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

const Page = () => {
  const shareFile = async () => {
    const data = "This is the text data I want to share";
    const fileUri = FileSystem.documentDirectory + "shared_text.txt";

    // Write the text data to a file
    await FileSystem.writeAsStringAsync(fileUri, data);

    // Check if sharing is available
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }

    // Share the file
    await Sharing.shareAsync(fileUri);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
          animationDuration: 100,
        }}
      />
      <Image
        style={styles.logo}
        source={require("../../../assets/images/transactionLogo.png")}
      />
      <AntDesign
        name="close"
        size={24}
        color={Colors.text}
        style={styles.close}
      />
      <Text style={styles.title}>Complete Your Transaction</Text>
      <View style={styles.dataCon}>
        <View style={styles.imgCon}>
          <Image
            style={styles.img}
            source={require("../../../assets/images/DUser.png")}
          />
          <Text adjustsFontSizeToFit>Nazrul Islam</Text>
        </View>
        <View style={styles.subCon}>
          <Text adjustsFontSizeToFit>Date</Text>
          <Text adjustsFontSizeToFit>05,jun 2024</Text>
        </View>
        <View style={styles.subCon}>
          <Text adjustsFontSizeToFit>Previews Cash</Text>
          <Text adjustsFontSizeToFit>{currency}1,500</Text>
        </View>
        <View style={styles.subCon}>
          <Text adjustsFontSizeToFit>Cash Sell</Text>
          <Text adjustsFontSizeToFit>{currency}500</Text>
        </View>
        <View style={styles.subCon}>
          <Text adjustsFontSizeToFit>Due</Text>
          <Text adjustsFontSizeToFit>{currency}500</Text>
        </View>
        <Divider height={1} width={"100%"} aligns={"center "} />
        <View style={styles.subCon}>
          <Text adjustsFontSizeToFit>Current Cash</Text>
          <Text adjustsFontSizeToFit>{currency}1,500</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => shareFile()} style={styles.shareCon}>
        <EvilIcons name="share-google" size={32} color={Colors.mainColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 30,
    backgroundColor: Colors.white,
    paddingTop: 80,
  },
  logo: {
    width: 300,
    height: 200,
    resizeMode: "contain",
  },
  title: {
    fontSize: Fonts.medium + 2,
    fontWeight: "500",
    letterSpacing: 0.6,
  },
  dataCon: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: radius.regular,
    padding: 16,
    width: "90%",
    gap: 20,
  },
  close: {
    position: "absolute",
    top: 50,
    right: 30,
  },
  subCon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imgCon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  img: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  shareCon: {
    position: "absolute",
    bottom: 70,
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.mainColor,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Page;
