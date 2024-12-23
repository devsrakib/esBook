import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  Modal,
  Dimensions,
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
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@/constants/Fonts";
import useImagePicker from "@/utils/UseImagePicker";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { createProduct } from "@/redux/features/product/createProductSlice";

const AddProduct = () => {
  const { top } = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.createProduct);

  const [productName, setProductName] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [buyingPrice, setBuyingPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState({ id: "", title: "" });
  const [supplier, setSupplier] = useState({ id: "", name: "" });
  const [supplierVisible, setSupplierVisible] = useState(false);
  const [categoryVisible, setCategoryVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { selectedImage, pickImage } = useImagePicker();
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
      // openModal();
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


  const closeModal = () => {
    setIsModalVisible(false);
  };


 
  // const handleSubmit = () => {
  //   if (!productName || !buyingPrice || !sellingPrice || !quantity || !category.id || !supplier.id) {
  //     alert("Please fill all required fields.");
  //     return;
  //   }
  
  //   if (selectedImage) {
  //     const fileName = selectedImage.split('/').pop();
  //     const fileType = selectedImage.match(/[^.]+$/)?.[0];
  //     formData.append("image", {
  //       uri: selectedImage,
  //       name: fileName,
  //       type: `image/${fileType}`,
  //     });
  //   }

  //   dispatch(
  //     createProduct({
  //       product_name: productName,
  //       buying_price: buyingPrice,
  //       selling_price: sellingPrice,
  //       discount_price: discountPrice,
  //       quantity: quantity,
  //       category: category?.id,
  //       supplier: supplier?.id,
  //     })
  //   );
  // };


  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("product_name", productName);
      formData.append("buying_price", buyingPrice);
      formData.append("selling_price", sellingPrice);
      formData.append("discount_price", discountPrice);
      formData.append("quantity", quantity);
      formData.append("category", category?.id);
      formData.append("supplier", supplier?.id);
      
      if (selectedImage) {
        const formattedUri = selectedImage.startsWith("file://") ? selectedImage : `file://${selectedImage}`;
        const fileName = formattedUri.split("/").pop();
        formData.append("photo", {
          uri: formattedUri,
          name: fileName,
          type: "image/jpeg", // Adjust based on the actual file type
        });
      }

    dispatch(createProduct(formData))
    // console.log(selectedImage);
    
    } catch (error) {
      console.error("Error creating product:", error.response?.data || error.message);
    }
  };
  

  // Create Product function
  // const createProduct = async () => {
  //   try {
  //     const token = await getToken();
  //     const response = await axios.post(
  //       `${apiUrl}product/`,
  //       {
  //         product_name: productName,
  //         buying_price: buyingPrice,
  //         selling_price: sellingPrice,
  //         discount_price: discountPrice,
  //         quantity: quantity,
  //         category: category?.id,
  //         supplier: supplier?.id,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     console.log(response);
  //   } catch (error: any) {
  //     console.error(error.message);
  //   }
  // };

  

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
          <TouchableOpacity style={styles.productPicker} onPress={pickImage}>
         
          <MaterialCommunityIcons name="folder-image" size={22} color={Colors.orange} />
            <Text style={styles.pickerButton}>Select Photo</Text>
           {selectedImage&& <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.imageCon}>
            <Image style={{width: '80%', height: '95%',marginLeft: 'auto', resizeMode: 'cover'}} source={{uri: selectedImage}} />
            </TouchableOpacity>}
         
          </TouchableOpacity>
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
          <SupplierListModal
            setVisible={setSupplierVisible}
            visible={supplierVisible}
            setSupplier={handleSelectedSupplier}
          />
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
          onPress={handleSubmit}
        />
      </View>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalCloseArea} onPress={closeModal}>
            {selectedImage && (
              <Image source={{ uri: selectedImage }} style={styles.fullImage} />
            )}
          </TouchableOpacity>
        </View>
      </Modal>
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
  productPicker:{
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: radius.small,
    backgroundColor: Colors.white,
    borderColor: Colors.border,
    paddingLeft: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    gap: 10, 
  },
  imageCon:{
    width: '50%',
    marginLeft: 'auto'
  },
  pickerButton:{
    fontSize: Fonts.regular,
    color: Colors.text
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCloseArea: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get('window').width - 60,
    height: Dimensions.get('screen').height - 200, 
    // borderRadius: radius.small
  },
  fullImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
