// import Button from "@/components/UI/Button";
// import Header from "@/components/UI/header/Header";
// import { Colors } from "@/constants/Colors";
// import { Fonts } from "@/constants/Fonts";
// import { radius } from "@/constants/sizes";
// import { owner_profile } from "@/databases/Database";
// import useImagePicker from "@/utils/UseImagePicker";
// import { Entypo, EvilIcons, FontAwesome } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import { useSQLiteContext } from "expo-sqlite";
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   ScrollView,
//   KeyboardAvoidingView,
// } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// export default function CreateOwnerProfile() {
//   const { bottom, top } = useSafeAreaInsets();
//   const [profile, setProfileData] = useState<any>();
//   const { selectedImage, pickImage } = useImagePicker();
//   const router = useRouter();
//   const db = useSQLiteContext();
//   const handleInputChange = (value: any, key: any) => {
//     setProfileData((prevState: any) => ({
//       ...prevState,
//       [key]: value,
//     }));
//   };

//   const handleCreateProfile = async () => {
//     try {
//       const result = await owner_profile(db, profile);
//       if (result.success) {
//         router.push("/(tabs)");
//       } else {
//         console.error(result.message);
//       }
//     } catch (error) {
//       console.error("Error during navigation:", error);
//     }
//   };

//   return (
//     <View
//       style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}
//     >
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Create Profile</Text>
//       </View>
//       <ScrollView>
//         <View style={styles.bodyContainer}>
//           <View style={styles.profileImageContainer}>
//             {selectedImage ? (
//               <Image
//                 style={styles.profileImage}
//                 source={{ uri: selectedImage }} // Placeholder image URL
//               />
//             ) : (
//               <FontAwesome name="user-circle" size={100} color={Colors.text} />
//             )}
//             <TouchableOpacity
//               onPress={() => pickImage()}
//               style={styles.cameraIcon}
//             >
//               <Entypo name="camera" size={24} color="black" />
//             </TouchableOpacity>
//           </View>
//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Name</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Type Name"
//               onChangeText={(e) => handleInputChange(e, "name")}
//             />
//           </View>
//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Email</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Email here"
//               keyboardType="email-address"
//               onChangeText={(e) => handleInputChange(e, "email")}
//             />
//           </View>
//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Phone</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Type Number"
//               keyboardType="phone-pad"
//               onChangeText={(e) => handleInputChange(e, "phoneNumber")}
//             />
//           </View>
//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Address</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Type Address"
//               onChangeText={(e) => handleInputChange(e, "address")}
//             />
//           </View>
//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Tax Number</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Type here"
//               keyboardType="numeric"
//               onChangeText={(e) => handleInputChange(e, "taxNumber")}
//             />
//           </View>
//         </View>
//         <KeyboardAvoidingView>
//           <Button
//             title="Create Profile"
//             titleColor={Colors.white}
//             bg={Colors.mainColor}
//             radius={radius.regular}
//             width={"90%"}
//             onPress={() => handleCreateProfile()}
//           />
//         </KeyboardAvoidingView>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   bodyContainer: {
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
//   profileImageContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//     height: 150,
//     marginBottom: 30,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: "#ddd",
//   },
//   cameraIcon: {
//     right: 10,
//     backgroundColor: "#fff",
//     borderRadius: 15,
//     padding: 5,
//     alignSelf: "flex-end",
//   },
//   icon: {
//     width: 20,
//     height: 20,
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   label: {
//     marginBottom: 5,
//     color: "#666",
//   },
//   input: {
//     height: 50,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 15,
//     backgroundColor: "#f9f9f9",
//   },
//   button: {
//     backgroundColor: Colors.mainColor,
//     paddingVertical: 15,
//     borderRadius: 5,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   header: {
//     height: 70,
//     backgroundColor: Colors.mainColor,
//     justifyContent: "center",
//     paddingHorizontal: 20,
//   },
//   headerText: {
//     fontSize: Fonts.large,
//     color: Colors.white,
//   },
// });

import Button from "@/components/UI/Button";
import Header from "@/components/UI/header/Header";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { radius } from "@/constants/sizes";
import { owner_profile } from "@/databases/Database";
import useApiHook, { apiUrl } from "@/hooks/all_api_hooks";
import useImagePicker from "@/utils/UseImagePicker";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import axios from "axios";
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
  KeyboardAvoidingView,
  Dimensions,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Product from "./(tabs)/product";

// Get device dimensions
const { width, height } = Dimensions.get("window");

export default function CreateOwnerProfile() {
  const { bottom, top } = useSafeAreaInsets();
  const [profile, setProfileData] = useState<any>();
  const { selectedImage, pickImage } = useImagePicker();
  const router = useRouter();
  const db = useSQLiteContext();

  console.log(profile);

  const handleInputChange = (value: any, key: any) => {
    setProfileData((prevState: any) => ({
      ...prevState,
      [key]: value,
    }));
  };

  // apiUrl +
  const handleCreateProfile = async () => {
    try {
      const response = await axios.post(
        "http://10.0.2.2:8000/api/v1/users/register/",
        {
          first_name: profile.firstName,
          last_name: profile.lastName,
          username: profile.firstName,
          password: profile.password,
          email: profile.email,
          phone: profile.phone,
          address: profile.address,
          profile_photo: selectedImage || null,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        Alert.alert("Success", "User registered successfully!");
        router.push("/(tabs)");
      } else {
        const errorData = await response.data;
        Alert.alert("Error", JSON.stringify(errorData));
      }

      // const result = await owner_profile(db, profile);
      // if (result.success) {
      //   router.push("/(tabs)");
      // } else {
      //   console.error(result.message);
      // }
    } catch (error: any) {
      if (error.response) {
        console.error("Error response data:", error);
      } else {
        console.error("Error during navigation:", error);
      }
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
                source={{ uri: selectedImage }}
              />
            ) : (
              <FontAwesome name="user-circle" size={100} color={Colors.text} />
            )}
            <TouchableOpacity
              onPress={() => pickImage()}
              style={styles.cameraIcon}
            >
              <Entypo name="camera" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Fist Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Type Fist name"
              onChangeText={(e) => handleInputChange(e, "firstName")}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Lat Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Type last name"
              onChangeText={(e) => handleInputChange(e, "lastName")}
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
              onChangeText={(e) => handleInputChange(e, "phone")}
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
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={(e) => handleInputChange(e, "password")}
            />
          </View>
          {/* <View style={styles.inputContainer}>
            <Text style={styles.label}>Tax Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Type here"
              keyboardType="numeric"
              onChangeText={(e) => handleInputChange(e, "taxNumber")}
            />
          </View> */}
        </View>
        <KeyboardAvoidingView>
          <Button
            title="Create Profile"
            titleColor={Colors.white}
            bg={Colors.mainColor}
            radius={radius.regular}
            width={"90%"}
            onPress={() => handleCreateProfile()}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bodyContainer: {
    paddingHorizontal: width * 0.05, // 5% of the screen width
    paddingTop: 20,
  },
  profileImageContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: height * 0.2, // 20% of the screen height
    marginBottom: 30,
  },
  profileImage: {
    width: width * 0.25, // 25% of the screen width
    height: width * 0.25,
    borderRadius: (width * 0.25) / 2,
    backgroundColor: "#ddd",
  },
  cameraIcon: {
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 5,
    alignSelf: "flex-end",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    color: "#666",
    fontSize: width * 0.04, // Responsive font size
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: "#f9f9f9",
  },
  header: {
    height: 70,
    backgroundColor: Colors.mainColor,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: width * 0.06, // Responsive font size
    color: Colors.white,
  },
});
