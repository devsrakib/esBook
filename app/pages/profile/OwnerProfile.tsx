import React, { Fragment, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Divider from "@/components/UI/Divider";
import { Fonts } from "@/constants/Fonts";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "@/components/UI/Button";
import { useSQLiteContext } from "expo-sqlite";
import {
  getExpense,
  getOwnerProfile,
  owner_profile,
  OwnerProfileData,
} from "@/databases/Database";

const OwnerProfile = () => {
  const { bottom, top } = useSafeAreaInsets();
  const [getProfileData, setGetProfileData] = useState<
    OwnerProfileData | any
  >();
  const [profileData, setProfileData] = useState<any>({
    profilePhoto: "this is my photo",
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
  });

  const handleInputChange = (value: any, key: any) => {
    setProfileData((prevState: any) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const db = useSQLiteContext();

  const infoData = [
    {
      icon: <Ionicons name="person-outline" size={18} color="gray" />,
      label: "Name",
      value: profileData.name,
      key: "name",
    },
    {
      icon: <MaterialIcons name="email" size={18} color="gray" />,
      label: "Email",
      value: profileData.email,
      key: "email",
    },
    {
      icon: <Ionicons name="location-outline" size={18} color="gray" />,
      label: "Address",
      value: profileData.address,
      key: "address",
    },
    {
      icon: <Ionicons name="call-outline" size={18} color="gray" />,
      label: "Phone",
      value: profileData.phone,
      key: "phoneNumber",
    },
  ];

  const handleSaveProfileInfo = async () => {
    await owner_profile(db, profileData);
    console.log(profileData);
  };

  useEffect(() => {
    async function profile() {
      const expense = await getOwnerProfile(db);
      setGetProfileData(expense);
    }
    profile();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { paddingBottom: bottom, paddingTop: top },
      ]}
    >
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: profileData.profileImage }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{profileData.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        {infoData.map((item, index) => (
          <Fragment key={index.toString()}>
            <View style={styles.infoRow}>
              <View style={styles.iconCon}>{item?.icon}</View>
              <View style={styles.infoColumn}>
                <Text style={styles.label}>{item?.label}</Text>
                <TextInput
                  style={styles.input}
                  // value={value}
                  onChangeText={(e) => handleInputChange(e, item?.key)}
                />
              </View>
            </View>
            <Divider height={1} width={"100%"} aligns={"center"} />
          </Fragment>
        ))}
      </View>
      <Button
        title="create profile"
        bg={Colors.mainColor}
        titleColor={Colors.white}
        radius={20}
        width={"90%"}
        onPress={() => handleSaveProfileInfo()}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.white,
  },
  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.mainColor,
    paddingBottom: 28,
    paddingTop: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
    resizeMode: "contain",
  },
  profileName: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  infoContainer: {
    padding: 16,
    backgroundColor: Colors.white,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 12,
  },
  iconCon: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderColor: Colors.border,
    marginRight: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: 16,
  },
  infoColumn: {
    flex: 1,
  },
  label: {
    fontSize: Fonts.regular,
    color: Colors.text,
  },
  input: {
    fontSize: Fonts.large,
    paddingVertical: 4,
    flex: 1,
  },
});

export default OwnerProfile;
