// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import React from "react";
// import { Fonts } from "@/constants/Fonts";

// interface buttonProps {
//   bg: string;
//   titleColor: string;
//   title: string;
//   radius: number;
//   width: any;
//   onPress?: () => void;
// }

// const Button: React.FC<buttonProps> = ({
//   bg,
//   titleColor,
//   title,
//   radius,
//   width,
//   onPress,
// }) => {
//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       style={[
//         styles.saveButton,
//         { backgroundColor: bg, borderRadius: radius, width: width },
//       ]}
//     >
//       <Text style={[styles.buttonText, { color: titleColor }]}>{title}</Text>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   saveButton: {
//     width: "90%",
//     alignSelf: "center",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: "auto",
//     marginBottom: 20,
//     height: 46,
//   },
//   buttonText: {
//     fontSize: Fonts.large,
//   },
// });
// export default Button;

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Fonts } from "@/constants/Fonts";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Colors } from "@/constants/Colors";

interface buttonProps {
  bg: string;
  titleColor: string;
  title: string;
  radius: number;
  width: any;
  onPress?: () => void;
}

const Button: React.FC<buttonProps> = ({
  bg,
  titleColor,
  title,
  radius,
  width,
  onPress,
}) => {
  const scale = useSharedValue(1); // Initial scale value

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }], // Scale transformation
    };
  });

  const handlePressIn = () => {
    // First, make the button smaller
    scale.value = withSpring(0.9, { stiffness: 200 }, () => {
      // Then, make the button bigger after shrinking
      scale.value = withSpring(1, { stiffness: 200 });
    });
  };

  const handlePressOut = () => {
    // Return the button to its normal size
    scale.value = withSpring(1, { stiffness: 200 });
    if (onPress) onPress(); // Call onPress function after animation
  };

  const CustomerTouchable = Animated.createAnimatedComponent(TouchableOpacity);
  return (
    <CustomerTouchable
      activeOpacity={1} // Keep it fully opaque while pressed
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.saveButton,
        { backgroundColor: bg, borderRadius: radius, width: width },
        animatedStyle,
      ]}
    >
      <Text style={[styles.buttonText, { color: titleColor }]}>{title}</Text>
    </CustomerTouchable>
  );
};

const styles = StyleSheet.create({
  saveButton: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
    marginBottom: 20,
    height: 46,
  },
  buttonText: {
    fontSize: Fonts.large,
  },
});

export default Button;
