import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
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
import { useRouter, useSegments } from "expo-router";
import { Colors } from "@/constants/Colors";

const CustomTabBar = ({ data, profile }: { data: any; profile: any }) => {
  const router = useRouter();
  const segments = useSegments();

  const getFocused = (name: string) => segments.includes(name as never);

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

    return <Animated.View style={animatedStyle}>{iconComponent}</Animated.View>;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => router.push("/(tabs)/home")}
      >
        <AnimatedIcon
          focused={getFocused("index")}
          iconComponent={
            <Entypo
              name="home"
              size={24}
              color={getFocused("index") ? Colors.mainColor : Colors.labelText}
            />
          }
        />
        <Text
          style={[
            styles.label,
            { color: getFocused("index") ? Colors.mainColor : Colors.black },
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => router.push("/product")}
      >
        <FontAwesome
          name="cubes"
          size={20}
          color={getFocused("product") ? Colors.mainColor : Colors.labelText}
        />
        <Text
          style={[
            styles.label,
            { color: getFocused("product") ? Colors.mainColor : Colors.black },
          ]}
        >
          Products
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => router.push("/slip")}
      >
        <SimpleLineIcons
          name="notebook"
          size={22}
          color={getFocused("slip") ? Colors.mainColor : Colors.labelText}
        />
        <Text
          style={[
            styles.label,
            { color: getFocused("slip") ? Colors.mainColor : Colors.black },
          ]}
        >
          Slip
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => router.push("/Cash")}
      >
        <MaterialCommunityIcons
          name="account-cash"
          size={24}
          color={getFocused("Cash") ? Colors.mainColor : Colors.labelText}
        />
        <Text
          style={[
            styles.label,
            { color: getFocused("Cash") ? Colors.mainColor : Colors.black },
          ]}
        >
          Cash
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => router.push("/profile")}
      >
        {data?.data[0]?.profile_photo ? (
          <Image
            style={[
              styles.profileImage,
              {
                borderColor: getFocused("profile")
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
                borderColor: getFocused("profile")
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
            color={getFocused("profile") ? Colors.mainColor : Colors.labelText}
          />
        )}
        <Text
          style={[
            styles.label,
            { color: getFocused("profile") ? Colors.mainColor : Colors.black },
          ]}
        >
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
    backgroundColor: Colors.white,
    borderRadius: 50,
    elevation: 10,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  label: {
    fontSize: 12,
    marginTop: 5,
  },
  profileImage: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
  },
});

export default CustomTabBar;
