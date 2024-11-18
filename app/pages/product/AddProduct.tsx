import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { Colors } from "@/constants/Colors";
import Header from "../../../components/UI/header/Header";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import Modal from "react-native-modal";
import { radius } from "@/constants/sizes";
import Button from "@/components/UI/Button";
import CustomSelector from "@/components/UI/products/CustomSelector";
import SupplierListModal from "@/components/UI/products/SupplierListModal";
import axios from "axios";
import { apiUrl } from "@/hooks/all_api_hooks";
import CategoryListModal from "@/components/UI/products/CategoryListModel";
import { getToken } from "@/utils/getToken";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import BottomSheet from "@/components/UI/BottomSheet";

const AddProduct = () => {
  const { top } = useSafeAreaInsets();

  const [productName, setProductName] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [buyingPrice, setBuyingPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState({ id: "", title: "" });
  const [supplier, setSupplier] = useState({ id: "", name: "" });
  const [supplierVisible, setSupplierVisible] = useState(false);
  const [categoryVisible, setCategoryVisible] = useState(false);

  // Shared value for dropdown height
  const dropdownHeight = useSharedValue(0);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const openModal = () => {
    bottomSheetRef.current?.present();
    //#endregion
  };
  // Toggle dropdown
  const toggleDropdown = (text: string) => {
    if (text === "supplier") {
      setSupplierVisible(!supplierVisible);
      openModal();
    } else {
      setCategoryVisible(!categoryVisible);
    }
    dropdownHeight.value = withTiming(supplierVisible ? 0 : 150, {
      duration: 300,
    });
  };

  // Handlers for selecting supplier and category
  const handleSelectedSupplier = useCallback((id: string, name: string) => {
    setSupplier({ id, name });
  }, []);

  const handleSelectedCategory = useCallback((id: string, title: string) => {
    setCategory({ id, title });
  }, []);

  // Create Product function
  const createProduct = async () => {
    try {
      const token = await getToken();
      const response = await axios.post(
        `${apiUrl}product/`,
        {
          product_name: productName,
          buying_price: buyingPrice,
          selling_price: sellingPrice,
          discount_price: discountPrice,
          quantity: quantity,
          category: category?.id,
          supplier: supplier?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Header
        children="Add Product"
        backgroundColor={Colors.mainColor}
        textColor={Colors.white}
      />

      <ScrollView>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Product Name</Text>
          <TextInput
            style={styles.input}
            value={productName}
            onChangeText={setProductName}
            placeholder="Enter product name"
          />

          <Text style={styles.label}>Buying Price</Text>
          <TextInput
            style={styles.input}
            value={buyingPrice}
            onChangeText={setBuyingPrice}
            placeholder="Enter buying price"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Selling Price</Text>
          <TextInput
            style={styles.input}
            value={sellingPrice}
            onChangeText={setSellingPrice}
            placeholder="Enter selling price"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Discount Price</Text>
          <TextInput
            style={styles.input}
            value={discountPrice}
            onChangeText={setDiscountPrice}
            placeholder="Enter discount price"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Quantity</Text>
          <TextInput
            style={styles.input}
            value={quantity}
            onChangeText={setQuantity}
            placeholder="Enter quantity"
            keyboardType="numeric"
          />

          <CustomSelector
            toggleDropdown={toggleDropdown}
            category={category}
            supplier={supplier}
          />
          {/* <SupplierListModal
            setVisible={setSupplierVisible}
            visible={supplierVisible}
            setSupplier={handleSelectedSupplier}
          /> */}
          <BottomSheet ref={bottomSheetRef} />
          <CategoryListModal
            setVisible={setCategoryVisible}
            visible={categoryVisible}
            setCategory={handleSelectedCategory}
          />
        </View>
      </ScrollView>

      <View style={styles.buttonCon}>
        <Button
          title="ADD PRODUCT"
          titleColor={Colors.white}
          radius={radius.small}
          bg={Colors.mainColor}
          width={"90%"}
          onPress={createProduct}
        />
      </View>
    </View>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.page_bg,
  },
  inputContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    marginLeft: 3,
    color: Colors.darkCharcoal,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: Colors.white,
  },
  buttonCon: {
    marginTop: "auto",
  },
});
