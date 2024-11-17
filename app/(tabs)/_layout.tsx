import { Tabs } from "expo-router";
import React, { ReactNode, useEffect, useState } from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
<<<<<<< HEAD
import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
=======
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useSQLiteContext } from "expo-sqlite";
import { getOwnerProfile } from "@/databases/Database";
<<<<<<< HEAD
import useApiHook from "@/hooks/all_api_hooks";
=======
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b

const { width } = Dimensions.get("window");

const isTablet = width >= 600;
export default function TabLayout() {
<<<<<<< HEAD
  // const [profile, setProfile] = useState<any>();

  const { data } = useApiHook("owners/");
=======
  const [profile, setProfile] = useState<any>();
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
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

<<<<<<< HEAD
  // useEffect(() => {
  //   async function getData() {
  //     const result: any = await getOwnerProfile(db);
  //     setProfile(result[0]);
  //   }
  //   getData();
  // }, []);
  console.log(data);
=======
  useEffect(() => {
    async function getData() {
      const result: any = await getOwnerProfile(db);
      setProfile(result[0]);
    }
    getData();
  }, []);
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b

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
<<<<<<< HEAD
                name="cubes"
                size={20}
=======
                name="user"
                size={24}
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
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
<<<<<<< HEAD
              <SimpleLineIcons
                name="notebook"
                size={22}
=======
              <FontAwesome
                name="user"
                size={24}
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
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
<<<<<<< HEAD
              <MaterialCommunityIcons
                name="account-cash"
=======
              <FontAwesome
                name="user"
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
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
<<<<<<< HEAD
              {data?.data[0]?.profile_photo ? (
=======
              {profile ? (
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
                <Image
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 50,
                    borderColor: focused ? Colors.mainColor : Colors.labelText,
                    borderWidth: 2,
                  }}
<<<<<<< HEAD
                  source={{ uri: data?.data[0]?.profile_photo }}
                />
              ) : (
                <FontAwesome5 name="store" size={20} color={Colors.labelText} />
=======
                  source={{ uri: profile?.profilePhoto }}
                />
              ) : (
                <FontAwesome
                  name="user"
                  size={24}
                  color={focused ? Colors.mainColor : Colors.labelText}
                />
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
              )}
              <Text
                style={[
                  styles.title,
                  { color: focused ? Colors.mainColor : Colors.black },
                ]}
              >
<<<<<<< HEAD
                {focused ? data?.data[0]?.name : "Store"}
=======
                {focused ? profile?.name : "Profile"}
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
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
<<<<<<< HEAD
    width: isTablet ? 120 : "100%",
=======
    width: isTablet ? 120 : 40,
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
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
