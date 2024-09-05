import Button from "@/components/UI/Button";
import Header from "@/components/UI/header/Header";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { radius } from "@/constants/sizes";
import { owner_profile } from "@/databases/Database";
import useImagePicker from "@/utils/UseImagePicker";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CreateOwnerProfile() {
  const { bottom, top } = useSafeAreaInsets();
  const [profile, setProfileData] = useState<any>();
  const { selectedImage, pickImage } = useImagePicker();
  const router = useRouter();
  const db = useSQLiteContext();
  const handleInputChange = (value: any, key: any) => {
    setProfileData((prevState: any) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleCreateProfile = async () => {
    try {
      const result = await owner_profile(db, profile);
      if (result.success) {
        router.push("/(tabs)");
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Error during navigation:", error);
    }
  };

  return (
    <View
      style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Create Profile</Text>
      </View>
      <ScrollView>
        <View style={styles.bodyContainer}>
          <View style={styles.profileImageContainer}>
            {selectedImage ? (
              <Image
                style={styles.profileImage}
                source={{ uri: selectedImage }} // Placeholder image URL
              />
            ) : (
              <Image
                style={styles.profileImage}
                source={{ uri: "https://via.placeholder.com/100x100" }} // Placeholder image URL
              />
            )}
            <TouchableOpacity
              onPress={() => pickImage()}
              style={styles.cameraIcon}
            >
              <Image
                style={styles.icon}
                source={{
                  uri: "https://img.icons8.com/ios-filled/50/000000/camera.png",
                }} // Placeholder icon URL
              />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Type Name"
              onChangeText={(e) => handleInputChange(e, "name")}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email here"
              keyboardType="email-address"
              onChangeText={(e) => handleInputChange(e, "email")}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              placeholder="Type Number"
              keyboardType="phone-pad"
              onChangeText={(e) => handleInputChange(e, "phoneNumber")}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Type Address"
              onChangeText={(e) => handleInputChange(e, "address")}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Tax Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Type here"
              keyboardType="numeric"
              onChangeText={(e) => handleInputChange(e, "taxNumber")}
            />
          </View>
        </View>
      </ScrollView>
      <Button
        title="Create Profile"
        titleColor={Colors.white}
        bg={Colors.mainColor}
        radius={radius.regular}
        width={"90%"}
        onPress={() => handleCreateProfile()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bodyContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ddd",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 5,
  },
  icon: {
    width: 20,
    height: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    color: "#666",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: Colors.mainColor,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  header: {
    height: 70,
    backgroundColor: Colors.mainColor,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: Fonts.large,
    color: Colors.white,
  },
});
