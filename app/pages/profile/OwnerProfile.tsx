import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  StatusBar,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  FadeInDown,
} from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { radius } from "@/constants/sizes";
import useImagePicker from "@/utils/UseImagePicker";
import Button from "@/components/UI/Button";
import useApiHook from "@/hooks/all_api_hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import CustomStatusBar from "@/components/UI/CustomStatusBar";

const OwnerProfile = () => {
  const router = useRouter();
  const { selectedImage, pickImage } = useImagePicker();
  const [focusInput, setFocusInput] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<any>({
    id: 0,
    profilePhoto: "",
    name: "",
    email: "",
    address: "",
    phone: "",
    storeName: "",
    ownerName: "",
  });

  const { data: OwnerData, error } = useApiHook("owners/");

  const updateButtonWidth = useSharedValue(0);
  const logoutButtonWidth = useSharedValue(100);

  const translateY = useSharedValue(0); // To track scroll position
  const scale = useSharedValue(1); // To scale the profile image
  const left = useSharedValue(0); // To move profile image left

  const handleInputChange = (value: string, key: string) => {
    setProfileData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleFocus = () => {
    updateButtonWidth.value = withTiming(50);
    logoutButtonWidth.value = withTiming(50);
  };

  const handleSaveProfile = async () => {
    try {
      // Simulate saving profile
      ToastAndroid.show("Profile updated!", ToastAndroid.SHORT);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("access_token");
      router.replace("/pages/signUp/signUp");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    if (OwnerData && OwnerData?.data && OwnerData?.data?.length > 0) {
      setProfileData(OwnerData?.data[0]);
    }
  }, [OwnerData]);

  useEffect(() => {
    if (selectedImage) {
      setProfileData((prevState) => ({
        ...prevState,
        profilePhoto: selectedImage,
      }));
    }
  }, [selectedImage]);

  const infoData = [
    {
      icon: <Ionicons name="cube-outline" size={22} color={Colors.mainColor} />,
      label: "Store Name",
      key: "store_name",
    },
    {
      icon: <Ionicons name="person" size={22} color={Colors.mainColor} />,
      label: "Owner Name",
      key: "name",
    },
    {
      icon: <MaterialIcons name="email" size={22} color={Colors.mainColor} />,
      label: "Email",
      key: "email",
    },
    {
      icon: <Ionicons name="location" size={22} color={Colors.mainColor} />,
      label: "Address",
      key: "address",
    },
    {
      icon: <Ionicons name="call" size={22} color={Colors.mainColor} />,
      label: "Phone",
      key: "phone",
    },
  ];

  return (
    <ScrollView contentContainerStyle={[styles.container]}>
      <LinearGradient
        colors={["#168F88", "#006B60", "#4D89A1"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
          {profileData?.profilePhoto ? (
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
          <FontAwesome6
            name="camera"
            size={24}
            color={Colors.white}
            style={styles.cameraIcon}
          />
        </TouchableOpacity>
        <Text style={styles.profileName}>
          {profileData?.name || "Your Name"}
        </Text>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <MaterialIcons name="logout" size={20} color={Colors.white} />
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.infoContainer}>
        {infoData?.map((item, index) => (
          <Animated.View
            entering={FadeInDown.delay(index * 50).duration(200)}
            key={index}
            style={styles.inputRow}
          >
            <View style={styles.iconContainer}>{item.icon}</View>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>{item.label}</Text>
              <TextInput
                style={styles.input}
                placeholder={`Enter ${item.label}`}
                value={profileData?.[item.key]}
                onChangeText={(value) => handleInputChange(value, item.key)}
                onFocus={handleFocus}
              />
            </View>
          </Animated.View>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Save Profile"
          onPress={handleSaveProfile}
          width="100%"
          radius={radius.small}
          bg={Colors.mainColor}
          titleColor={Colors.white}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingVertical: 40,
    paddingTop: 60,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  imageWrapper: {
    position: "relative",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  profileName: {
    color: Colors.white,
    fontSize: Fonts.extraLarge,
    marginTop: 10,
  },
  logoutButton: {
    position: "absolute",
    bottom: 40,
    right: 20,
  },
  infoContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: radius.small,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  iconContainer: {
    marginRight: 10,
  },
  inputWrapper: {
    flex: 1,
  },
  label: {
    fontSize: Fonts.medium,
    color: Colors.text,
  },
  input: {
    height: 40,
    borderBottomColor: Colors.mainColor,
    borderBottomWidth: 1,
    borderRadius: radius.small,
    paddingLeft: 10,
    fontSize: Fonts.medium,
    color: Colors.black,
  },
  buttonContainer: {
    marginTop: 30,
    paddingHorizontal: 16,
  },
});

export default OwnerProfile;
