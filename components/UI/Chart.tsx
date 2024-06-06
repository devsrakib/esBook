import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { LineChart } from "react-native-gifted-charts";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { MaterialIcons } from "@expo/vector-icons";
const customWidth = Dimensions.get("window").width;
const chartStatusTime = ["Weekly", "Monthly", "Yearly"];

const data1 = [
  { value: 50, label: "Sat" },
  { value: 80, label: "Sun" },
  { value: 90, label: "Mon" },
  { value: 70, label: "Tue" },
  { value: 100, label: "Wed" },
  { value: 60, label: "Thu" },
  { value: 10, label: "Fri" },
  { value: 50, label: "Sat" },
  { value: 80, label: "Sun" },
  { value: 90, label: "Mon" },
  { value: 70, label: "Tue" },
  { value: 100, label: "Wed" },
  { value: 60, label: "Thu" },
  { value: 10, label: "Fri" },
];
const data2 = [
  { value: 30, label: "Jan" },
  { value: 50, label: "Feb" },
  { value: 70, label: "Mar" },
  { value: 50, label: "Apr" },
  { value: 80, label: "May" },
  { value: 70, label: "Jun" },
  { value: 70, label: "Jun" },
  { value: 30, label: "Jan" },
  { value: 50, label: "Feb" },
  { value: 70, label: "Mar" },
  { value: 50, label: "Apr" },
  { value: 80, label: "May" },
  { value: 70, label: "Jun" },
  { value: 70, label: "Jun" },
];
const Chart = () => {
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleChartStatus = (text: string) => {
    setSelectedStatus(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <Text style={styles.overview}>Overview</Text>

        <TouchableOpacity style={styles.statusSelector}>
          <Text style={styles.status}>{selectedStatus}</Text>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={16}
            color={Colors.text}
          />
        </TouchableOpacity>
        <View style={{ display: "none" }}>
          {chartStatusTime?.map((text: string, index: number) => {
            return (
              <Text
                onPress={() => handleChartStatus(text)}
                key={index.toString()}
              >
                {text}
              </Text>
            );
          })}
        </View>
      </View>
      <LineChart
        areaChart
        curved
        data={data1}
        data2={data2}
        height={250}
        width={customWidth - 100}
        showVerticalLines
        spacing={44}
        hideDataPoints
        showXAxisIndices
        showDataPointOnFocus
        isAnimated
        animationDuration={1500}
        initialSpacing={30}
        color1={Colors.chartColor1}
        color2="blue"
        textColor1="green"
        dataPointsColor1="blue"
        dataPointsColor2="black"
        startFillColor1={Colors.chartColor1}
        startFillColor2="skyblue"
        startOpacity={0.2}
        endOpacity={0}
        textShiftY={-2}
        textShiftX={5}
        textFontSize={Fonts.small}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 16,
    backgroundColor: Colors.background,
    width: "100%",
    borderRadius: 10,
  },
  yAxisLabel: {
    color: "#37474f",
    fontSize: 12,
  },
  xAxisLabel: {
    color: "#37474f",
    fontSize: 12,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  statusSelector: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  overview: {
    fontSize: Fonts.regular,
    color: Colors.text,
  },
  status: {
    fontSize: Fonts.small,
    color: Colors.text,
    marginRight: 4,
  },
});

export default Chart;
