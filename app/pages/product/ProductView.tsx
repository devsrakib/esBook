import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useEffect } from "react";

import { Link, Stack, useLocalSearchParams } from "expo-router";

import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/UI/header/Header";
import { radius } from "@/constants/sizes";
import { Fonts } from "@/constants/Fonts";
import { Fontisto } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchProducts } from "@/redux/features/product/productSlice";
import CustomLoader from "@/components/UI/CustomLoader";

const ProductView = () => {
  const params = useLocalSearchParams();
const {id} = params
  const { top } = useSafeAreaInsets();
  const CustomPressable = Animated.createAnimatedComponent(Pressable);
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ categoryId: "", productId: id })); // Fetch product by id or all products if id is null
  }, []);

  console.log(id, 'this is id::::::::');
  console.log(products, ")))))))))))))) ++++++++");
  
  

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Header
        children="Product details"
        backgroundColor={Colors.mainColor}
        textColor={Colors.white}
      />

     <>
     {
      loading ? <CustomLoader /> :
      <View style={styles.body}>
      <Animated.Image
        style={styles.productPhoto}
        source={{uri: products?.photo}}
        entering={FadeInDown.delay(90)
          .duration(200)
          .damping(80)
          .springify()
          .stiffness(200)}
        // defaultSource={require("")}
      />
      <View style={styles.detailsCon}>
        <View style={styles.nameCon}>
          <Animated.Text
            entering={FadeInDown.delay(180)
              .duration(200)
              .damping(80)
              .springify()
              .stiffness(200)}
            style={styles.productName}
          >
            <Text style={{ fontWeight: "500", color: "black" }}>
              Product:
            </Text>{" "}
            {products?.product_name}
          </Animated.Text>
          <Link
            href={{
              pathname: "/pages/product/SellerInfo",
              params: {
                id: products?.supplier,
              },
            }}
            asChild
          >
            <CustomPressable
              entering={FadeInDown.delay(260)
                .duration(200)
                .damping(80)
                .springify()
                .stiffness(200)}
              style={styles.sellerInfo}
            >
              <Text style={styles.sellerText}>Seller Info</Text>
              <Fontisto name="person" size={14} color={Colors.mainColor} />
            </CustomPressable>
          </Link>
        </View>
        <Animated.Text
          entering={FadeInDown.delay(320)
            .duration(200)
            .damping(80)
            .springify()
            .stiffness(200)}
          style={styles.stock}
        >
          Stock available: {products?.quantity}
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(500)
            .duration(200)
            .damping(80)
            .springify()
            .stiffness(200)}
          style={styles.selling}
        >
          Selling Price: {products?.selling_price} Tk
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(400)
            .duration(200)
            .damping(80)
            .springify()
            .stiffness(200)}
          style={styles.buying}
        >
          Buying Price: {products?.buying_price}Tk
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(440)
            .duration(200)
            .damping(80)
            .springify()
            .stiffness(200)}
          style={[styles.buying, { fontWeight: "normal" }]}
        >
          buying date: {new Date(products?.createdAt).toDateString()}
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(580)
            .duration(200)
            .damping(80)
            .springify()
            .stiffness(200)}
          style={styles.desc}
        >
          {products?.description}
          Description Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Non, necessitatibus!
        </Animated.Text>
      </View>
    </View>
     }
     </>
    </View>
  );
};

export default ProductView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.page_bg,
  },
  body: {
    flex: 1,
    paddingTop: 10,
  },
  nameCon: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productPhoto: {
    width: "95%",
    height: 200,
    resizeMode: "cover",
    alignSelf: "center",
    borderRadius: radius.small,
  },
  sellerInfo: {
    backgroundColor: Colors.VeroneseGreen,
    borderRadius: radius.small,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 2,
    flexDirection: "row",
    gap: 6,
  },
  sellerText: {
    color: Colors.mainColor,
    fontWeight: "500",
  },
  detailsCon: {
    padding: 20,
    gap: 6,
  },
  productName: {
    color: Colors.mainColor,
    fontSize: Fonts.large,
    fontWeight: "600",
  },
  desc: {
    fontSize: Fonts.regular,
    color: Colors.text,
  },

  priceCon: {
    gap: 20,
    flexDirection: "row",
  },
  stock: {
    fontSize: Fonts.medium,
    fontWeight: "500",
    color: Colors.darkCharcoal,
  },
  buying: {
    fontSize: Fonts.regular,
    color: Colors.orange,
    fontWeight: "500",
  },
  selling: {
    fontSize: Fonts.regular,
    color: Colors.green,
    fontWeight: "500",
  },
});
