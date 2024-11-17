<<<<<<< HEAD
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import React, { useCallback, useState } from "react";
=======
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
import ReactNativeModal from "react-native-modal";
import { Colors } from "@/constants/Colors";
import { radius } from "@/constants/sizes";
import { ScrollView } from "moti";
import useApiHook from "@/hooks/all_api_hooks";
import { IProduct } from "@/types/product/product";
import { ISupplier } from "@/types/interfaces/supplier.interface";
<<<<<<< HEAD
import ActivityIndicator from "../ActivityIndicator";
import { Fonts } from "@/constants/Fonts";
import Animated, { FadeInDown } from "react-native-reanimated";
import _ from "lodash";
import { Ionicons } from "@expo/vector-icons";
import EmptyState from "../EmptyState";
=======
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b

type props = {
  setVisible: Function;
  visible: boolean;
<<<<<<< HEAD
  setSupplier: (id: string, name: string) => void;
};
const SupplierListModal = ({ setVisible, visible, setSupplier }: props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: supplierData, loading } = useApiHook("suppliers/");
  // console.log(supplierData);

  const filteredCategories = supplierData?.data?.filter((item: ISupplier) =>
    item?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInput = useCallback(
    _.debounce((e) => setSearchTerm(e), 300),
    []
  );
=======
  setSupplier: (id: string) => void;
};
const SupplierListModal = ({ setVisible, visible, setSupplier }: props) => {
  const { data: supplierData, loading } = useApiHook("suppliers/");
  console.log(supplierData);
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b

  return (
    <ReactNativeModal
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
<<<<<<< HEAD
        {loading ? (
          <ActivityIndicator />
        ) : (
          <>
            <Animated.View
              entering={FadeInDown.delay(50)
                .duration(400)
                .stiffness(200)
                .damping(80)
                .springify()}
              style={styles.search}
            >
              <Ionicons name="search" size={20} color={Colors.gray} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                onChangeText={(e) => handleInput(e)}
              />
            </Animated.View>
            <View style={{ flex: 1 }}>
              <FlatList
                data={filteredCategories}
                contentContainerStyle={{
                  flexGrow: 1,
                }}
                renderItem={({ item, index }) => {
                  return (
                    <Animated.View
                      key={item.id} // Ensure that the key is unique
                      entering={FadeInDown.delay(index * 50)
                        .duration(400)
                        .stiffness(200)
                        .damping(80)
                        .springify()}
                    >
                      <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => {
                          setSupplier(item?.id, item?.name);
                          setVisible(false);
                        }}
                      >
                        <Image
                          style={styles.profile}
                          source={{ uri: item?.profile_photo }}
                          defaultSource={require("../../../assets/images/default_profile.jpg")}
                        />
                        <View style={styles.dropdownItemTextContainer}>
                          <Text style={styles.name}>{item?.name}</Text>
                          <Text style={styles.dropdownItemText}>
                            {item?.address}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </Animated.View>
                  );
                }}
                ListEmptyComponent={() => (
                  <EmptyState
                    icon="search"
                    message="No supplier found"
                    iconSize={50}
                    color={Colors.text}
                  />
                )}
              />
            </View>
          </>
        )}
=======
        <ScrollView showsVerticalScrollIndicator={false}>
          {supplierData?.data?.map((item: ISupplier, index: number) => (
            <TouchableOpacity
              key={index}
              style={styles.dropdownItem}
              onPress={() => {
                toggleDropdown();
              }}
            >
              <Text style={styles.dropdownItemText}>{item?.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
      </View>
    </ReactNativeModal>
  );
};

export default SupplierListModal;

const styles = StyleSheet.create({
<<<<<<< HEAD
  search: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingLeft: 10,
    // paddingVertical: 5,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: radius.small,
    backgroundColor: Colors.white,
    marginBottom: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: Fonts.medium,
    color: Colors.text,
    height: 46,
  },
=======
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
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
<<<<<<< HEAD
    padding: 5,
=======
    padding: 15,
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
    borderWidth: 1,
    borderColor: Colors.mainColor,
    marginBottom: 10,
    borderRadius: radius.small,
<<<<<<< HEAD
    flexDirection: "row",
    gap: 10,
    backgroundColor: Colors.lavender,
  },
  name: {
    fontSize: Fonts.medium,
    color: Colors.black,
    fontWeight: "600",
=======
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
  },
  dropdownItemText: {
    fontSize: 16,
    color: Colors.text,
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
<<<<<<< HEAD
  profile: {
    height: 50,
    width: 50,
    borderRadius: radius.medium,
  },
  dropdownItemTextContainer: {
    gap: 5,
  },
=======
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
});
