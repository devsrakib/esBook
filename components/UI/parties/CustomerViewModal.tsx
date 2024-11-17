import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import Button from "../Button";
import { Colors } from "@/constants/Colors";
import { radius } from "@/constants/sizes";
import { AntDesign } from "@expo/vector-icons";
import { Fonts } from "@/constants/Fonts";
const CustomerViewModal = ({
  isModalVisible,
  setAmount,
  setDescription,
  setIsModalVisible,
  activeTab,
  handleLend,
  handleGave,
}: {
  isModalVisible: boolean;
  setAmount: Function;
  setDescription: Function;
  setIsModalVisible: Function;
  activeTab: string;
  handleLend: () => void;
  handleGave: () => void;
}) => {
  return (
    <Modal
      isVisible={isModalVisible}
      backdropOpacity={0.5}
      onBackdropPress={() => setIsModalVisible(false)}
      style={styles.modal}
    >
      <View style={styles.modalCon}>
        <View style={styles.textAndCloseCon}>
          <Text style={styles.lendText}>You Gave</Text>
          <AntDesign
            name="close"
            size={24}
            color="black"
            onPress={() => setIsModalVisible(false)}
          />
        </View>
        <TextInput
          onChangeText={(e: any) => setAmount(e)}
          style={styles.amountInput}
          placeholder="Type Amount"
          keyboardType="numeric"
        />
        <TextInput
          onChangeText={(e) => setDescription(e)}
          style={styles.textArea}
          placeholder="Description"
        />
        {activeTab === "youGot" ? (
          <Button
            bg={Colors.green}
            title="Save"
            titleColor={Colors.white}
            radius={radius.regular}
            width={"100%"}
            onPress={() => handleLend()}
          />
        ) : (
          <Button
            bg={Colors.red}
            title="Save"
            titleColor={Colors.white}
            radius={radius.regular}
            width={"100%"}
            onPress={() => handleGave()}
          />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalCon: {
    height: 350,
    width: "100%",
    backgroundColor: Colors.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
    gap: 20,
  },
  textAndCloseCon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lendText: {
    fontSize: Fonts.large,
    fontWeight: "500",
  },
  amountInput: {
    height: 50,
    width: "100%",
    borderRadius: radius.regular,
    borderColor: Colors.border,
    paddingHorizontal: 10,
    fontSize: Fonts.medium,
    borderWidth: 1,
  },
  textArea: {
    width: "100%",
    borderRadius: radius.regular,
    borderColor: Colors.border,
    paddingHorizontal: 10,
    fontSize: Fonts.medium,
    borderWidth: 1,
    height: 100,
    textAlignVertical: "top",
    paddingTop: 10,
  },
});

export default CustomerViewModal;
