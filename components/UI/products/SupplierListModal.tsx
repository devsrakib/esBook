import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import ReactNativeModal from "react-native-modal";
import { Colors } from "@/constants/Colors";
import { radius } from "@/constants/sizes";
import { ScrollView } from "moti";
import useApiHook from "@/hooks/all_api_hooks";
import { IProduct } from "@/types/product/product";
import { ISupplier } from "@/types/interfaces/supplier.interface";

type props = {
  setVisible: Function;
  visible: boolean;
  setSupplier: (id: string) => void;
};
const SupplierListModal = ({ setVisible, visible, setSupplier }: props) => {
  const { data: supplierData, loading } = useApiHook("suppliers/");
  console.log(supplierData);

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
      </View>
    </ReactNativeModal>
  );
};

export default SupplierListModal;

const styles = StyleSheet.create({
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
  indicator: {
    height: 6,
    width: 50,
    borderRadius: radius.medium,
    backgroundColor: Colors.mainColor,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 5,
  },
});
