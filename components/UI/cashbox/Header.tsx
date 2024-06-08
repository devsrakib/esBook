import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import GoBack from "../header/GoBack";
import { Fonts } from "@/constants/Fonts";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface headerProps {
  height: number;
  title: any;
  titleColor: string;
}
const Header: React.FC<headerProps> = ({ height, title, titleColor }) => {
  return (
    <View style={[styles.container, { height }]}>
      <GoBack color={Colors.white} />
      <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
      {title !== "Report" ? (
        <View style={styles.reportCon}>
          <MaterialCommunityIcons
            name="calendar-text-outline"
            size={18}
            color={Colors.white}
          />
          <Text style={styles.reportText}>Report</Text>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.mainColor,
    paddingHorizontal: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontWeight: "500",
    fontSize: Fonts.medium,
    flex: 1,
  },
  reportCon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingRight: 10,
  },
  reportText: {
    fontSize: Fonts.large,
    color: Colors.white,
    textDecorationLine: "underline",
  },
});
export default Header;
