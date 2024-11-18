import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import { useSQLiteContext } from "expo-sqlite";
import { getOwnerProfile } from "@/databases/Database";
import useApiHook from "@/hooks/all_api_hooks";

const { width } = Dimensions.get("window");
const isTablet = width >= 600;

export default function TabLayout() {
  const { data } = useApiHook("owners/");
  const [profile, setProfile] = useState<any>();
  const db = useSQLiteContext();

  useEffect(() => {
    async function getData() {
      const result: any = await getOwnerProfile(db);
      setProfile(result[0]);
    }
    getData();
  }, []);

  const AnimatedIcon = ({
    focused,
    iconComponent,
  }: {
    focused: boolean;
    iconComponent: any;
  }) => {
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: withSpring(focused ? 1.2 : 1) }],
    }));

    return (
      <Animated.View style={[animatedStyle]}>{iconComponent}</Animated.View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBarStyle,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIconStyle: {
            width: "100%",
          },
          title: "",
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <FontAwesome
                name="home"
                size={22}
                color={focused ? Colors.mainColor : Colors.labelText}
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
          tabBarIconStyle: {
            width: "100%",
          },
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
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
          tabBarIconStyle: {
            width: "100%",
          },
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <SimpleLineIcons
                name="notebook"
                size={22}
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
          tabBarIconStyle: {
            width: "100%",
          },
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="account-cash"
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
          tabBarIconStyle: {
            width: "100%",
          },
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              {data?.data[0]?.profile_photo ? (
                <Image
                  style={[
                    styles.profileImage,
                    {
                      borderColor: focused
                        ? Colors.mainColor
                        : Colors.labelText,
                    },
                  ]}
                  source={{ uri: data.data[0].profile_photo }}
                />
              ) : profile?.profilePhoto ? (
                <Image
                  style={[
                    styles.profileImage,
                    {
                      borderColor: focused
                        ? Colors.mainColor
                        : Colors.labelText,
                    },
                  ]}
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
  tabBarStyle: {
    height: 70,
    backgroundColor: Colors.white,
    paddingTop: 20,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    height: 50,
  },
  title: {
    fontSize: 12,
    marginTop: 3,
  },
  profileImage: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
  },
});
