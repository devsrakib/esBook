// import React, { useCallback, useEffect, useState } from "react";
// import {
//   Alert,
//   TextInput,
//   View,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
// } from "react-native";
// import Button from "@/components/UI/Button";
// import { Colors } from "@/constants/Colors";
// import { radius } from "@/constants/sizes";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import { Fonts } from "@/constants/Fonts";
// import { Link, Stack } from "expo-router";
// import Header from "@/components/UI/header/Header";
// import Modal from "react-native-modal";
// import Animated, {
//   FadeInDown,
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
// } from "react-native-reanimated";

// const login = async (username: string, password: any) => {
//   try {
//     const response = await axios.post(
//       "http://10.0.2.2:8000/api/v1/user/login/",
//       { username, password }
//     );
//     if (response.status === 200) {
//       const { access, refresh } = response.data;
//       await AsyncStorage.setItem("accessToken", access);
//       await AsyncStorage.setItem("refreshToken", refresh);
//       Alert.alert("Login Successful", "Welcome back!");
//     }
//   } catch (error) {
//     console.error("Login error:", error);
//     Alert.alert("Login Failed", "Invalid username or password");
//   }
// };

// const LoginScreen = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPasswordFields, setShowPasswordFields] = useState(false);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const modalHeight = useSharedValue(200);

//   useEffect(() => {
//     modalHeight.value = withTiming(showPasswordFields ? 400 : 260, {
//       duration: 500,
//     });
//   }, [showPasswordFields]);

//   const animatedStyle = useAnimatedStyle(() => ({
//     height: modalHeight.value,
//   }));

//   const handlePasswordReset = useCallback(() => {
//     setShowPasswordFields(true);
//   }, []);

//   const handleLogin = useCallback(() => {
//     login(username, password);
//   }, [username, password]);

//   const handleInput = useCallback((e: string) => {
//     setUsername(e);
//   }, []);

//   const CustomInput = Animated.createAnimatedComponent(TextInput);
//   return (
//     <View style={styles.container}>
//       <Stack.Screen options={{ headerShown: false }} />
//       <Header
//         children="Login"
//         backgroundColor={Colors.mainColor}
//         textColor={Colors.white}
//       />
//       <View style={styles.inputFieldCon}>
//         <Animated.Text
//           entering={FadeInDown.springify()}
//           style={styles.loginText}
//         >
//           Login
//         </Animated.Text>
//         <View style={styles.inputAndLabelCon}>
//           <Animated.Text
//             entering={FadeInDown.delay(100).springify()}
//             style={styles.label}
//           >
//             username
//           </Animated.Text>
//           <CustomInput
//             style={styles.input}
//             placeholder="Username"
//             value={username}
//             onChangeText={handleInput}
//             autoCapitalize="none"
//           />
//         </View>
//         <View style={styles.inputAndLabelCon}>
//           <Animated.Text
//             entering={FadeInDown.delay(400).springify()}
//             style={styles.label}
//           >
//             password
//           </Animated.Text>
//           <CustomInput
//             style={styles.input}
//             placeholder="Password"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry
//           />
//         </View>
//         <TouchableOpacity
//           onPress={() => setIsModalVisible(true)}
//           style={styles.forgotPass}
//         >
//           <Animated.Text
//             entering={FadeInDown.delay(700).springify()}
//             style={styles.passText}
//           >
//             Forgot Password
//           </Animated.Text>
//         </TouchableOpacity>
//         <Button
//           title="Login"
//           onPress={handleLogin}
//           titleColor={Colors.white}
//           bg={Colors.mainColor}
//           radius={radius.small}
//           width={"90%"}
//         />
//         <Link href={"/pages/signUp/signUp"} asChild>
//           <TouchableOpacity>
//             <Text style={styles.noAccount}>I don't have an account</Text>
//           </TouchableOpacity>
//         </Link>
//       </View>
//       <Modal
//         isVisible={isModalVisible}
//         onBackdropPress={() => setIsModalVisible(false)}
//         style={{ justifyContent: "flex-end", margin: 0 }}
//       >
//         <Animated.View style={[styles.modalContent, animatedStyle]}>
//           <Text style={[styles.loginText, { alignSelf: "center" }]}>
//             Reset Password
//           </Text>
//           {showPasswordFields ? (
//             <Animated.View
//               entering={FadeInDown.delay(50).springify()}
//               style={styles.passwordFields}
//             >
//               <Text style={styles.label}>New Password</Text>
//               <TextInput
//                 placeholder="Enter new password"
//                 value={newPassword}
//                 onChangeText={setNewPassword}
//                 secureTextEntry
//                 style={styles.input}
//               />
//               <Text style={styles.label}>Confirm Password</Text>
//               <TextInput
//                 placeholder="Confirm new password"
//                 value={confirmPassword}
//                 onChangeText={setConfirmPassword}
//                 secureTextEntry
//                 style={styles.input}
//               />
//               <Button
//                 title="Submit"
//                 onPress={() => Alert.alert("Password Updated!")}
//                 titleColor={Colors.white}
//                 bg={Colors.mainColor}
//                 radius={radius.small}
//                 width={"100%"}
//               />
//             </Animated.View>
//           ) : (
//             <>
//               <Text style={styles.label}>Email</Text>
//               <TextInput
//                 placeholder="Enter your email"
//                 value={email}
//                 onChangeText={setEmail}
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 style={styles.input}
//               />
//               <Button
//                 title="Reset Password"
//                 onPress={handlePasswordReset}
//                 titleColor={Colors.white}
//                 bg={Colors.mainColor}
//                 radius={radius.small}
//                 width={"100%"}
//               />
//             </>
//           )}
//         </Animated.View>
//       </Modal>
//     </View>
//   );
// };

// export default React.memo(LoginScreen);

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
//   },
//   input: {
//     width: "100%",
//     padding: 10,
//     marginVertical: 10,
//     borderColor: Colors.mainColor,
//     borderWidth: 1,
//     borderRadius: radius.small,
//     backgroundColor: Colors.white,
//     marginBottom: 20,
//   },
//   loginText: {
//     fontSize: Fonts.large,
//     fontWeight: "600",
//     color: Colors.mainColor,
//     marginVertical: 20,
//   },
//   inputAndLabelCon: {
//     width: "90%",
//     alignSelf: "center",
//   },
//   label: {
//     fontSize: Fonts.regular,
//     color: Colors.text,
//     marginBottom: 2,
//   },
//   forgotPass: {
//     alignSelf: "flex-end",
//     marginRight: 20,
//     marginBottom: 20,
//   },
//   passText: {
//     color: Colors.mainColor,
//     textDecorationLine: "underline",
//   },
//   modalContent: {
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     backgroundColor: Colors.white,
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
//   passwordFields: {
//     marginTop: 20,
//   },
//   noAccount: {
//     color: Colors.red,
//     textDecorationLine: "underline",
//   },
// });

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
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
import Modal from "react-native-modal";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import _ from "lodash";

// Custom hook for managing login state
const useLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Debounced input handler to reduce re-renders
  const handleInput = useCallback(
    _.debounce((e) => setUsername(e), 300),
    []
  );

  const login = async () => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    try {
      const response = await axios
        .post("http://10.0.2.2:8000/api/v1/user/login/", formData)
        .then((response) => {
          console.log(response);
        })
        .catch();
      console.log(JSON.stringify(formData));

      // if (response.status === 200) {
      //   // const { access, refresh } = response.data;
      //   // await AsyncStorage.setItem("accessToken", access);
      //   // await AsyncStorage.setItem("refreshToken", refresh);
      //   // Alert.alert("Login Successful", "Welcome back!");
      //   console.log(response.data, ";;;;;;;;");
      // }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Login Failed", "Invalid username or password");
    }
  };

  return { username, password, setPassword, handleInput, login };
};

const LoginScreen = () => {
  const { username, password, setPassword, handleInput, login } = useLogin();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const modalHeight = useSharedValue(200);

  useEffect(() => {
    modalHeight.value = withTiming(showPasswordFields ? 400 : 260, {
      duration: 500,
    });
  }, [showPasswordFields]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: modalHeight.value,
  }));

  const handlePasswordReset = async () => {
    setShowPasswordFields(true);
  };

  const { top } = useSafeAreaInsets();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { flex: 1, backgroundColor: Colors.background },
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
        },
        input: {
          width: "100%",
          padding: 10,
          marginVertical: 10,
          borderColor: Colors.mainColor,
          borderWidth: 1,
          borderRadius: radius.small,
          backgroundColor: Colors.white,
          marginBottom: 20,
        },
        loginText: {
          fontSize: Fonts.large,
          fontWeight: "600",
          color: Colors.mainColor,
          marginVertical: 20,
        },
        inputAndLabelCon: { width: "90%", alignSelf: "center" },
        label: { fontSize: Fonts.regular, color: Colors.text, marginBottom: 2 },
        forgotPass: {
          alignSelf: "flex-end",
          marginRight: 20,
          marginBottom: 20,
        },
        passText: { color: Colors.mainColor, textDecorationLine: "underline" },
        modalContent: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: Colors.white,
          paddingHorizontal: 20,
          paddingTop: 20,
        },
        passwordFields: { marginTop: 20 },
        noAccount: { color: Colors.red, textDecorationLine: "underline" },
      }),
    []
  );

  const CustomInput = Animated.createAnimatedComponent(TextInput);

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header
        children="Login"
        backgroundColor={Colors.mainColor}
        textColor={Colors.white}
      />
      <View style={styles.inputFieldCon}>
        <Animated.Text
          entering={FadeInDown.delay(50).springify().damping(80).stiffness(200)}
          style={styles.loginText}
        >
          Login
        </Animated.Text>
        <View style={styles.inputAndLabelCon}>
          <Animated.Text
            entering={FadeInDown.delay(100)
              .springify()
              .damping(80)
              .stiffness(200)}
            style={styles.label}
          >
            username
          </Animated.Text>
          <Animated.View
            entering={FadeInDown.delay(200)
              .springify()
              .damping(80)
              .stiffness(200)}
          >
            <TextInput
              style={styles.input}
              placeholder="Username"
              // value={username}
              onChangeText={handleInput}
              autoCapitalize="none"
            />
          </Animated.View>
        </View>
        <View style={styles.inputAndLabelCon}>
          <Animated.Text
            entering={FadeInDown.delay(400)
              .springify()
              .damping(80)
              .stiffness(200)}
            style={styles.label}
          >
            password
          </Animated.Text>
          <Animated.View
            entering={FadeInDown.delay(200)
              .springify()
              .damping(80)
              .stiffness(200)}
          >
            <TextInput
              style={styles.input}
              placeholder="Password"
              // value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </Animated.View>
        </View>
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={styles.forgotPass}
        >
          <Animated.Text
            entering={FadeInDown.delay(700)
              .springify()
              .damping(80)
              .stiffness(200)}
            style={styles.passText}
          >
            Forgot Password
          </Animated.Text>
        </TouchableOpacity>
        <Animated.View
          entering={FadeInDown.delay(800)
            .springify()
            .damping(80)
            .stiffness(200)}
          style={{ width: "100%" }}
        >
          <Button
            title="Login"
            onPress={login}
            titleColor={Colors.white}
            bg={Colors.mainColor}
            radius={radius.small}
            width={"90%"}
          />
        </Animated.View>
        <Link href={"/pages/signUp/signUp"} asChild>
          <TouchableOpacity>
            <Text style={styles.noAccount}>I don't have an account</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <Animated.View style={[styles.modalContent, animatedStyle]}>
          <Text style={[styles.loginText, { alignSelf: "center" }]}>
            Reset Password
          </Text>
          {showPasswordFields ? (
            <Animated.View
              entering={FadeInDown.delay(50)
                .duration(500)
                .springify()
                .damping(80)
                .stiffness(200)}
              style={[styles.passwordFields]}
            >
              <Text style={styles.label}>New Password</Text>
              <TextInput
                placeholder="Enter new password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                style={styles.input}
              />
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                placeholder="Confirm new password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                style={styles.input}
              />
              <Button
                title="Submit"
                onPress={() => Alert.alert("Password Updated!")}
                titleColor={Colors.white}
                bg={Colors.mainColor}
                radius={radius.small}
                width={"100%"}
              />
            </Animated.View>
          ) : (
            <>
              <Text style={styles.label}>Email</Text>
              <TextInput
                placeholder="Enter your email"
                value={email}
                onChangeText={(e) => setEmail(e)}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />
              <Button
                title="Reset Password"
                onPress={handlePasswordReset}
                titleColor={Colors.white}
                bg={Colors.mainColor}
                radius={radius.small}
                width={"100%"}
              />
            </>
          )}
        </Animated.View>
      </Modal>
    </View>
  );
};

export default LoginScreen;
