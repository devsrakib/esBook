import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import { Colors } from "@/constants/Colors";

const keys = [
  "C",
  "M+",
  "M-",
  "⌫",
  "7",
  "8",
  "9",
  "÷",
  "4",
  "5",
  "6",
  "×",
  "1",
  "2",
  "3",
  "-",
  "0",
  ".",
  "=",
  "+",
];

const CustomModal = ({
  isModalVisible,
  setIsModalVisible,
}: {
  isModalVisible: boolean;
  setIsModalVisible: Function;
}) => {
  const [display, setDisplay] = useState("");

  const handlePress = (value: any) => {
    if (value === "C") {
      setDisplay("");
    } else if (value === "=") {
      try {
        setDisplay(
          eval(display.replace("×", "*").replace("÷", "/")).toString()
        );
      } catch {
        setDisplay("Error");
      }
    } else if (value === "⌫") {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay(display + value);
    }
  };

  return (
    <View>
      <Modal
        isVisible={true}
        style={{ justifyContent: "flex-end", margin: 0 }}
        backdropOpacity={0.1}
        onBackdropPress={() => setIsModalVisible(false)}
        onBackButtonPress={() => setIsModalVisible(false)}
        swipeDirection="down"
        onSwipeComplete={() => setIsModalVisible(!isModalVisible)}
      >
        <View style={styles.container}>
          <View
            style={{
              backgroundColor: "white",
              height: 100,
              paddingVertical: 20,
              width: "100%",
            }}
          >
            <Text style={{ fontSize: 50 }}>{display}</Text>
          </View>
          <View style={styles.buttonsContainer}>
            {keys.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  item === "=" || item === "+" ? styles.blueButton : null,
                  item === "C" || item === "M+" || item === "M-" || item === "⌫"
                    ? styles.grayButton
                    : null,
                ]}
                onPress={() => handlePress(item)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    item === "=" || item === "+"
                      ? { color: Colors.white }
                      : null,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingVertical: 10,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  displayContainer: {
    width: "95%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: "flex-end",
  },
  displayText: {
    fontSize: 40,
  },
  buttonsContainer: {
    width: "95%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  button: {
    width: "22%",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 24,
  },
  blueButton: {
    backgroundColor: Colors.mainColor,
    color: "white",
  },
  grayButton: {
    backgroundColor: Colors.lavender,
    height: 40,
    borderRadius: 4,
  },
});

export default CustomModal;
