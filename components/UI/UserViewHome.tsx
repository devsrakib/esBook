import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Fontisto } from "@expo/vector-icons";
import { FontW, Fonts } from "@/constants/Fonts";
import { useSQLiteContext } from "expo-sqlite";
import { getOwnerProfile } from "@/databases/Database";
import { IOwner } from "@/types/interfaces/home/owner.interface";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import axios from "axios";
<<<<<<< HEAD
import useApiHook, { apiUrl } from "@/hooks/all_api_hooks";

const UserViewHome = () => {
  // const [data, setData] = useState<IOwner>({
  //   profilePhoto: null,
  //   name: "",
  //   email: "",
  //   address: "",
  //   phoneNumber: "",
  //   taxNumber: 0,
  //   createdAt: "",
  //   id: "",
  // });

  const db = useSQLiteContext();
  const { data } = useApiHook("owners/");
  console.log(data);

  // useEffect(() => {
  //   const getProfile = async () => {
  //     const result = await getOwnerProfile(db);
  //     // const user_data = result?.length > 0 ? result[0] : null;
  //     const user_data = response?.data?.results[0];

  //     console.log(user_data);

  //     setData(user_data as IOwner);
  //   };
  //   getProfile();
  // }, []);
=======
import { apiUrl } from "@/hooks/all_api_hooks";

const UserViewHome = () => {
  const [data, setData] = useState<IOwner>({
    profilePhoto: null,
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
    taxNumber: 0,
    createdAt: "",
    id: "",
  });

  const db = useSQLiteContext();

  useEffect(() => {
    const getProfile = async () => {
      const response = await axios.get(apiUrl + "owners");
      const result = await getOwnerProfile(db);
      // const user_data = result?.length > 0 ? result[0] : null;
      const user_data = response?.data?.results[0];

      console.log(user_data);

      setData(user_data as IOwner);
    };
    getProfile();
  }, []);
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b

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
<<<<<<< HEAD
        {data?.data[0]?.profilePhoto ? (
          <Animated.Image
            entering={FadeInUp.delay(50).duration(50)}
            source={{ uri: data?.data[0]?.profilePhoto }}
=======
        {data?.profilePhoto ? (
          <Animated.Image
            entering={FadeInUp.delay(50).duration(50)}
            source={{ uri: data?.profilePhoto }}
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
            style={styles.userAvatar}
          />
        ) : (
          <Animated.Text style={styles.placeholder}>
<<<<<<< HEAD
            {data?.data[0]?.name?.split("")[0]?.toUpperCase()}
=======
            {data?.name?.split("")[0]?.toUpperCase()}
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
          </Animated.Text>
        )}
      </Animated.View>
      <View style={styles.textContainer}>
        <Animated.Text
          entering={FadeInDown.delay(50).duration(200)}
          style={styles.text1}
        >
<<<<<<< HEAD
          Store Owner,
=======
          Hello,
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(50).duration(200).damping(6).springify()}
          style={styles.userName}
        >
<<<<<<< HEAD
          {capitalizeFirstLetter(data?.data[0]?.name)}
=======
          {capitalizeFirstLetter(data?.name)}
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
        </Animated.Text>
      </View>
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
});
export default UserViewHome;
