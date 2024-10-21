import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { FlipInEasyX } from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/UI/header/Header";
import { radius } from "@/constants/sizes";
import { Fonts } from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";

const SellerInfo = () => {
  const segment = ["product", "transaction", "due"];
  const { top } = useSafeAreaInsets();

  const renderItem = ({ item }: { item: string }) => {
    return (
      <TouchableOpacity style={styles.segmentItem}>
        <Text style={styles.segmentText}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />

      <Header
        children="Seller information"
        backgroundColor={Colors.mainColor}
        textColor={Colors.white}
      />

      <View style={styles.body}>
        <View style={styles.profileSection}>
          <View style={styles.profileCon}>
            <Image
              style={styles.profile}
              source={require("../../../assets/images/picture.png")}
            />
          </View>
          <View style={styles.infoCon}>
            <Text style={styles.shopName}>Farvez and brothers</Text>
            <Text style={styles.owner}>pro: sanaullah donu</Text>
            <View style={styles.callIconCon}>
              <Text style={styles.phoneNumber}>Phone: 01601113299</Text>
              <TouchableOpacity style={styles.callIcon}>
                <Ionicons name="call" size={16} color={Colors.mainColor} />
              </TouchableOpacity>
            </View>
            <Text style={styles.location}>
              Location: chaprashir hat, poschim bajar
            </Text>
          </View>
        </View>

        <View>
          <FlatList
            data={segment}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={styles.content}
          />
        </View>
      </View>
    </View>
  );
};

export default SellerInfo;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.page_bg,
  },
  body: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  profileSection: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: Colors.white,
    padding: 8,
    borderRadius: radius.small,
    shadowColor: Colors.darkCharcoal,
    elevation: 10,
  },
  profileCon: {
    borderRadius: radius.small,
    shadowColor: Colors.darkCharcoal,
    elevation: 15,
    backgroundColor: Colors.white,
  },
  profile: {
    width: 90,
    height: 90,
    borderRadius: radius.small,
    resizeMode: "cover",
    // borderWidth: 1,
    // borderColor: Colors.mainColor,
  },
  infoCon: {
    flex: 1,
  },
  shopName: {
    fontSize: Fonts.large,
    color: Colors.mainColor,
    fontWeight: "600",
  },
  owner: {
    fontSize: Fonts.regular,
    color: Colors.darkCharcoal,
    fontWeight: "500",
  },
  phoneNumber: {
    fontWeight: "500",
    fontSize: Fonts.regular,
    color: Colors.darkCharcoal,
  },
  callIconCon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  callIcon: {
    backgroundColor: Colors.white,
    borderRadius: radius.small,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    shadowColor: Colors.mainColor,
    elevation: 5,
    borderWidth: 1,
    borderColor: Colors.mainColor,
  },
  location: {
    fontWeight: "500",
    fontSize: Fonts.regular,
    color: Colors.darkCharcoal,
  },
  content: {
    gap: 10,
    marginTop: 20,
  },
  segmentItem: {
    paddingHorizontal: 10,
    borderRadius: radius.small,
    backgroundColor: Colors.mainColor,
    paddingVertical: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentText: {
    color: Colors.white,
    fontWeight: "500",
  },
});
