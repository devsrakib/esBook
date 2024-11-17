import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import Animated, { FadeInDown, FlipInEasyX } from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/UI/header/Header";
import { radius } from "@/constants/sizes";
import { Fonts } from "@/constants/Fonts";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import ProfileView from "@/components/UI/shared/ProfileView";
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

      <Animated.View style={styles.body}>
        {/* Profile Section */}
        <ProfileView id={params?.id} />

        {/* FlatList Section */}
        <View>
          <MemoizedFlatList
            data={segment}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={styles.content}
          />
        </View>
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
    // paddingHorizontal: 16,
  },

  content: {
    gap: 10,
    marginTop: 20,
    paddingHorizontal: 16,
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
});
