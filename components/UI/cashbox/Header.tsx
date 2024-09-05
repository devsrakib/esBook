import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import GoBack from "../header/GoBack";
import { Fonts } from "@/constants/Fonts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import DatePicker from "../DatePicker";

interface headerProps {
  height: number;
  title: any;
  titleColor: string;
}
const Header: React.FC<headerProps> = ({ height, title, titleColor }) => {
  console.log(title);
  const [date, setDate] = useState(new Date());

  return (
    <View style={[styles.container, { height }]}>
      <GoBack color={Colors.white} />
      <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
      {title === "Report" || title === "Due" ? (
        <DatePicker
          background={Colors.white}
          iconSite="right"
          iconColor={Colors.text}
          iconSize={16}
          date={date}
          setDate={setDate}
        />
      ) : (
        <View style={styles.reportCon}>
          <MaterialCommunityIcons
            name="calendar-text-outline"
            size={18}
            color={Colors.white}
          />
          <Link
            href={{
              pathname: "/pages/cashbox/report",
              params: { title },
            }}
          >
            <Text style={styles.reportText}>Report</Text>
          </Link>
        </View>
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
