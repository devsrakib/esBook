// import React, { useState, useEffect } from "react";
// import {
//   Alert,
//   TextInput,
//   View,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import Button from "@/components/UI/Button";
// import { Colors } from "@/constants/Colors";
// import { radius } from "@/constants/sizes";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import { Fonts } from "@/constants/Fonts";
// import { Link, Stack } from "expo-router";
// import Header from "@/components/UI/header/Header";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withDelay,
//   withTiming,
//   FadeInDown,
// } from "react-native-reanimated";
// import BottomInfoModal from "@/components/UI/shared/CustomModal";
// import BottomToast from "@/components/UI/shared/CustomModal";

// // Define type for the fields
// type FieldKeys = "name" | "email" | "password" | "password2";

// const SignupScreen = () => {
//   const [errorMessage, setErrorMessage] = useState<any>({});
//   const [isError, setIsError] = useState<boolean>(false);
//   const [formData, setFormData] = useState({
//     email: "",
//     name: "",
//     password: "",
//     password2: "",
//     tc: true,
//   });

//   // Initialize shared values for animations
//   const fieldYPositions: Record<FieldKeys, Animated.SharedValue<number>> = {
//     email: useSharedValue(0),
//     name: useSharedValue(0),
//     password: useSharedValue(0),
//     password2: useSharedValue(0),
//   };

//   const fieldOpacities: Record<FieldKeys, Animated.SharedValue<number>> = {
//     email: useSharedValue(0),
//     name: useSharedValue(0),
//     password: useSharedValue(0),
//     password2: useSharedValue(0),
//   };

//   useEffect(() => {
//     const animateFields = async () => {
//       const fields: FieldKeys[] = ["email", "name", "password", "password2"];

//       fields.forEach((field, index) => {
//         fieldOpacities[field].value = withDelay(
//           index * 100,
//           withTiming(1, { duration: 500 })
//         );
//         fieldYPositions[field].value = withDelay(
//           index * 100,
//           withTiming(0, { duration: 500 })
//         );
//       });
//     };

//     animateFields();
//   }, []);

//   const handleChange = (key: FieldKeys, value: string) => {
//     setFormData((prev) => {
//       const newFormData = { ...prev, [key]: value };
//       return newFormData;
//     });
//   };
//   const signup = async () => {
//     try {
//       const response = await axios.post(
//         "http://10.0.2.2:8000/api/v1/user/register/",
//         formData
//       );

//       // console.log("Response:", response);

//       if (response.status === 201) {
//         const { access, refresh } = response?.data?.token;

//         // // Save tokens in AsyncStorage
//         await AsyncStorage.setItem("access_token", access);
//         await AsyncStorage.setItem("refresh_token", refresh);

//         Alert.alert("Signup Successful", "Welcome!");
//       }
//     } catch (error: any) {
//       const errorData = error?.response?.data;
//       if (errorData?.errors) {
//         // Extract the first error message dynamically
//         const firstKey = Object.keys(errorData?.errors)[0];
//         setErrorMessage(errorData?.errors[firstKey][0]);
//         setIsError(true);
//       } else {
//         setErrorMessage("An unexpected error occurred.");
//       }
//     }
//   };

//   const { top } = useSafeAreaInsets();

//   const getAnimatedStyle = (field: FieldKeys) =>
//     useAnimatedStyle(() => ({
//       opacity: fieldOpacities[field].value,
//       transform: [{ translateY: fieldYPositions[field].value }],
//     }));

//   // console.log(errorMessage);

//   return (
//     <View style={[styles.container, { paddingTop: top }]}>
//       <Stack.Screen
//         options={{
//           headerShown: false,
//           animation: "slide_from_right",
//           animationDuration: 50,
//         }}
//       />
//       <ScrollView>
//         <View style={styles.inputFieldCon}>
//           <View style={{ flexDirection: "row" }}>
//             <Animated.Text
//               entering={FadeInDown.delay(100)
//                 .duration(500)
//                 .springify()
//                 .damping(8)}
//               style={styles.signupText}
//             >
//               S
//             </Animated.Text>
//             <Animated.Text
//               entering={FadeInDown.delay(150)
//                 .duration(500)
//                 .springify()
//                 .damping(8)}
//               style={styles.signupText}
//             >
//               i
//             </Animated.Text>
//             <Animated.Text
//               entering={FadeInDown.delay(200)
//                 .duration(500)
//                 .springify()
//                 .damping(8)}
//               style={styles.signupText}
//             >
//               g
//             </Animated.Text>
//             <Animated.Text
//               entering={FadeInDown.delay(250)
//                 .duration(500)
//                 .springify()
//                 .damping(8)}
//               style={styles.signupText}
//             >
//               n
//             </Animated.Text>
//             <Animated.Text
//               entering={FadeInDown.delay(300)
//                 .duration(500)
//                 .springify()
//                 .damping(8)}
//               style={styles.signupText}
//             >
//               U
//             </Animated.Text>
//             <Animated.Text
//               entering={FadeInDown.delay(350)
//                 .duration(500)
//                 .springify()
//                 .damping(8)}
//               style={styles.signupText}
//             >
//               p
//             </Animated.Text>
//           </View>
//       <Stack.Screen options={{ headerShown: false }} />
//       <Header
//         children="Sign Up"
//         backgroundColor={Colors.mainColor}
//         textColor={Colors.white}
//       />
//       <ScrollView>
//         <View style={styles.inputFieldCon}>
//           <Animated.Text
//             entering={FadeInDown.delay(50)
//               .duration(200)
//               .damping(80)
//               .springify()
//               .stiffness(200)}
//             style={[styles.signupText]}
//           >
//             Sign Up
//           </Animated.Text>

//           <Animated.View
//             style={[styles.inputAndLabelCon, getAnimatedStyle("name")]}
//           >
//             <Text style={styles.label}>Full name</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="full name"
//               value={formData.name}
//               onChangeText={(text) => handleChange("name", text)}
//               // autoCapitalize="words"
//             />
//           </Animated.View>

//           <Animated.View
//             style={[styles.inputAndLabelCon, getAnimatedStyle("email")]}
//           >
//             <Text style={styles.label}>Email</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Email Address"
//               value={formData.email}
//               onChangeText={(text) => handleChange("email", text)}
//               keyboardType="email-address"
//               autoCapitalize="none"
//               onKeyPress={() => setIsError(false)}
//             />
//           </Animated.View>

//           <Animated.View
//             style={[styles.inputAndLabelCon, getAnimatedStyle("password")]}
//           >
//             <Text style={styles.label}>password</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="password"
//               value={formData.password}
//               onChangeText={(text) => handleChange("password", text)}
//               autoCapitalize="none"
//               secureTextEntry
//             />
//           </Animated.View>

//           <Animated.View
//             style={[styles.inputAndLabelCon, getAnimatedStyle("password2")]}
//           >
//             <Text style={styles.label}>Confirm Password</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Confirm Password"
//               value={formData.password2}
//               onChangeText={(text) => handleChange("password2", text)}
//               secureTextEntry
//             />
//           </Animated.View>
//           <Button
//             title="Sign Up"
//             onPress={signup}
//             titleColor={Colors.white}
//             bg={Colors.mainColor}
//             radius={radius.small}
//             width={"90%"}
//           />

//           <Link href={"/pages/login/Login"} asChild>
//             <TouchableOpacity>
//               <Text>I have an account</Text>
//             </TouchableOpacity>
//           </Link>
//         </View>
//       </ScrollView>
//       <BottomToast
//         message={errorMessage}
//         visible={isError}
//         bg_color={Colors.red}
//       />
//       {/* <BottomToast message={errorMessage} visible={!!errorMessage} /> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.background,
//   },
//   inputFieldCon: {
//     width: "85%",
//     alignSelf: "center",
//     borderRadius: radius.small,
//     shadowColor: Colors.text,
//     elevation: 10,
//     backgroundColor: Colors.white,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingBottom: 20,
//     marginTop: 80,
//     marginBottom: 20,
//   },
//   input: {
//     width: "100%",
//     padding: 10,
//     marginVertical: 10,
//     borderColor: Colors.mainColor,
//     borderWidth: 1,
//     borderRadius: radius.small,
//     backgroundColor: Colors.white,
//   },
//   signupText: {
//     fontSize: Fonts.large,
//     fontWeight: "600",
//     color: Colors.mainColor,
//     marginVertical: 20,
//   },
//   inputAndLabelCon: {
//     width: "90%",
//     alignSelf: "center",
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: Fonts.regular,
//     color: Colors.text,
//     marginBottom: 2,
//   },
// });

// export default SignupScreen;

import React, { useState, useEffect } from "react";
import {
  Alert,
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Button from "@/components/UI/Button";
import { Colors } from "@/constants/Colors";
import { radius } from "@/constants/sizes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Fonts } from "@/constants/Fonts";
import { Link, Stack } from "expo-router";
import Header from "@/components/UI/header/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
  FadeInDown,
} from "react-native-reanimated";
import BottomToast from "@/components/UI/shared/CustomModal";

// Define type for the fields
type FieldKeys = "name" | "email" | "password" | "password2";

const SignupScreen = () => {
  const [errorMessage, setErrorMessage] = useState<any>({});
  const [isError, setIsError] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    password2: "",
    tc: true,
  });

  // Initialize shared values for animations
  const fieldYPositions: Record<FieldKeys, Animated.SharedValue<number>> = {
    email: useSharedValue(0),
    name: useSharedValue(0),
    password: useSharedValue(0),
    password2: useSharedValue(0),
  };

  const fieldOpacities: Record<FieldKeys, Animated.SharedValue<number>> = {
    email: useSharedValue(0),
    name: useSharedValue(0),
    password: useSharedValue(0),
    password2: useSharedValue(0),
  };

  useEffect(() => {
    const animateFields = async () => {
      const fields: FieldKeys[] = ["email", "name", "password", "password2"];

      fields.forEach((field, index) => {
        fieldOpacities[field].value = withDelay(
          index * 100,
          withTiming(1, { duration: 500 })
        );
        fieldYPositions[field].value = withDelay(
          index * 100,
          withTiming(0, { duration: 500 })
        );
      });
    };

    animateFields();
  }, []);

  const handleChange = (key: FieldKeys, value: string) => {
    setFormData((prev) => {
      const newFormData = { ...prev, [key]: value };
      return newFormData;
    });
  };

  const signup = async () => {
    try {
      const response = await axios.post(
        "http://10.0.2.2:8000/api/v1/user/register/",
        formData
      );

      if (response.status === 201) {
        const { access, refresh } = response?.data?.token;

        await AsyncStorage.setItem("access_token", access);
        await AsyncStorage.setItem("refresh_token", refresh);

        Alert.alert("Signup Successful", "Welcome!");
      }
    } catch (error: any) {
      const errorData = error?.response?.data;
      if (errorData?.errors) {
        const firstKey = Object.keys(errorData?.errors)[0];
        setErrorMessage(errorData?.errors[firstKey][0]);
        setIsError(true);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };

  const { top } = useSafeAreaInsets();

  const getAnimatedStyle = (field: FieldKeys) =>
    useAnimatedStyle(() => ({
      opacity: fieldOpacities[field].value,
      transform: [{ translateY: fieldYPositions[field].value }],
    }));

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ScrollView>
        <View style={styles.inputFieldCon}>
          <View style={{ flexDirection: "row" }}>
            {["S", "i", "g", "n", "U", "p"].map((char, index) => (
              <Animated.Text
                key={index}
                entering={FadeInDown.delay(index * 50)
                  .duration(500)
                  .springify()
                  .damping(8)}
                style={styles.signupText}
              >
                {char}
              </Animated.Text>
            ))}
          </View>

          <Animated.View
            style={[styles.inputAndLabelCon, getAnimatedStyle("name")]}
          >
            <Text style={styles.label}>Full name</Text>
            <TextInput
              style={styles.input}
              placeholder="full name"
              value={formData.name}
              onChangeText={(text) => handleChange("name", text)}
            />
          </Animated.View>

          <Animated.View
            style={[styles.inputAndLabelCon, getAnimatedStyle("email")]}
          >
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={formData.email}
              onChangeText={(text) => handleChange("email", text)}
              keyboardType="email-address"
              autoCapitalize="none"
              onKeyPress={() => setIsError(false)}
            />
          </Animated.View>

          <Animated.View
            style={[styles.inputAndLabelCon, getAnimatedStyle("password")]}
          >
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="password"
              value={formData.password}
              onChangeText={(text) => handleChange("password", text)}
              autoCapitalize="none"
              secureTextEntry
            />
          </Animated.View>

          <Animated.View
            style={[styles.inputAndLabelCon, getAnimatedStyle("password2")]}
          >
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={formData.password2}
              onChangeText={(text) => handleChange("password2", text)}
              secureTextEntry
            />
          </Animated.View>

          <Button
            title="Sign Up"
            onPress={signup}
            titleColor={Colors.white}
            bg={Colors.mainColor}
            radius={radius.small}
            width={"90%"}
          />

          <Link href={"/pages/login/Login"} asChild>
            <TouchableOpacity>
              <Text>I have an account</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>

      <BottomToast
        message={errorMessage}
        visible={isError}
        bg_color={Colors.red}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  inputFieldCon: {
    width: "85%",
    alignSelf: "center",
    borderRadius: radius.small,
    shadowColor: Colors.text,
    elevation: 10,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
    marginTop: 80,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderColor: Colors.mainColor,
    borderWidth: 1,
    borderRadius: radius.small,
    backgroundColor: Colors.white,
  },
  signupText: {
    fontSize: Fonts.large,
    fontWeight: "600",
    color: Colors.mainColor,
    marginVertical: 20,
  },
  inputAndLabelCon: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 15,
  },
  label: {
    fontSize: Fonts.regular,
    color: Colors.text,
    marginBottom: 2,
  },
});

export default SignupScreen;
