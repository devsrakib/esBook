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

//   console.log(item);

//   return (
//     <Link
//       href={{
//         pathname: "/pages/product/ProductView",
//         params: {
//           id: item?.id,
//         },
//       }}
//       asChild
//     >

//   const available = 10;
//   return (
//     <Link href={"/pages/product/ProductView"} asChild>

//       <CustomPressable
//         entering={FadeInDown.delay(50).damping(80).springify().stiffness(200)}
//         style={styles.container}
//       >

//         <Animated.Image
//           style={styles.productPhoto}
//           source={require("../../../assets/images/onion.jpg")}
//           defaultSource={require("../../../assets/images/defoulProduct.png")}
//           // sharedTransitionTag="productImage"
//         />
//         <View style={{ paddingHorizontal: 5, paddingBottom: 5 }}>
//           <Text style={styles.title}>{item?.product_name}</Text>
//         <View style={styles.imgCon}>
//           <Image
//             style={styles.productPhoto}
//             source={require("../../../assets/images/bookBlue.png")}
//           />
//         </View>
//         <View style={styles.textContainer}>
//           <Text style={styles.title}>{item?.product_name}Onion</Text>

//           <Text style={styles.price}>Price: ${item?.buying_price}</Text>
//           <Text
//             style={[
//               styles.desc,

//               { color: item?.quantity <= 10 ? Colors.red : Colors.text },
//             ]}
//           >
//             Available:{" "}
//             <Text
//               style={{
//                 color: item?.quantity <= 10 ? Colors.red : Colors.mainColor,
//               }}
//             >
//               {item?.quantity}
//             </Text>{" "}
//             pcs
//               { color: available <= 10 ? Colors.red : Colors.text },
//             ]}
//           >
//             Available: {item?.quantity} pcs
//           </Text>
//         </View>
//       </CustomPressable>
//     </Link>
//   );
// };

// export default memo(ProductCard);

// const styles = StyleSheet.create({
//   container: {
//     width: isTablet ? "48%" : "46%",
//     backgroundColor: Colors.white,
//     borderRadius: radius.small,
//     margin: 8,

//     // padding: 12,

//     padding: 12,
//     shadowColor: Colors.text,
//     elevation: 8,
//     shadowOffset: { width: 1, height: 3 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//     overflow: "hidden",

//     padding: 4,
//   },
//   productPhoto: {
//     width: "100%",
//     height: 80,
//     borderTopLeftRadius: radius.small,
//     borderTopRightRadius: radius.small,
//     resizeMode: "cover",
//     marginBottom: 8,
//   },
//   // textContainer: {
//   //   flex: 1,
//   //   // alignItems: "center",
//   //   backgroundColor: "red",
//   // },

//   },
//   imgCon: {
//     width: "100%",
//     height: 50,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: Colors.VeroneseGreen,
//     borderRadius: radius.small,
//     marginBottom: 8,
//   },
//   productPhoto: {
//     width: "80%",
//     height: "80%",
//     borderRadius: radius.small,
//     resizeMode: "contain",
//   },
//   textContainer: {
//     flex: 1,
//     // alignItems: "center",
//   },
//   title: {
//     fontSize: Fonts.medium,
//     color: Colors.mainColor,
//     fontWeight: "bold",
//     marginBottom: 4,
//   },
//   price: {
//     fontSize: Fonts.regular,
//     color: Colors.text,
//     fontWeight: "600",
//   },
//   desc: {
//     fontSize: Fonts.small,
//     color: Colors.text,
//     marginTop: 4,
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
  console.log(item, "::::::::::::");

  return (
    <Link
      href={{
        pathname: "/pages/product/ProductView",
        params: { id: item?.id },
      }}
      asChild
    >
      <CustomPressable
        entering={FadeInDown.delay(50).damping(80).springify().stiffness(200)}
        style={styles.container}
      >
        {/* Product Image */}
        <View style={styles.imgCon}>
          <Image
            style={styles.productPhoto}
            source={
              item?.productPhoto
                ? { uri: item?.productPhoto }
                : require("../../../assets/images/defoulProduct.png")
            }
          />
        </View>

        {/* Product Details */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item?.product_name}</Text>
          <Text style={styles.price}>Price: ${item?.buying_price}</Text>
          <Text
            style={[
              styles.desc,
              { color: item?.quantity <= 10 ? Colors.red : Colors.text },
            ]}
          >
            Available:{" "}
            <Text
              style={{
                color: item?.quantity <= 10 ? Colors.red : Colors.mainColor,
              }}
            >
              {item?.quantity}
            </Text>{" "}
            pcs
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
    height: 80,
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
    // flex: 1,
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
