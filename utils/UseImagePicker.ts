import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { Alert } from "react-native";

const useImagePicker = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access media library is required!"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      resizeImage(result.assets[0].uri);
    }
  };

  const resizeImage = async (imageUri: string) => {
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

  return {
    selectedImage,
    pickImage,
  };
};

export default useImagePicker;
