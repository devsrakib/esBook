import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

const ImageInput = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      resizeImage(result?.assets[0]?.uri);
    }
  };

  const resizeImage = async (imageUri: any) => {
    try {
      const resizedImage = await manipulateAsync(
        imageUri,
        [{ resize: { width: 800, height: 600 } }],
        { compress: 1, format: SaveFormat.JPEG }
      );

      setSelectedImage(resizedImage.uri);
    } catch (error) {
      Alert.alert("Resize failed", "Failed to resize image. Please try again.");
    }
  };

  return (
    <TouchableOpacity onPress={() => pickImage()} style={styles.container}>
      <Image
        style={styles.img}
        source={require("../../../assets/images/gallery.png")}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  img: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },
});

export default ImageInput;
