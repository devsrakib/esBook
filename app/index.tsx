// import Button from "@/components/UI/Button";
// import Header from "@/components/UI/header/Header";
// import { Colors } from "@/constants/Colors";
// import { Fonts } from "@/constants/Fonts";
// import { radius } from "@/constants/sizes";
// import { owner_profile } from "@/databases/Database";
// import useApiHook, { apiUrl } from "@/hooks/all_api_hooks";
// import useImagePicker from "@/utils/UseImagePicker";
// import { Entypo, FontAwesome } from "@expo/vector-icons";
// import axios from "axios";
// import { useRouter } from "expo-router";
// import { useSQLiteContext } from "expo-sqlite";
// import React, { useRef, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   ScrollView,
//   KeyboardAvoidingView,
//   Dimensions,
//   Alert,
// } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import Product from "./(tabs)/product";
// import Animated from "react-native-reanimated";

// // Get device dimensions
// const { width, height } = Dimensions.get("window");

// export default function CreateOwnerProfile() {
//   const { bottom, top } = useSafeAreaInsets();
//   const [profile, setProfileData] = useState<any>();
//   const { selectedImage, pickImage } = useImagePicker();
//   const router = useRouter();
//   const db = useSQLiteContext();

//   console.log(profile);

//   const handleInputChange = (value: any, key: any) => {
//     setProfileData((prevState: any) => ({
//       ...prevState,
//       [key]: value,
//     }));
//   };

//   // apiUrl +
//   const handleCreateProfile = async () => {
//     try {
//       const response = await axios.post(
//         "http://10.0.2.2:8000/api/v1/users/register/",
//         {
//           first_name: profile.firstName,
//           last_name: profile.lastName,
//           username: profile.firstName,
//           password: profile.password,
//           email: profile.email,
//           phone: profile.phone,
//           address: profile.address,
//           profile_photo: selectedImage || null,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       if (response.status === 201) {
//         Alert.alert("Success", "User registered successfully!");
//         router.push("/(tabs)");
//       } else {
//         const errorData = await response.data;
//         Alert.alert("Error", JSON.stringify(errorData));
//       }

//       // const result = await owner_profile(db, profile);
//       // if (result.success) {
//       //   router.push("/(tabs)");
//       // } else {
//       //   console.error(result.message);
//       // }
//     } catch (error: any) {
//       if (error.response) {
//         console.error("Error response data:", error);
//       } else {
//         console.error("Error during navigation:", error);
//       }
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
//                 source={{ uri: selectedImage }}
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
//             <Text style={styles.label}>Fist Name</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Type Fist name"
//               onChangeText={(e) => handleInputChange(e, "firstName")}
//             />
//           </View>
//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Lat Name</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Type last name"
//               onChangeText={(e) => handleInputChange(e, "lastName")}
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
//               onChangeText={(e) => handleInputChange(e, "phone")}
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
//             <Text style={styles.label}>Password</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Password"
//               onChangeText={(e) => handleInputChange(e, "password")}
//             />
//           </View>
//           {/* <View style={styles.inputContainer}>
//             <Text style={styles.label}>Tax Number</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Type here"
//               keyboardType="numeric"
//               onChangeText={(e) => handleInputChange(e, "taxNumber")}
//             />
//           </View> */}
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
//     paddingHorizontal: width * 0.05, // 5% of the screen width
//     paddingTop: 20,
//   },
//   profileImageContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//     height: height * 0.2, // 20% of the screen height
//     marginBottom: 30,
//   },
//   profileImage: {
//     width: width * 0.25, // 25% of the screen width
//     height: width * 0.25,
//     borderRadius: (width * 0.25) / 2,
//     backgroundColor: "#ddd",
//   },
//   cameraIcon: {
//     right: 10,
//     backgroundColor: "#fff",
//     borderRadius: 15,
//     padding: 5,
//     alignSelf: "flex-end",
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   label: {
//     marginBottom: 5,
//     color: "#666",
//     fontSize: width * 0.04, // Responsive font size
//   },
//   input: {
//     height: 50,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 15,
//     backgroundColor: "#f9f9f9",
//   },
//   header: {
//     height: 70,
//     backgroundColor: Colors.mainColor,
//     justifyContent: "center",
//     paddingHorizontal: 20,
//   },
//   headerText: {
//     fontSize: width * 0.06, // Responsive font size
//     color: Colors.white,
//   },
// });

import React, { useState, useEffect, Fragment } from "react";
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
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  interpolate,
  FadeInDown,
} from "react-native-reanimated";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "@/components/UI/Button";
import { Colors } from "@/constants/Colors";
import { radius } from "@/constants/sizes";
import useImagePicker from "@/utils/UseImagePicker";
import { Fonts } from "@/constants/Fonts";

const { width, height } = Dimensions.get("window");

export default function CreateOwnerProfile() {
  const { bottom, top } = useSafeAreaInsets();
  const [profile, setProfileData] = useState({});
  const { selectedImage, pickImage } = useImagePicker();

  // Shared values for animations
  const formOpacity = useSharedValue(0);
  const formTranslateY = useSharedValue(20);
  const buttonScale = useSharedValue(1);
  const inputAnimations = Array(6)
    .fill(0)
    .map(() => useSharedValue(0));

  // Start animations with delays on mount
  useEffect(() => {
    formOpacity.value = withTiming(1, { duration: 500 });
    formTranslateY.value = withSpring(0, { damping: 10, stiffness: 90 });

    // Sequential animation for inputs
    inputAnimations.forEach((input, index) => {
      input.value = withDelay(50 * index, withSpring(1, { damping: 15 }));
    });
  }, []);

  // Animated styles for form and button
  const formAnimatedStyle = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
    transform: [{ translateY: formTranslateY.value }],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const handleInputChange = (value: any, key: any) => {
    setProfileData((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleCreateProfile = async () => {
    Alert.alert("Success", "Profile created successfully!");
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.signUpTextCon}>
        <Text style={styles.singUpText}>Create Your{"\n"}Account</Text>
      </View>
      <KeyboardAvoidingView behavior="padding" style={[styles.bodyContainer]}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Profile Image Section */}

          {/* Form Fields with Delayed Animation */}
          {[
            "First Name",
            "Last Name",
            "Email",
            "Phone",
            "Address",
            "Password",
          ].map((label, index) => {
            const inputAnimatedStyle = useAnimatedStyle(() => ({
              opacity: interpolate(
                inputAnimations[index].value,
                [0, 1],
                [0, 1]
              ),
              transform: [
                {
                  translateY: interpolate(
                    inputAnimations[index].value,
                    [0, 1],
                    [20, 0]
                  ),
                },
              ],
            }));
            return (
              <Fragment key={index}>
                <Animated.Text
                  entering={FadeInDown.delay(index * 50)
                    .duration(200)
                    .damping(80)
                    .stiffness(200)
                    .springify()}
                  style={styles.label}
                >
                  {label}
                </Animated.Text>
                <Animated.View
                  key={index}
                  style={[styles.inputContainer, inputAnimatedStyle]}
                >
                  <TextInput
                    style={styles.input}
                    placeholder={`Enter ${label}`}
                    keyboardType={label === "Phone" ? "numeric" : "default"}
                    secureTextEntry={label === "Password"}
                    onChangeText={(e) =>
                      handleInputChange(e, label.toLowerCase().replace(" ", ""))
                    }
                  />
                </Animated.View>
              </Fragment>
            );
          })}
          <Animated.View style={styles.buttonStyle}>
            <Button
              title="Sign Up"
              titleColor={Colors.white}
              bg={Colors.mainColor}
              radius={radius.regular}
              width={"100%"}
              onPress={handleCreateProfile}
            />
          </Animated.View>
          {/* Animated Button */}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainColor,
  },
  signUpTextCon: {
    height: Dimensions.get("screen").height * 0.23,
    paddingLeft: 30,
    justifyContent: "center",
  },
  singUpText: {
    fontSize: Fonts.extraLarge,
    color: Colors.white,
    fontWeight: "700",
    marginTop: 20,
    lineHeight: 27,
  },
  bodyContainer: {
    paddingTop: 20,
    backgroundColor: Colors.background,
    height: Dimensions.get("screen").height * 0.77,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  profileImageContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: height * 0.2,
    marginBottom: 30,
  },
  profileImage: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: (width * 0.25) / 2,
    backgroundColor: "#ddd",
  },
  cameraIcon: {
    position: "absolute",
    bottom: -10,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 5,
    elevation: 3,
  },
  inputContainer: {
    marginBottom: 16,
    backgroundColor: Colors.background,
    borderRadius: radius.small,
  },
  label: {
    fontSize: Fonts.medium,
    color: Colors.mainColor,
    marginBottom: 5,
  },
  input: {
    height: 38,
    borderBottomColor: Colors.VeroneseGreen,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    color: "#333",
  },
  buttonStyle: {
    marginTop: 30,
  },
});
