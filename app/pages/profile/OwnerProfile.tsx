import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  StatusBar,
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  FontAwesome6,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  withTiming,
  useSharedValue,
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

const OwnerProfile = () => {
  const { selectedImage, pickImage } = useImagePicker();
  const router = useRouter();
  const [profileData, setProfileData] = useState({
    id: 0,
    profilePhoto: "",
    name: "",
    email: "",
    address: "",
    phone: "",
    storeName: "",
    ownerName: "",
  });

  const { data: OwnerData } = useApiHook("owners/");
  const updateButtonWidth = useSharedValue(0);
  const logoutButtonWidth = useSharedValue(100);

  const translateY = useSharedValue(0); // To track scroll position
  const scale = useSharedValue(1); // To scale the profile image
  const left = useSharedValue(0); // To move profile image left

  // useEffect(() => {
  //   if (OwnerData?.data?.length > 0) {
  //     setProfileData(OwnerData?.results[0]);
  //   }
  // }, [OwnerData]);

  const handleInputChange = (value: string, key: string) => {
    setProfileData((prev) => ({ ...prev, [key]: value }));
  };

  const handleFocus = () => {
    updateButtonWidth.value = withTiming(50);
    logoutButtonWidth.value = withTiming(50);
  };

  const handleSaveProfile = async () => {
    // Save profile data
    ToastAndroid.show("Profile updated!", ToastAndroid.SHORT);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("access_token");
    router.replace("/pages/signUp/signUp");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <LinearGradient
        colors={["#168F88", "#006B60", "#4D89A1"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity onPress={pickImage} style={[styles.imageWrapper]}>
          {OwnerData?.data?.profilePhoto ? (
            <Animated.Image
              source={{ uri: OwnerData?.data?.profilePhoto }}
              style={[styles.profileImage]}
            />
          ) : (
            <Animated.Image
              source={require("../../../assets/images/placeholder.jpeg")}
              style={[styles.profileImage]}
            />
          )}
          <FontAwesome
            name="camera"
            size={24}
            color={Colors.white}
            style={styles.cameraIcon}
          />
        </TouchableOpacity>
        <Text style={styles.profileName}>
          {OwnerData?.data[0]?.name || "Your Name"}
        </Text>
        <TouchableOpacity onPress={() => logout()} style={styles.logoutButton}>
          <MaterialIcons name="logout" size={20} color={Colors.white} />
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.infoContainer}>
        {[
          {
            label: "Store Name",
            key: "storeName",
            icon: (
              <FontAwesome6 name="store" size={20} color={Colors.mainColor} />
            ),
          },
          {
            label: "Owner Name",
            key: "name",
            icon: <Ionicons name="person" size={22} color={Colors.mainColor} />,
          },
          {
            label: "Email",
            key: "email",
            icon: (
              <MaterialIcons name="email" size={22} color={Colors.mainColor} />
            ),
          },
          {
            label: "Address",
            key: "address",
            icon: (
              <Ionicons name="location" size={22} color={Colors.mainColor} />
            ),
          },
          {
            label: "Phone",
            key: "phone",
            icon: <Ionicons name="call" size={22} color={Colors.mainColor} />,
          },
        ]?.map((item, index) => (
          <Animated.View
            entering={FadeInDown.delay(index * 50)
              .duration(200)
              .damping(80)
              .springify()
              .springify(200)}
            key={index}
            style={styles.inputRow}
          >
            <View style={styles.iconContainer}>{item.icon}</View>
            <Animated.View style={styles.inputWrapper}>
              <Text style={styles.label}>{item.label}</Text>
              <TextInput
                style={styles.input}
                placeholder={`Enter ${item.label}`}
                value={OwnerData?.data[0]?.[item.key]}
                onChangeText={(value) => handleInputChange(value, item.key)}
                onFocus={handleFocus}
              />
            </Animated.View>
          </Animated.View>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Create Store"
          onPress={handleSaveProfile}
          width={"91%"}
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
    shadowOpacity: 0.3,
    elevation: 5,
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
    marginBottom: 4,
  },
  input: {
    fontSize: Fonts.large,
    borderBottomWidth: 1,
    borderBottomColor: Colors.mainColor,
    paddingVertical: 4,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  animatedButton: {
    flex: 1,
  },
  logoutButton: {
    width: 36,
    height: 36,
    borderRadius: radius.small,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    marginRight: 20,
    position: "absolute",
    bottom: 30,
    right: 5,
  },
  logoutText: {
    color: Colors.white,
    textAlign: "center",
    fontWeight: "600",
  },
});

export default OwnerProfile;
