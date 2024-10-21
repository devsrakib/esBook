// import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
// import React, { useState } from "react";
// import { Colors } from "@/constants/Colors";
// import Header from "../../../components/UI/header/Header";
// import { Stack } from "expo-router";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { Picker } from "@react-native-picker/picker";
// import Button from "@/components/UI/Button";
// const AddProduct = () => {
//   const { top } = useSafeAreaInsets();

//   const [productName, setProductName] = useState("");
//   const [sellingPrice, setSellingPrice] = useState("");
//   const [discountPrice, setDiscountPrice] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [category, setCategory] = useState("");

//   const categories = ["Electronics", "Fashion", "Groceries", "Home Appliances"];

//   return (
//     <View style={[styles.container, { paddingTop: top }]}>
//       <Stack.Screen
//         options={{
//           headerShown: false,
//           animation: "slide_from_right",
//           animationDuration: 200,
//         }}
//       />
//       <Header
//         children="Add product"
//         backgroundColor={Colors.mainColor}
//         textColor={Colors.white}
//       />

//       {/* Input Fields */}
//       <ScrollView>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Product Name</Text>
//           <TextInput
//             style={styles.input}
//             value={productName}
//             onChangeText={setProductName}
//             placeholder="Enter product name"
//           />

//           <Text style={styles.label}>Selling Price</Text>
//           <TextInput
//             style={styles.input}
//             value={sellingPrice}
//             onChangeText={setSellingPrice}
//             placeholder="Enter selling price"
//             keyboardType="numeric"
//           />

//           <Text style={styles.label}>Discount Price</Text>
//           <TextInput
//             style={styles.input}
//             value={discountPrice}
//             onChangeText={setDiscountPrice}
//             placeholder="Enter discount price"
//             keyboardType="numeric"
//           />

//           <Text style={styles.label}>Quantity</Text>
//           <TextInput
//             style={styles.input}
//             value={quantity}
//             onChangeText={setQuantity}
//             placeholder="Enter quantity"
//             keyboardType="numeric"
//           />

//           {/* Dropdown for Category */}
//           <Text style={styles.label}>Category</Text>
//           <Picker
//             selectedValue={category}
//             style={styles.input}
//             collapsable
//             onValueChange={(itemValue) => setCategory(itemValue)}
//           >
//             {categories?.map((cat, index) => (
//               <Picker.Item key={index} label={cat} value={cat} />
//             ))}
//           </Picker>
//         </View>
//         <View style={styles.buttonCon}>
//           <Button
//             title="ADD PRODUCT"
//             bg={Colors.mainColor}
//             radius={50}
//             width={"90%"}
//             titleColor={Colors.white}
//             onPress={() => {}}
//           />
//         </View>
//       </ScrollView>

//       {/* Submit Button */}
//     </View>
//   );
// };

// export default AddProduct;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.page_bg,
//   },
//   inputContainer: {
//     marginTop: 20,
//     paddingHorizontal: 20,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//     color: Colors.text,
//   },
//   input: {
//     borderWidth: 1,
//     border: Colors.border,
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 15,
//     backgroundColor: Colors.white,
//   },
//   buttonCon: {
//     marginTop: 60,
//   },
// });

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
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

const AddProduct = () => {
  const { top } = useSafeAreaInsets();

  const [productName, setProductName] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [visible, setVisible] = useState(false);

  const categories = [
    "Electronics",
    "Fashion",
    "Groceries",
    "Home Appliances",
    "Toys",
    "Books",
    "Beauty",
    "Automobiles",
    "Sports",
    "Furniture",
    "Stationery",
    "Music",
    "Movies",
    "Health",
    "Jewelry",
  ];

  // Shared value for dropdown height
  const dropdownHeight = useSharedValue(0);

  // Toggle dropdown
  const toggleDropdown = () => {
    setVisible(!visible);
    dropdownHeight.value = withTiming(visible ? 0 : 150, {
      duration: 300,
    }); // Animate height change
  };

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
          animationDuration: 200,
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
          <View style={styles.selectCustomer}>
            <View style={styles.categoryAndCustomer}>
              <Text style={styles.label}>Category</Text>
              <TouchableOpacity
                onPress={toggleDropdown}
                style={styles.dropdownButton}
              >
                <Text style={styles.dropdownText}>
                  {category || "Select Category"}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.categoryAndCustomer}>
              <Text style={styles.label}>Select Supplier</Text>
              <TouchableOpacity
                onPress={toggleDropdown}
                style={styles.dropdownButton}
              >
                <Text style={styles.dropdownText}>
                  {category || "Select Category"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Animated Dropdown List */}
          <Modal
            // presentationStyle="formSheet"
            onBackdropPress={() => setVisible(false)}
            onDismiss={() => setVisible(false)}
            isVisible={visible}
            // style={[styles.dropdownList]}
            backdropOpacity={0.3}
            animationIn={"slideInUp"}
            animationOutTiming={500}
            backdropTransitionInTiming={200}
            backdropTransitionOutTiming={500}
            style={{
              justifyContent: "flex-end",
              margin: 0,
              height: 400,
            }}
          >
            <View style={styles.dropdownList}>
              <View style={styles.indicator} />
              <ScrollView showsVerticalScrollIndicator={false}>
                {categories?.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setCategory(item);
                      toggleDropdown();
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </Modal>
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
  indicator: {
    height: 6,
    width: 50,
    borderRadius: radius.medium,
    backgroundColor: Colors.mainColor,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 5,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 10,
    backgroundColor: Colors.white,
    justifyContent: "center",
  },
  dropdownText: {
    fontSize: 16,
    color: Colors.text,
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    overflow: "hidden",
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    gap: 5,
    height: 400,
  },
  dropdownItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.mainColor,
    marginBottom: 10,
    borderRadius: radius.small,
  },
  dropdownItemText: {
    fontSize: 16,
    color: Colors.text,
  },
  selectCustomer: { flexDirection: "row", gap: 10 },
  categoryAndCustomer: {
    flex: 1,
    gap: 5,
  },
  buttonCon: {
    marginTop: 60,
  },
});
