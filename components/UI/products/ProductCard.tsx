// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   Pressable,
//   Dimensions,
// } from "react-native";
// import React, { memo } from "react";
// import { radius } from "@/constants/sizes";
// import { Colors } from "@/constants/Colors";
// import { Fonts } from "@/constants/Fonts";
// import Animated, { FadeInDown } from "react-native-reanimated";
// import { Link } from "expo-router";

// const { width } = Dimensions.get("window");

// const isTablet = width >= 600;
// const ProductCard = ({ item }: any) => {
//   const CustomPressable = Animated.createAnimatedComponent(Pressable);

//   return (
//     <Link href={"/pages/product/ProductView"} asChild>
//       <CustomPressable
//         entering={FadeInDown.delay(50).damping(80).springify().stiffness(200)}
//         style={styles.container}
//       >
//         <View style={styles.imgCon}>
//           <Image
//             style={styles.productPhoto}
//             source={require("../../../assets/images/bookBlue.png")}
//           />
//         </View>
//         <View style={styles.textContainer}>
//           <Text style={styles.title}>{item?.product_name + "Onion"}</Text>
//           <Text style={styles.desc}>Buying Price: {item?.buying_price}</Text>
//         </View>
//         <View style={styles.quantityCon}>
//           <Text style={styles.quantity}>{item?.quantity}</Text>
//         </View>
//       </CustomPressable>
//     </Link>
//   );
// };

// export default memo(ProductCard);

// const styles = StyleSheet.create({
//   container: {
//     height: 160,
//     width: isTablet ? "48%" : "46%",
//     shadowColor: Colors.text,
//     elevation: 5,
//     // flexDirection: "row",
//     // alignItems: "center",
//     gap: 8,
//     backgroundColor: Colors.white,
//     margin: 8,
//     paddingHorizontal: 10,
//     paddingVertical: 10,
//     // backgroundColor: "red",
//   },
//   imgCon: {
//     width: 40,
//     height: 40,
//     backgroundColor: Colors.VeroneseGreen,
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: radius.small,
//   },
//   productPhoto: {
//     width: 35,
//     height: 35,
//     borderRadius: radius.small,
//     resizeMode: "contain",
//   },
//   textContainer: {
//     flex: 1,
//     gap: 4,
//   },
//   title: {
//     fontSize: Fonts.regular,
//     color: Colors.mainColor,
//   },
//   quantityCon: {
//     width: 25,
//     height: 25,
//     borderRadius: radius.small,
//     alignItems: "center",
//     justifyContent: "center",
//     shadowColor: Colors.text,
//     elevation: 5,
//     backgroundColor: Colors.white,
//   },
//   quantity: {
//     color: Colors.mainColor,
//     fontSize: Fonts.small,
//     fontWeight: "500",
//   },
//   desc: {
//     color: Colors.text,
//     fontSize: Fonts.small,
//   },
// });

import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import React, { memo } from "react";
import { radius } from "@/constants/sizes";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Link } from "expo-router";

const { width } = Dimensions.get("window");

const isTablet = width >= 600;
const ProductCard = ({ item }: any) => {
  const CustomPressable = Animated.createAnimatedComponent(Pressable);
  const available = 10;
  return (
    <Link href={"/pages/product/ProductView"} asChild>
      <CustomPressable
        entering={FadeInDown.delay(50).damping(80).springify().stiffness(200)}
        style={styles.container}
      >
        <View style={styles.imgCon}>
          <Image
            style={styles.productPhoto}
            source={require("../../../assets/images/bookBlue.png")}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item?.product_name}Onion</Text>
          <Text style={styles.price}>Price: ${item?.buying_price}</Text>
          <Text
            style={[
              styles.desc,
              { color: available <= 10 ? Colors.red : Colors.text },
            ]}
          >
            Available: {item?.quantity} pcs
          </Text>
        </View>
      </CustomPressable>
    </Link>
  );
};

export default memo(ProductCard);

const styles = StyleSheet.create({
  container: {
    width: isTablet ? "48%" : "46%",
    backgroundColor: Colors.white,
    borderRadius: radius.small,
    margin: 8,
    padding: 12,
    shadowColor: Colors.text,
    elevation: 8,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    overflow: "hidden",
  },
  imgCon: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.VeroneseGreen,
    borderRadius: radius.small,
    marginBottom: 8,
  },
  productPhoto: {
    width: "80%",
    height: "80%",
    borderRadius: radius.small,
    resizeMode: "contain",
  },
  textContainer: {
    flex: 1,
    // alignItems: "center",
  },
  title: {
    fontSize: Fonts.medium,
    color: Colors.mainColor,
    fontWeight: "bold",
    marginBottom: 4,
  },
  price: {
    fontSize: Fonts.regular,
    color: Colors.text,
    fontWeight: "600",
  },
  desc: {
    fontSize: Fonts.small,
    color: Colors.text,
    marginTop: 4,
  },
});
