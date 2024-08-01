import React, { Fragment, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Divider from "@/components/UI/Divider";
import { Fonts } from "@/constants/Fonts";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "@/components/UI/Button";
import { useSQLiteContext } from "expo-sqlite";
import {
  getOwnerProfile,
  update_owner_profile,
  OwnerProfileData,
} from "@/databases/Database";
import useImagePicker from "@/utils/UseImagePicker";

const OwnerProfile = () => {
  const { bottom, top } = useSafeAreaInsets();
  const [getProfileData, setGetProfileData] = useState<any | null>(null);
  const { selectedImage, pickImage } = useImagePicker();
  const [focusInput, setFocusInput] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<any>({
    id: 0,
    profilePhoto: "",
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
    taxNumber: "", // Added taxNumber to match the table schema
  });

  const db = useSQLiteContext();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileArray = await getOwnerProfile(db);
        if (profileArray && profileArray.length > 0) {
          const profile = profileArray[0];
          setGetProfileData(profile);
          setProfileData(profile); // Initialize profileData after fetching
        } else {
          console.log("No profile found.");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [db]);

  const handleInputChange = (value: any, key: string) => {
    setProfileData((prevState: any) => ({
      ...prevState,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (selectedImage) {
      setProfileData((prevState: any) => ({
        ...prevState,
        profilePhoto: selectedImage,
      }));
    }
  }, [selectedImage]);

  const handleSaveProfileInfo = async () => {
    try {
      await update_owner_profile(db, profileData);
      console.log("Profile updated successfully:", profileData);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const infoData = [
    {
      icon: <Ionicons name="person-outline" size={18} color="gray" />,
      label: "Name",
      key: "name",
    },
    {
      icon: <MaterialIcons name="email" size={18} color="gray" />,
      label: "Email",
      key: "email",
    },
    {
      icon: <Ionicons name="location-outline" size={18} color="gray" />,
      label: "Address",
      key: "address",
    },
    {
      icon: <Ionicons name="call-outline" size={18} color="gray" />,
      label: "Phone",
      key: "phoneNumber",
    },
    {
      icon: <Ionicons name="call-outline" size={18} color="gray" />,
      label: "Tax Number",
      key: "taxNumber",
    },
  ];

  console.log(profileData);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { paddingBottom: bottom, paddingTop: top },
      ]}
    >
      <TouchableOpacity
        onPress={() => pickImage()}
        style={styles.profileContainer}
      >
        {profileData.profilePhoto ? (
          <Image
            source={{ uri: profileData.profilePhoto }}
            style={styles.profileImage}
          />
        ) : (
          <Image
            source={require("../../../assets/images/placeholder.jpeg")}
            style={styles.profileImage}
          />
        )}
        <Text style={styles.profileName}>{profileData.name}</Text>
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        {infoData.map((item, index) => (
          <Fragment key={index.toString()}>
            <View style={styles.infoRow}>
              <View style={styles.iconCon}>{item?.icon}</View>
              <View style={styles.infoColumn}>
                <Text style={styles.label}>{item?.label}</Text>
                <TextInput
                  style={styles.input}
                  value={profileData[item?.key as keyof OwnerProfileData] || ""}
                  onChangeText={(e) => handleInputChange(e, item?.key)}
                  onTouchStart={() => setFocusInput(true)}
                />
              </View>
            </View>
            <Divider height={1} width={"100%"} aligns={"center"} />
          </Fragment>
        ))}
      </View>
      {focusInput && (
        <Button
          title="Update"
          bg={Colors.mainColor}
          titleColor={Colors.white}
          radius={20}
          width={"90%"}
          onPress={handleSaveProfileInfo}
        />
      )}
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
    resizeMode: "cover",
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
