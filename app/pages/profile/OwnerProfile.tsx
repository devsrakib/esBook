// import React, { Fragment, useState, useEffect } from "react";
// import {
//   View,
//   StyleSheet,
//   Image,
//   Text,
//   TextInput,
//   ScrollView,
//   TouchableOpacity,
//   ToastAndroid,

//   StatusBar,
// } from "react-native";
// import {
//   Ionicons,
//   MaterialIcons,
//   FontAwesome,
//   FontAwesome6,
// } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import Animated, {
//   withTiming,
//   useSharedValue,
//   FadeInDown,
// } from "react-native-reanimated";
// import { Colors } from "@/constants/Colors";
// import { Fonts } from "@/constants/Fonts";
// import { radius } from "@/constants/sizes";
// import useImagePicker from "@/utils/UseImagePicker";
// import Button from "@/components/UI/Button";
// import useApiHook from "@/hooks/all_api_hooks";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useRouter } from "expo-router";

// const OwnerProfile = () => {
//   const { bottom, top } = useSafeAreaInsets();
//   const { selectedImage, pickImage } = useImagePicker();
//   const [focusInput, setFocusInput] = useState<boolean>(false);
//   const [profileData, setProfileData] = useState<any>({
//     id: 0,
//     profilePhoto: "",
//     name: "",
//     email: "",
//     address: "",
//     phone: "",
//     storeName: "",
//     ownerName: "",
//   });

//   const { data: OwnerData } = useApiHook("owners/");
//   const updateButtonWidth = useSharedValue(0);
//   const logoutButtonWidth = useSharedValue(100);

//   const translateY = useSharedValue(0); // To track scroll position
//   const scale = useSharedValue(1); // To scale the profile image
//   const left = useSharedValue(0); // To move profile image left

//   // useEffect(() => {
//   //   if (OwnerData?.data?.length > 0) {
//   //     setProfileData(OwnerData?.results[0]);
//   //   }
//   // }, [OwnerData]);

//   const handleInputChange = (value: string, key: string) => {
//     setProfileData((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleFocus = () => {
//     updateButtonWidth.value = withTiming(50);
//     logoutButtonWidth.value = withTiming(50);
//   };

//   const handleSaveProfile = async () => {
//     // Save profile data
//     ToastAndroid.show("Profile updated!", ToastAndroid.SHORT);
//   };

//   const logout = async () => {
//     await AsyncStorage.removeItem("access_token");
//     router.replace("/pages/signUp/signUp");
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <StatusBar barStyle={"light-content"} />
//       <LinearGradient
//         colors={["#168F88", "#006B60", "#4D89A1"]}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={styles.header}
//       >
//         <TouchableOpacity onPress={pickImage} style={[styles.imageWrapper]}>
//           {OwnerData?.data?.profilePhoto ? (
//             <Animated.Image
//               source={{ uri: OwnerData?.data?.profilePhoto }}
//               style={[styles.profileImage]}
//             />
//           ) : (
//             <Animated.Image
//               source={require("../../../assets/images/placeholder.jpeg")}
//               style={[styles.profileImage]}
//             />
//           )}
//           <FontAwesome
//             name="camera"
//             size={24}
//             color={Colors.white}
//             style={styles.cameraIcon}
//           />
//         </TouchableOpacity>
//         <Text style={styles.profileName}>
//           {OwnerData?.data[0]?.name || "Your Name"}
//         </Text>
//         <TouchableOpacity onPress={() => logout()} style={styles.logoutButton}>
//           <MaterialIcons name="logout" size={20} color={Colors.white} />
//         </TouchableOpacity>
//       </LinearGradient>

//       <View style={styles.infoContainer}>
//         {[
//           {
//             label: "Store Name",
//             key: "storeName",
//             icon: (
//               <FontAwesome6 name="store" size={20} color={Colors.mainColor} />
//             ),
//           },
//           {
//             label: "Owner Name",
//             key: "name",
//             icon: <Ionicons name="person" size={22} color={Colors.mainColor} />,
//           },
//           {
//             label: "Email",
//             key: "email",
//             icon: (
//               <MaterialIcons name="email" size={22} color={Colors.mainColor} />
//             ),
//           },
//           {
//             label: "Address",
//             key: "address",
//             icon: (
//               <Ionicons name="location" size={22} color={Colors.mainColor} />
//             ),
//           },
//           {
//             label: "Phone",
//             key: "phone",
//             icon: <Ionicons name="call" size={22} color={Colors.mainColor} />,
//           },
//         ]?.map((item, index) => (
//           <Animated.View
//             entering={FadeInDown.delay(index * 50)
//               .duration(200)
//               .damping(80)
//               .springify()
//               .springify(200)}
//             key={index}
//             style={styles.inputRow}
//           >
//             <View style={styles.iconContainer}>{item.icon}</View>
//             <Animated.View style={styles.inputWrapper}>
//               <Text style={styles.label}>{item.label}</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder={`Enter ${item.label}`}
//                 value={OwnerData?.data[0]?.[item.key]}
//                 onChangeText={(value) => handleInputChange(value, item.key)}
//                 onFocus={handleFocus}
//               />
//             </Animated.View>
//           </Animated.View>
//         ))}
//       </View>

//       <View style={styles.buttonContainer}>
//         <Button
//           title="Create Store"
//           onPress={handleSaveProfile}
//           width={"91%"}
//           radius={radius.small}
//           bg={Colors.mainColor}
//           titleColor={Colors.white}
//         />

//   });

//   const fetchProfileData = async () => {
//     try {
//       const OwnerProfileData = OwnerData;
//       if (OwnerProfileData && OwnerProfileData?.results?.length > 0) {
//         const profile = OwnerProfileData?.results[0];
//         setProfileData(profile);
//       }
//     } catch (error) {
//       console.error("Error fetching profile data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchProfileData();
//   }, [db]);

//   const handleInputChange = (value: any, key: string) => {
//     setProfileData((prevState: any) => ({
//       ...prevState,
//       [key]: value,
//     }));
//   };

//   useEffect(() => {
//     if (selectedImage) {
//       setProfileData((prevState: any) => ({
//         ...prevState,
//         profilePhoto: selectedImage,
//       }));
//     }
//   }, [selectedImage]);

//   const handleSaveProfileInfo = async () => {
//     try {
//       const result = await update_owner_profile(db, profileData);
//       if (result.success) {
//         fetchProfileData();
//         ToastAndroid.show("Profile updated successfully!", ToastAndroid.SHORT);
//       }
//     } catch (error) {}
//   };

//   const infoData = [
//     {
//       icon: (
//         <Ionicons name="person-outline" size={22} color={Colors.mainColor} />
//       ),
//       label: "Name",
//       key: "name",
//     },
//     {
//       icon: <MaterialIcons name="email" size={22} color={Colors.mainColor} />,
//       label: "Email",
//       key: "email",
//     },
//     {
//       icon: (
//         <Ionicons name="location-outline" size={22} color={Colors.mainColor} />
//       ),
//       label: "Address",
//       key: "address",
//     },
//     {
//       icon: <Ionicons name="call-outline" size={22} color={Colors.mainColor} />,
//       label: "Phone",
//       key: "phone",
//     },
//   ];

//   const handleFocus = () => {
//     setFocusInput(true);
//     updateButtonWidth.value = withTiming(50, { duration: 300 });
//     logoutButtonWidth.value = withTiming(50, { duration: 300 });
//   };

//   const handleBlur = () => {
//     setFocusInput(false);
//     updateButtonWidth.value = withTiming(0, { duration: 300 });
//     logoutButtonWidth.value = withTiming(100, { duration: 300 });
//   };

//   // Animated styles
//   const updateButtonStyle = useAnimatedStyle(() => ({
//     width: `${updateButtonWidth.value}%`,
//   }));

//   const logoutButtonStyle = useAnimatedStyle(() => ({
//     width: `${logoutButtonWidth.value}%`,
//   }));

//   const logout = async () => {
//     try {
//       // Clear the access token from AsyncStorage
//       await AsyncStorage.removeItem("access_token");

//       // Navigate to the signup page
//       router.replace("/pages/signUp/signUp");
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={[styles.container]}>
//       <View style={styles.profileContainer}>
//         <TouchableOpacity onPress={() => pickImage()}>
//           {profileData?.profilePhoto ? (
//             <Image
//               source={{ uri: profileData?.profilePhoto }}
//               style={styles.profileImage}
//             />
//           ) : (
//             <Image
//               source={require("../../../assets/images/placeholder.jpeg")}
//               style={styles.profileImage}
//             />
//           )}
//         </TouchableOpacity>
//         <Animated.Text
//           entering={FadeInDown.delay(50).duration(400)}
//           style={styles.profileName}
//         >
//           {profileData?.name}
//         </Animated.Text>
//       </View>
//       <View style={styles.infoContainer}>
//         {infoData?.map((item, index) => (
//           <Animated.View
//             entering={FadeInDown.delay(index * 50).duration(400)}
//             style={[
//               styles.infoRow,
//               { shadowColor: Colors.shadow, elevation: 10 },
//             ]}
//             key={index?.toString()}
//           >
//             <View style={[styles.infoRow, { flexDirection: "row" }]}>
//               <View style={styles.iconCon}>{item?.icon}</View>
//               <View style={styles.infoColumn}>
//                 <Text style={styles.label}>{item?.label}</Text>
//                 <TextInput
//                   style={styles.input}
//                   value={`${profileData[item?.key]}`}
//                   onChangeText={(e) => handleInputChange(e, item?.key)}
//                   onTouchStart={() => setFocusInput(true)}
//                 />
//               </View>
//             </View>
//           </Animated.View>
//         ))}
//       </View>
//       {/* <Link href={"/pages/login/Login"} asChild>
//         <TouchableOpacity style={styles.logoutButton}>
//           <Text style={styles.logout}>Log out</Text>
//         </TouchableOpacity>
//       </Link>
//       {focusInput && (
//         <Button
//           title="Update"
//           bg={Colors.mainColor}
//           titleColor={Colors.white}
//           radius={radius.small}
//           width={"90%"}
//           onPress={handleSaveProfileInfo}
//         />
//       )} */}

//       <View style={styles.buttonContainer}>
//         <Animated.View style={[styles.animatedButton, updateButtonStyle]}>
//           {focusInput && (
//             <TouchableOpacity>
//               <Text>Update</Text>
//             </TouchableOpacity>
//           )}
//         </Animated.View>

//         <Animated.View style={[styles.animatedButton, logoutButtonStyle]}>
//           <TouchableOpacity
//             onPress={() => logout()}
//             style={styles.logoutButton}
//           >
//             <Text style={styles.logout}>Log out</Text>
//           </TouchableOpacity>
//         </Animated.View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: Colors.background,
//   },

//   header: {
//     paddingVertical: 40,
//     paddingTop: 60,
//     alignItems: "center",
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//   },
//   imageWrapper: {
//     position: "relative",
//   },

//   profileContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: Colors.mainColor,
//     paddingBottom: 32,
//     paddingTop: 50,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//   },

//   profileImage: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,

//     borderWidth: 2,
//     borderColor: Colors.white,
//   },
//   cameraIcon: {
//     position: "absolute",
//     bottom: 10,
//     right: 10,
//   },
//   profileName: {
//     color: Colors.white,
//     fontSize: Fonts.extraLarge,
//     marginTop: 10,
//   },
//   infoContainer: {
//     paddingHorizontal: 16,
//     marginTop: 20,
//   },
//   inputRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 16,
//     backgroundColor: Colors.white,
//     padding: 10,
//     borderRadius: radius.small,
//     shadowColor: Colors.shadow,
//     shadowOpacity: 0.3,
//     elevation: 5,
//   },
//   iconContainer: {
//     marginRight: 10,
//   },
//   inputWrapper: {
//     flex: 1,

//     marginBottom: 12,
//     borderWidth: 2,
//     borderColor: Colors.white,
//   },
//   profileName: {
//     color: Colors.white,
//     fontSize: Fonts.extraLarge,
//     fontWeight: "bold",
//     marginVertical: 8,
//   },
//   infoContainer: {
//     paddingHorizontal: 16,
//     marginVertical: 12,
//   },
//   infoRow: {
//     marginBottom: 12,
//     backgroundColor: Colors.white,
//     paddingHorizontal: 10,
//     paddingTop: 10,
//     borderRadius: radius.small,
//   },
//   iconCon: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     borderColor: Colors.mainColor,
//     borderWidth: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: Colors.lightGray,
//   },
//   infoColumn: {
//     flex: 1,
//     paddingLeft: 10,

//   },
//   label: {
//     fontSize: Fonts.medium,
//     color: Colors.text,

//     marginBottom: 4,
//   },
//   input: {
//     fontSize: Fonts.large,
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.mainColor,
//     paddingVertical: 4,
//   },
//   buttonContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 30,
//   },
//   animatedButton: {
//     flex: 1,
//   },
//   logoutButton: {
//     width: 36,
//     height: 36,
//     borderRadius: radius.small,
//     alignItems: "center",
//     justifyContent: "center",
//     alignSelf: "flex-end",
//     marginRight: 20,
//     position: "absolute",
//     bottom: 30,
//     right: 5,
//   },
//   logoutText: {
//     color: Colors.white,
//     textAlign: "center",
// =======
//   },
//   input: {
//     fontSize: Fonts.large,
//     paddingVertical: 4,
//     color: Colors.text,
//     borderBottomColor: Colors.mainColor,
//     borderBottomWidth: 1,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     width: "100%",
//     justifyContent: "space-between",
//     paddingHorizontal: 16,
//     marginTop: 20,
//   },
//   animatedButton: {
//     overflow: "hidden",
//   },
//   logoutButton: {
//     marginTop: 20,
//     alignSelf: "center",
//     backgroundColor: Colors.red,
//     paddingVertical: 8,
//     paddingHorizontal: 20,
//     borderRadius: radius.small,
//     marginBottom: 20,
//   },
//   logout: {
//     color: Colors.white,
//     fontSize: Fonts.medium,
//     fontWeight: "600",
//   },
// });

// export default OwnerProfile;

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
    if (OwnerData?.data?.length > 0) {
      setProfileData(OwnerData?.data[0]);
    }
  }, [OwnerData]);

  useEffect(() => {
    if (selectedImage) {
      setProfileData((prevState: any) => ({
        ...prevState,
        profilePhoto: selectedImage,
      }));
    }
  }, [selectedImage]);

  const infoData = [
    {
      icon: <Ionicons name="cube-outline" size={22} color={Colors.mainColor} />,
      label: "Store Name",
      key: "storeName",
    },
    {
      icon: <Ionicons name="person" size={22} color={Colors.mainColor} />,
      label: "Owner Name",
      key: "ownerName",
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
      <StatusBar barStyle={"light-content"} />
      <LinearGradient
        colors={["#168F88", "#006B60", "#4D89A1"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
          {profileData?.profilePhoto ? (
            <Animated.Image
              source={{ uri: profileData.profilePhoto }}
              style={styles.profileImage}
            />
          ) : (
            <Animated.Image
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
        {infoData.map((item, index) => (
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
          width="91%"
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
    top: 10,
    right: 10,
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
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: radius.small,
    paddingLeft: 10,
    fontSize: Fonts.small,
    color: Colors.text,
  },
  buttonContainer: {
    marginTop: 30,
    paddingHorizontal: 16,
  },
});

export default OwnerProfile;
