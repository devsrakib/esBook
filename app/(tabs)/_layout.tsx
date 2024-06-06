import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Image, StyleSheet, Text, View } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
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
              {focused ? (
                <Image
                  style={[styles.icon, { width: 30, height: 30 }]}
                  source={require("../../assets/images/activeHome.png")}
                />
              ) : (
                <Image
                  style={[styles.icon, { width: 30, height: 30 }]}
                  source={require("../../assets/images/home.png")}
                />
              )}
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
              {focused ? (
                <Image
                  style={[
                    styles.icon,
                    { width: 26, height: 26, marginBottom: 3 },
                  ]}
                  source={require("../../assets/images/activeCashbox.png")}
                />
              ) : (
                <Image
                  style={[
                    styles.icon,
                    { width: 26, height: 26, marginBottom: 3 },
                  ]}
                  source={require("../../assets/images/cashbox.png")}
                />
              )}
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
              {focused ? (
                <Image
                  style={[styles.icon, { marginRight: 1 }]}
                  source={require("../../assets/images/activeParties.png")}
                />
              ) : (
                <Image
                  style={[styles.icon]}
                  source={require("../../assets/images/parties.png")}
                />
              )}
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
              {focused ? (
                <Image
                  style={[styles.icon]}
                  source={require("../../assets/images/activeUser.png")}
                />
              ) : (
                <Image
                  style={[styles.icon]}
                  source={require("../../assets/images/user.png")}
                />
              )}
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
