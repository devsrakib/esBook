import { View,StyleSheet, TouchableOpacity, Text } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import {  Fonts } from "@/constants/Fonts";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import { FontAwesome } from "@expo/vector-icons";
import { radius } from "@/constants/sizes";

const UserViewHome = ({data}:any) => {

  if(!data)return

  const capitalizeFirstLetter = (text: string) => {
    if (!text) return "";
    return text?.charAt(0)?.toUpperCase() + text?.slice(1);
  };

  return (
    <View style={styles.container}>
      {/* <Image style={styles.userAvatar} /> */}
      <Animated.View
        entering={FadeInUp.delay(50).duration(50)}
        style={styles.avatarContainer}
      >
        {data?.data[0]?.profile_photo ? (
          <Animated.Image
            entering={FadeInUp.delay(50).duration(50)}
            source={{ uri: data?.data[0]?.profile_photo }}
            style={styles.userAvatar}
          />
        ) : (
          <Animated.Text style={styles.placeholder}>
            {data?.data[0]?.name?.split("")[0]?.toUpperCase()}
          </Animated.Text>
        )}
      </Animated.View>
      <View style={styles.textContainer}>
        <Animated.Text
          entering={FadeInDown.delay(50).duration(200)}
          style={styles.text1}
        >
          Store Owner,
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(50).duration(200).damping(80).springify().stiffness(200)}
          style={styles.userName}
        >
          {capitalizeFirstLetter(data?.data[0]?.name)}
        </Animated.Text>
      </View>
      <TouchableOpacity style={styles.bellCon}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            3
          </Text>
        </View>
      <FontAwesome name="bell-o" size={20} color={Colors.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    gap: 15,
  },
  avatarContainer: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
  },
  userAvatar: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  textContainer: {
    flex: 1,
  },
  text1: {
    fontSize: Fonts.small,
    color: Colors.text,
  },
  userName: {
    fontWeight: "bold",
  },
  magnify: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholder: {
    fontSize: Fonts.large,
    color: Colors.text, // Use the function to get a random color
  },
  bellCon:{
    width: 46,
    height: 46,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center', 
    justifyContent: 'center',
    marginRight: 10
  },
  badge:{
    width: 20,
    height: 20,
    backgroundColor: 'red',
    position: 'absolute',
    top:-7,
    right: 0,
    borderRadius: radius.xxl,
    alignItems: 'center',
    justifyContent:'center',
  },
  badgeText:{
    fontSize: Fonts.small,
    color: Colors.white,

  }
});
export default UserViewHome;
