

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/UI/header/Header";
import { radius } from "@/constants/sizes";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import SupplierProduct from "@/components/UI/products/SupplierProduct";
import useApiHook from "@/hooks/all_api_hooks";
import ProfileView from "@/components/UI/ProfileView";

const segment = ["product", "transaction", "due"];

const SellerInfo = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { top } = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const { data, loading } = useApiHook(`product/?supplier=${params?.id}`);

  // Handle segment item rendering
  const renderItem = useCallback(
    ({ item, index }) => {
      const isSelected = selectedIndex === index;
      return (
        <TouchableOpacity
          style={[
            styles.segmentItem,
            { backgroundColor: isSelected ? Colors.mainColor : Colors.white },
          ]}
          onPress={() => setSelectedIndex(index)}
        >
          <Text
            style={[
              styles.segmentText,
              { color: isSelected ? Colors.white : Colors.mainColor },
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      );
    },
    [selectedIndex]
  );

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />

      <Header
        children="Seller Information"
        backgroundColor={Colors.mainColor}
        textColor={Colors.white}
      />

     <View style={styles.body}>
       {/* ProfileView Section */}
       <ProfileView id={params?.id} />

{/* FlatList Section for Segment */}
<View>
  <FlatList
    data={segment}
    renderItem={renderItem}
    horizontal
    contentContainerStyle={styles.content}
  />
</View>

{/* Content Based on Selected Segment */}
<View style={styles.subBodyCon}>
  {selectedIndex === 0 ? (
    <FlatList
      data={data?.data}
      contentContainerStyle={{
        gap: 10,
        paddingVertical: 20,
      }}
      renderItem={({ item }) => <SupplierProduct item={item} />}
    />
  ) : selectedIndex === 1 ? (
    <Text>"Transaction Section"</Text> // You can implement the transaction section here
  ) : (
    <Text>"Due Section"</Text> // Implement the due section here
  )}
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
  body:{
    paddingTop: 20,
    flex: 1
  }
  ,
  content: {
    gap: 10,
    marginTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 10
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
  subBodyCon: {
    flex: 1,
  },
  profileSection: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  profileCon: {
    borderRadius: 50,
    overflow: "hidden",
    marginRight: 16,
  },
  profile: {
    width: 70,
    height: 70,
  },
  infoCon: {
    flex: 1,
    justifyContent: "center",
  },
  shopNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  shopName: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.darkCharcoal,
  },
  editCon: {
    padding: 8,
    backgroundColor: Colors.lightGray,
    borderRadius: radius.small,
  },
  owner: {
    marginTop: 8,
    color: Colors.text,
    fontSize: 14,
  },
  callIconCon: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  phoneNumber: {
    fontSize: 14,
    color: Colors.darkCharcoal,
    marginRight: 10,
  },
  callIcon: {
    backgroundColor: Colors.lightGray,
    padding: 6,
    borderRadius: 5,
  },
});
