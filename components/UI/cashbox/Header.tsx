import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import GoBack from "../header/GoBack";
import { Fonts } from "@/constants/Fonts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import DatePicker from "../DatePicker";
<<<<<<< HEAD
import { LinearGradient } from "expo-linear-gradient";
=======
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b

interface headerProps {
  height: number;
  title: any;
  titleColor: string;
  index?: number;
}
const Header: React.FC<headerProps> = ({
  height,
  title,
  titleColor,
  index,
}) => {
  const [date, setDate] = useState(new Date());

  return (
<<<<<<< HEAD
    <LinearGradient
      colors={["#168F88", "#006B60", "#4D89A1"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, { height }]}
    >
=======
    <View style={[styles.container, { height }]}>
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
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
              params: { title, index },
            }}
          >
            <Text style={styles.reportText}>Report</Text>
          </Link>
        </View>
      )}
<<<<<<< HEAD
    </LinearGradient>
=======
    </View>
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
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
