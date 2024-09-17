import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Fontisto } from "@expo/vector-icons";
import { FontW, Fonts } from "@/constants/Fonts";
import { useSQLiteContext } from "expo-sqlite";
import { getOwnerProfile } from "@/databases/Database";
import { IOwner } from "@/types/interfaces/home/owner.interface";

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
      const result = await getOwnerProfile(db);
      const user_data = result?.length > 0 ? result[0] : null;

      setData(user_data as IOwner);
    };
    getProfile();
  }, []);

  const capitalizeFirstLetter = (text: string) => {
    if (!text) return "";
    return text?.charAt(0)?.toUpperCase() + text?.slice(1);
  };

  return (
    <View style={styles.container}>
      {/* <Image style={styles.userAvatar} /> */}
      <View style={styles.avatarContainer}>
        {data?.profilePhoto ? (
          <Image
            source={{ uri: data?.profilePhoto }}
            style={styles.userAvatar}
          />
        ) : (
          <Text style={styles.placeholder}>
            {data?.name?.split("")[0]?.toUpperCase()}
          </Text>
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text1}>Hello,</Text>
        <Text style={styles.userName}>{capitalizeFirstLetter(data?.name)}</Text>
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
