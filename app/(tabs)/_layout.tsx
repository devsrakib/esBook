import { Tabs } from "expo-router";
import React, { ReactNode, useEffect, useState } from "react";

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
import { useSQLiteContext } from "expo-sqlite";
import { getOwnerProfile } from "@/databases/Database";

export default function TabLayout() {
  const [profile, setProfile] = useState<any>();
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

  const db = useSQLiteContext();

  useEffect(() => {
    async function getData() {
      const result: any = await getOwnerProfile(db);
      setProfile(result[0]);
    }
    getData();
  }, []);

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
        name="product"
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
                Products
              </Text>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="slip"
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
                Slip
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Cash"
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
                Cash
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
            <View style={[styles.container]}>
              {profile ? (
                <Image
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 50,
                    borderColor: focused ? Colors.mainColor : Colors.labelText,
                    borderWidth: 2,
                  }}
                  source={{ uri: profile?.profilePhoto }}
                />
              ) : (
                <FontAwesome
                  name="user"
                  size={24}
                  color={focused ? Colors.mainColor : Colors.labelText}
                />
              )}
              <Text
                style={[
                  styles.title,
                  { color: focused ? Colors.mainColor : Colors.black },
                ]}
              >
                {focused ? profile?.name : "Profile"}
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
