import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Link, Stack } from "expo-router";
import Header from "@/components/UI/header/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { radius } from "@/constants/sizes";
import { Fonts } from "@/constants/Fonts";
import Animated, { FadeInDown } from "react-native-reanimated";

const slip = () => {
  const { top } = useSafeAreaInsets();
  const CustomLink = Animated.createAnimatedComponent(Link);
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />

      <Header
        children="Seller information"
        backgroundColor={Colors.mainColor}
        textColor={Colors.white}
      />
      <View style={styles.body}>
        <View style={styles.segmentCon}>
          <CustomLink
            href={"/pages/slip/CreateSlip"}
            asChild
            entering={FadeInDown.damping(80)
              .duration(400)
              // .delay(100)
              .springify()
              .stiffness(200)}
            style={styles.segments}
          >
            <TouchableOpacity>
              <FontAwesome name="book" size={20} color={Colors.mainColor} />
              <View>
                <Text style={styles.segmentText}>Create Slip</Text>
              </View>
            </TouchableOpacity>
          </CustomLink>

          <CustomLink
            href={"/pages/slip/SlipHistory"}
            asChild
            entering={FadeInDown.damping(80)
              .duration(400)
              // .delay(100)
              .springify()
              .stiffness(200)}
            style={styles.segments}
          >
            <TouchableOpacity>
              <FontAwesome name="history" size={20} color={Colors.mainColor} />
              <View>
                <Text style={styles.segmentText}>History</Text>
              </View>
            </TouchableOpacity>
          </CustomLink>
        </View>
      </View>
    </View>
  );
};

export default slip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.page_bg,
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  segmentCon: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    flexWrap: "wrap",
  },
  segments: {
    width: "48%",
    shadowColor: Colors.text,
    elevation: 15,
    borderRadius: radius.small,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: Colors.white,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  segmentText: {
    fontSize: Fonts.medium,
    color: Colors.darkCharcoal,
    fontWeight: "bold",
  },
});
