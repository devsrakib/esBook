import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
<<<<<<< HEAD
import React, { useCallback, useMemo, useState } from "react";
import { Link, Stack, useLocalSearchParams } from "expo-router";
=======
import React from "react";
import { Link, Stack } from "expo-router";
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
import Animated, { FadeInDown, FlipInEasyX } from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/UI/header/Header";
import { radius } from "@/constants/sizes";
import { Fonts } from "@/constants/Fonts";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import ProfileView from "@/components/UI/shared/ProfileView";
<<<<<<< HEAD
import Product from "@/app/(tabs)/product";
import SupplierProduct from "@/components/UI/products/SupplierProduct";
import useApiHook from "@/hooks/all_api_hooks";

const segment = ["product", "transaction", "due"];
const SellerInfo = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { top } = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const { data, loading } = useApiHook(`product/?supplier=${params?.id}`);
  const MemoizedFlatList = React.memo(FlatList);

  const renderItem = useCallback(
    ({ item, index }: { item: string; index: number }) => {
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
=======

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
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: "modal",
          animation: "slide_from_right",
        }}
      />

      <Header
        children="Seller information"
        backgroundColor={Colors.mainColor}
        textColor={Colors.white}
      />

<<<<<<< HEAD
      <Animated.View style={styles.body}>
        {/* Profile Section */}
        <ProfileView id={params?.id} />

        {/* FlatList Section */}
        <View>
          <MemoizedFlatList
=======
      {/* <View style={styles.body}>
        <View style={styles.profileSection}>
          <View style={styles.profileCon}>
            <Image
              style={styles.profile}
              source={require("../../../assets/images/picture.png")}
            />
          </View>
          <View style={styles.infoCon}>
            <View style={styles.shopNameContainer}>
              <Text style={styles.shopName}>Farvez and brothers</Text>
              <Link href={"/pages/product/SupplierEdit"} asChild>
                <TouchableOpacity style={styles.editCon}>
                  <FontAwesome5
                    name="user-edit"
                    size={18}
                    color={Colors.darkCharcoal}
                  />
                </TouchableOpacity>
              </Link>
            </View>
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
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
            data={segment}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={styles.content}
          />
        </View>
<<<<<<< HEAD
        <View style={styles.subBodyCon}>
          {selectedIndex === 0 ? (
            <FlatList
              data={data?.data}
              contentContainerStyle={{
                gap: 10,
                paddingVertical: 20,
              }}
              renderItem={({ item }) => {
                return <SupplierProduct item={item} />;
              }}
            />
          ) : selectedIndex === 1 ? (
            <Text>"transaction"</Text>
          ) : (
            <Text>"due"</Text>
          )}
=======
      </View> */}

      <Animated.View style={styles.body}>
        {/* Profile Section */}
        <ProfileView />

        {/* FlatList Section */}
        <View>
          <FlatList
            data={segment}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={styles.content}
          />
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
        </View>
      </Animated.View>
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
<<<<<<< HEAD
    // paddingHorizontal: 16,
=======
    paddingHorizontal: 16,
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
  },

  content: {
    gap: 10,
    marginTop: 20,
<<<<<<< HEAD
    paddingHorizontal: 16,
=======
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
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
<<<<<<< HEAD
  subBodyCon: {
    flex: 1,
  },
=======
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
});
