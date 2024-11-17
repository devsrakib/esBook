import { Tabs } from "expo-router";
import React, { ReactNode, useEffect, useState } from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useSQLiteContext } from "expo-sqlite";
import { getOwnerProfile } from "@/databases/Database";
import useApiHook from "@/hooks/all_api_hooks";

const { width } = Dimensions.get("window");

const isTablet = width >= 600;
export default function TabLayout() {
  // const [profile, setProfile] = useState<any>();
  const { data } = useApiHook("owners/");

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

  // useEffect(() => {
  //   async function getData() {
  //     const result: any = await getOwnerProfile(db);
  //     setProfile(result[0]);
  //   }
  //   getData();
  // }, []);
  console.log(data);

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
                name="cubes"
                size={20}
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
              <SimpleLineIcons name="notebook" size={22} />
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
              <MaterialCommunityIcons name="account-cash" />
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
              {data?.data[0]?.profile_photo ? (
                <Image
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 50,
                    borderColor: focused ? Colors.mainColor : Colors.labelText,
                    borderWidth: 2,
                  }}
                  source={{ uri: data.data[0].profile_photo }}
                />
              ) : profile?.profilePhoto ? (
                <Image
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 50,
                    borderColor: focused ? Colors.mainColor : Colors.labelText,
                    borderWidth: 2,
                  }}
                  source={{ uri: profile.profilePhoto }}
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
                {focused ? data?.data[0]?.name || profile?.name : "Profile"}
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

    width: isTablet ? 120 : "100%",
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
