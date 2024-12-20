import { View, Text, StyleSheet } from "react-native";
import React, { useCallback, useState } from "react";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomTopTab from "@/routers/CustomTopTab";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import Parties from "../pages/parties/parties";
import Cashbox from "../pages/cashbox/cashbox";

export type tabProps = {
  label: string;
  icon: any;
};

const tab: tabProps[] = [
  {
    label: "Cash box",
    icon: <Ionicons name="cash-sharp" size={16} color={Colors.mainColor} />,
  },
  {
    label: "Parties",
    icon: <Fontisto name="person" size={16} color={Colors.mainColor} />,
  },
];
const Cash = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);

  const handleSearch = useCallback(() => {
    setIsOpenSearch(!isOpenSearch);
    
  }, [isOpenSearch]); 
  const { bottom, top } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <CustomTopTab
        tab={tab}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        isOpenSearch={isOpenSearch}
        handleSearch={handleSearch}
      />
      {selectedIndex === 0 ? <Cashbox /> : <Parties isOpenSearch={isOpenSearch} />}
    </View>
  );
};

export default Cash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
