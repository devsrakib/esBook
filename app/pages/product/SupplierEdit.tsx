import { View, StyleSheet, ScrollView, TextInput } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Colors } from "@/constants/Colors";
import Header from "@/components/UI/header/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import Button from "@/components/UI/Button";
import { radius } from "@/constants/sizes";
const SupplierEdit = () => {
  const { top } = useSafeAreaInsets();
  const CustomTextInput = Animated.createAnimatedComponent(TextInput);

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: "modal",
          animation: "slide_from_right",
          animationDuration: 100,
        }}
      />

      <Header
        children="Seller information"
        backgroundColor={Colors.mainColor}
        textColor={Colors.white}
      />

      <ScrollView contentContainerStyle={styles.form}>
        {/* Shop Name */}
        <Animated.Text
          entering={FadeInDown.delay(100).duration(400).damping(80).springify()}
          style={styles.label}
        >
          Shop Name
        </Animated.Text>
        <CustomTextInput
          entering={FadeInDown.delay(100).duration(400).damping(80).springify()}
          style={styles.input}
          placeholder="Enter shop name"
          placeholderTextColor={Colors.text}
        />

        {/* Owner Name */}
        <Animated.Text
          entering={FadeInDown.delay(150).duration(400).damping(80).springify()}
          style={styles.label}
        >
          Owner Name
        </Animated.Text>
        <CustomTextInput
          entering={FadeInDown.delay(150).duration(400).damping(80).springify()}
          style={styles.input}
          placeholder="Enter owner name"
          placeholderTextColor={Colors.text}
        />

        {/* Phone Number */}
        <Animated.Text
          entering={FadeInDown.delay(200).duration(400).damping(80).springify()}
          style={styles.label}
        >
          Phone Number
        </Animated.Text>
        <CustomTextInput
          entering={FadeInDown.delay(200).duration(400).damping(80).springify()}
          style={styles.input}
          placeholder="Enter phone number"
          placeholderTextColor={Colors.text}
          keyboardType="phone-pad"
        />

        {/* Location */}
        <Animated.Text
          entering={FadeInDown.delay(250).duration(400).damping(80).springify()}
          style={styles.label}
        >
          Location
        </Animated.Text>
        <CustomTextInput
          entering={FadeInDown.delay(250).duration(400).damping(80).springify()}
          style={styles.input}
          placeholder="Enter location"
          placeholderTextColor={Colors.text}
        />
        <Animated.View
          entering={FadeInDown.delay(300).duration(400).damping(80).springify()}
          style={styles.buttonCon}
        >
          <Button
            title="Update"
            titleColor={Colors.white}
            bg={Colors.mainColor}
            radius={radius.small}
            width={"100%"}
          />
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default SupplierEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.page_bg,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: Colors.mainColor,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 10,
    fontSize: 16,
    color: Colors.text,
    backgroundColor: Colors.white,
  },
  buttonCon: {
    marginTop: 100,
  },
});
