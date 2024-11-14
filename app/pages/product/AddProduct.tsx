import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useCallback, useState } from "react";
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

const AddProduct = () => {
  const { top } = useSafeAreaInsets();

  const [productName, setProductName] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [visible, setVisible] = useState(false);
  const [supplier, setSupplier] = useState("");

  // Shared value for dropdown height
  const dropdownHeight = useSharedValue(0);

  // Toggle dropdown
  const toggleDropdown = () => {
    setVisible(!visible);
    dropdownHeight.value = withTiming(visible ? 0 : 150, {
      duration: 300,
    }); // Animate height change
  };

  const handleSelectedSupplier = useCallback((id: string) => {
    setSupplier(id);
  }, []);

  const dropdownStyle = useAnimatedStyle(() => {
    return {
      height: dropdownHeight.value,
      opacity: dropdownHeight.value > 0 ? 1 : 0,
    };
  });

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
          animationDuration: 100,
        }}
      />
      <Header
        children="Add product"
        backgroundColor={Colors.mainColor}
        textColor={Colors.white}
      />

      <ScrollView>
        <View style={styles.inputContainer}>
          {/* Product Name Input */}
          <Text style={styles.label}>Product Name</Text>
          <TextInput
            style={styles.input}
            value={productName}
            onChangeText={setProductName}
            placeholder="Enter product name"
          />

          {/* Selling Price Input */}
          <Text style={styles.label}>Selling Price</Text>
          <TextInput
            style={styles.input}
            value={sellingPrice}
            onChangeText={setSellingPrice}
            placeholder="Enter selling price"
            keyboardType="numeric"
          />

          {/* Discount Price Input */}
          <Text style={styles.label}>Discount Price</Text>
          <TextInput
            style={styles.input}
            value={discountPrice}
            onChangeText={setDiscountPrice}
            placeholder="Enter discount price"
            keyboardType="numeric"
          />

          {/* Quantity Input */}
          <Text style={styles.label}>Quantity</Text>
          <TextInput
            style={styles.input}
            value={quantity}
            onChangeText={setQuantity}
            placeholder="Enter quantity"
            keyboardType="numeric"
          />

          {/* Custom Dropdown for Category */}

          <CustomSelector toggleDropdown={toggleDropdown} category={category} />
          {/* Animated Dropdown List */}
          <SupplierListModal
            setVisible={setVisible}
            visible={visible}
            setSupplier={handleSelectedSupplier}
          />
        </View>

        <View style={styles.buttonCon}>
          <Button
            title="ADD PRODUCT"
            titleColor={Colors.white}
            radius={radius.small}
            bg={Colors.mainColor}
            width={"90%"}
          />
        </View>
      </ScrollView>
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
    marginTop: 60,
  },
});
