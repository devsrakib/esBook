import { Tabs } from "expo-router";
import React, { ReactNode } from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Image, StyleSheet, Text, View } from "react-native";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

export default function TabLayout() {
  const AnimatedIcon = ({
    focused,
    iconComponent,
  }: {
    focused: boolean;
    iconComponent: any;
  }) => {
    // Define animated style for scaling
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            scale: withSpring(focused ? 1 : 1), // Animate scale based on focus
          },
        ],
      };
    });

    return (
      <Animated.View style={[styles.container, animatedStyle]}>
        {iconComponent}
      </Animated.View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 70,
          paddingVertical: 10,
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.container}>
              <AnimatedIcon
                focused={focused}
                iconComponent={
                  <Entypo
                    name="home"
                    size={24}
                    color={focused ? Colors.mainColor : Colors.labelText}
                  />
                }
              />
              <Text
                style={[
                  styles.title,
                  { color: focused ? Colors.mainColor : Colors.black },
                ]}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="cashbox"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.container}>
              <Ionicons
                name="cash-outline"
                size={24}
                color={focused ? Colors.mainColor : Colors.labelText}
              />
              <Text
                style={[
                  styles.title,
                  { color: focused ? Colors.mainColor : Colors.black },
                ]}
              >
                Cash Box
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="parties"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.container}>
              <FontAwesome
                name="users"
                size={20}
                color={focused ? Colors.mainColor : Colors.labelText}
              />
              <Text
                style={[
                  styles.title,
                  { color: focused ? Colors.mainColor : Colors.black },
                ]}
              >
                Parties
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.container}>
              <FontAwesome
                name="user"
                size={24}
                color={focused ? Colors.mainColor : Colors.labelText}
              />
              <Text
                style={[
                  styles.title,
                  { color: focused ? Colors.mainColor : Colors.black },
                ]}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 12,
    marginTop: 3,
  },
  icon: {
    width: 28,
    height: 28,
  },
});
