/* eslint-disable import/order */
import { View, Text, TouchableOpacity, Button, StyleSheet } from "react-native";
import React, { forwardRef, useCallback, useMemo } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
export type Ref = BottomSheetModal;
const BottomSheet = forwardRef<Ref>((props, ref) => {
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );
  const snapPoints = useMemo(() => ["50%"], []);

  const { dismiss } = useBottomSheetModal();

  return (
    <BottomSheetModal
      overDragResistanceFactor={0}
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
    >
      <View>
        <TouchableOpacity style={styles.button} onPress={() => dismiss()}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 4,
    margin: 16,
  },
  buttonText: {
    fontSize: Fonts.medium,
    color: Colors.white,
  },
});

export default BottomSheet;
