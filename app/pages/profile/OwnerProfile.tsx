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
// } from "react-native";
// import { FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { Colors } from "@/constants/Colors";
// import Divider from "@/components/UI/Divider";
// import { Fonts } from "@/constants/Fonts";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import Button from "@/components/UI/Button";
// import { useSQLiteContext } from "expo-sqlite";
// import {
//   getOwnerProfile,
//   update_owner_profile,
//   OwnerProfileData,
// } from "@/databases/Database";
// import useImagePicker from "@/utils/UseImagePicker";
// import Animated, { FadeInDown } from "react-native-reanimated";
// import useApiHook from "@/hooks/all_api_hooks";
// import { Link } from "expo-router";
// import { radius } from "@/constants/sizes";

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
//   });

//   const { data: OwnerData } = useApiHook("owners/");
//   const db = useSQLiteContext();

//   const fetchProfileData = async () => {
//     try {
//       // const profileArray = await getOwnerProfile(db);
//       const OwnerProfileData = OwnerData;
//       if (OwnerProfileData && OwnerProfileData?.results?.length > 0) {
//         const profile = OwnerProfileData?.results[0];
//         setProfileData(profile); // Initialize profileData after fetching
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
//       icon: <Ionicons name="person-outline" size={18} color="gray" />,
//       label: "Name",
//       key: "name",
//     },
//     {
//       icon: <MaterialIcons name="email" size={18} color="gray" />,
//       label: "Email",
//       key: "email",
//     },
//     {
//       icon: <Ionicons name="location-outline" size={18} color="gray" />,
//       label: "Address",
//       key: "address",
//     },
//     {
//       icon: <Ionicons name="call-outline" size={18} color="gray" />,
//       label: "Phone",
//       key: "phone",
//     },
//   ];

//   console.log(profileData, ":::::::");

//   return (
//     <ScrollView
//       contentContainerStyle={[
//         styles.container,
//         { paddingBottom: bottom, paddingTop: top },
//       ]}
//     >
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
//           entering={FadeInDown.delay(50).duration(400).damping(80).springify()}
//           style={styles.profileName}
//         >
//           {profileData?.name}
//         </Animated.Text>
//       </View>
//       <View style={styles.infoContainer}>
//         {infoData?.map((item, index) => (
//           <Animated.View
//             entering={FadeInDown.delay(index * 50)
//               .duration(400)
//               .damping(80)
//               .springify()}
//             style={[styles.infoRow]}
//             key={index?.toString()}
//           >
//             <Animated.View style={[styles.infoRow, { flexDirection: "row" }]}>
//               <View style={styles.iconCon}>{item?.icon}</View>
//               <View style={styles.infoColumn}>
//                 <Text style={styles.label}>{item?.label}</Text>
//                 <TextInput
//                   style={styles.input}
//                   value={`${profileData[item?.key]}`} // Ensure key matches profileData
//                   onChangeText={(e) => handleInputChange(e, item?.key)}
//                   onTouchStart={() => setFocusInput(true)}
//                 />
//               </View>
//             </Animated.View>
//             <Divider height={1} width={"100%"} aligns={"center"} />
//           </Animated.View>
//         ))}
//       </View>
//       <Link href={"/pages/login/Login"} asChild>
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
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: Colors.white,
//   },
//   profileContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: Colors.mainColor,
//     paddingBottom: 28,
//     paddingTop: 40,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 8,
//     resizeMode: "cover",
//   },
//   profileName: {
//     color: "white",
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   infoContainer: {
//     padding: 16,
//     backgroundColor: Colors.white,
//   },
//   infoRow: {
//     // alignItems: "center",
//     marginBottom: 10,
//     marginTop: 12,
//   },
//   iconCon: {
//     width: 40,
//     height: 40,
//     borderRadius: 50,
//     borderColor: Colors.border,
//     marginRight: 10,
//     borderWidth: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   icon: {
//     marginRight: 16,
//   },
//   infoColumn: {
//     flex: 1,
//   },
//   label: {
//     fontSize: Fonts.regular,
//     color: Colors.text,
//   },
//   input: {
//     fontSize: Fonts.large,
//     paddingVertical: 4,
//     flex: 1,
//   },
//   logout: {
//     color: Colors.red,
//   },
//   logoutButton: {
//     width: 120,
//     marginLeft: 20,
//     paddingVertical: 5,
//     marginBottom: 20,
//   },
// });

// export default OwnerProfile;

import React, { Fragment, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";
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
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import useApiHook from "@/hooks/all_api_hooks";
import { Link } from "expo-router";
import { radius } from "@/constants/sizes";

const OwnerProfile = () => {
  const { bottom, top } = useSafeAreaInsets();
  const { selectedImage, pickImage } = useImagePicker();
  const [focusInput, setFocusInput] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<any>({
    id: 0,
    profilePhoto: "",
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const { data: OwnerData } = useApiHook("owners/");
  const db = useSQLiteContext();
  const updateButtonWidth = useSharedValue(0); // Starts hidden
  const logoutButtonWidth = useSharedValue(100); // Starts at 100%

  const fetchProfileData = async () => {
    try {
      const OwnerProfileData = OwnerData;
      if (OwnerProfileData && OwnerProfileData?.results?.length > 0) {
        const profile = OwnerProfileData?.results[0];
        setProfileData(profile);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
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
      const result = await update_owner_profile(db, profileData);
      if (result.success) {
        fetchProfileData();
        ToastAndroid.show("Profile updated successfully!", ToastAndroid.SHORT);
      }
    } catch (error) {}
  };

  const infoData = [
    {
      icon: (
        <Ionicons name="person-outline" size={22} color={Colors.mainColor} />
      ),
      label: "Name",
      key: "name",
    },
    {
      icon: <MaterialIcons name="email" size={22} color={Colors.mainColor} />,
      label: "Email",
      key: "email",
    },
    {
      icon: (
        <Ionicons name="location-outline" size={22} color={Colors.mainColor} />
      ),
      label: "Address",
      key: "address",
    },
    {
      icon: <Ionicons name="call-outline" size={22} color={Colors.mainColor} />,
      label: "Phone",
      key: "phone",
    },
  ];

  const handleFocus = () => {
    setFocusInput(true);
    updateButtonWidth.value = withTiming(50, { duration: 300 });
    logoutButtonWidth.value = withTiming(50, { duration: 300 });
  };

  const handleBlur = () => {
    setFocusInput(false);
    updateButtonWidth.value = withTiming(0, { duration: 300 });
    logoutButtonWidth.value = withTiming(100, { duration: 300 });
  };

  // Animated styles
  const updateButtonStyle = useAnimatedStyle(() => ({
    width: `${updateButtonWidth.value}%`,
  }));

  const logoutButtonStyle = useAnimatedStyle(() => ({
    width: `${logoutButtonWidth.value}%`,
  }));

  return (
    <ScrollView contentContainerStyle={[styles.container]}>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={() => pickImage()}>
          {profileData?.profilePhoto ? (
            <Image
              source={{ uri: profileData?.profilePhoto }}
              style={styles.profileImage}
            />
          ) : (
            <Image
              source={require("../../../assets/images/placeholder.jpeg")}
              style={styles.profileImage}
            />
          )}
        </TouchableOpacity>
        <Animated.Text
          entering={FadeInDown.delay(50).duration(400)}
          style={styles.profileName}
        >
          {profileData?.name}
        </Animated.Text>
      </View>
      <View style={styles.infoContainer}>
        {infoData?.map((item, index) => (
          <Animated.View
            entering={FadeInDown.delay(index * 50).duration(400)}
            style={[
              styles.infoRow,
              { shadowColor: Colors.shadow, elevation: 10 },
            ]}
            key={index?.toString()}
          >
            <View style={[styles.infoRow, { flexDirection: "row" }]}>
              <View style={styles.iconCon}>{item?.icon}</View>
              <View style={styles.infoColumn}>
                <Text style={styles.label}>{item?.label}</Text>
                <TextInput
                  style={styles.input}
                  value={`${profileData[item?.key]}`}
                  onChangeText={(e) => handleInputChange(e, item?.key)}
                  onTouchStart={() => setFocusInput(true)}
                />
              </View>
            </View>
          </Animated.View>
        ))}
      </View>
      {/* <Link href={"/pages/login/Login"} asChild>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logout}>Log out</Text>
        </TouchableOpacity>
      </Link>
      {focusInput && (
        <Button
          title="Update"
          bg={Colors.mainColor}
          titleColor={Colors.white}
          radius={radius.small}
          width={"90%"}
          onPress={handleSaveProfileInfo}
        />
      )} */}

      <View style={styles.buttonContainer}>
        <Animated.View style={[styles.animatedButton, updateButtonStyle]}>
          {focusInput && (
            <TouchableOpacity>
              <Text>Update</Text>
            </TouchableOpacity>
          )}
        </Animated.View>

        <Animated.View style={[styles.animatedButton, logoutButtonStyle]}>
          <Link href={"/pages/login/Login"} asChild>
            <TouchableOpacity style={styles.logoutButton}>
              <Text style={styles.logout}>Log out</Text>
            </TouchableOpacity>
          </Link>
        </Animated.View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
  },
  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.mainColor,
    paddingBottom: 32,
    paddingTop: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  profileName: {
    color: Colors.white,
    fontSize: Fonts.extraLarge,
    fontWeight: "bold",
    marginVertical: 8,
  },
  infoContainer: {
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  infoRow: {
    marginBottom: 12,
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    paddingTop: 10,
    borderRadius: radius.small,
  },
  iconCon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: Colors.mainColor,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.lightGray,
  },
  infoColumn: {
    flex: 1,
    paddingLeft: 10,
  },
  label: {
    fontSize: Fonts.medium,
    color: Colors.text,
  },
  input: {
    fontSize: Fonts.large,
    paddingVertical: 4,
    color: Colors.text,
    borderBottomColor: Colors.mainColor,
    borderBottomWidth: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 20,
  },
  animatedButton: {
    overflow: "hidden",
  },
  logoutButton: {
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: Colors.red,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: radius.small,
    marginBottom: 20,
  },
  logout: {
    color: Colors.white,
    fontSize: Fonts.medium,
    fontWeight: "600",
  },
});

export default OwnerProfile;
