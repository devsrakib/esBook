import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { BarChart, LineChart } from "react-native-gifted-charts";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { MaterialIcons } from "@expo/vector-icons";
const customWidth = Dimensions.get("window").width;
const chartStatusTime = ["Weekly", "Monthly", "Yearly"];

const barData = [
  {
    value: 230,
    label: "Jan",
    frontColor: "#4ABFF4",
    sideColor: "#23A7F3",
    topColor: "#92e6f6",
  },
  {
    value: 180,
    label: "Feb",
    frontColor: "#79C3DB",
    sideColor: "#68BCD7",
    topColor: "#9FD4E5",
  },
  {
    value: 195,
    label: "Mar",
    frontColor: "#28B2B3",
    sideColor: "#0FAAAB",
    topColor: "#66C9C9",
  },
  {
    value: 250,
    label: "Apr",
    frontColor: "#4ADDBA",
    sideColor: "#36D9B2",
    topColor: "#7DE7CE",
  },
  {
    value: 320,
    label: "May",
    frontColor: "#91E3E3",
    sideColor: "#85E0E0",
    topColor: "#B0EAEB",
  },
  {
    value: 250,
    label: "Apr",
    frontColor: "#4ADDBA",
    sideColor: "#36D9B2",
    topColor: "#7DE7CE",
  },
  {
    value: 320,
    label: "May",
    frontColor: "#91E3E3",
    sideColor: "#85E0E0",
    topColor: "#B0EAEB",
  },
  {
    value: 250,
    label: "Apr",
    frontColor: "#4ADDBA",
    sideColor: "#36D9B2",
    topColor: "#7DE7CE",
  },
  {
    value: 320,
    label: "May",
    frontColor: "#91E3E3",
    sideColor: "#85E0E0",
    topColor: "#B0EAEB",
  },
];
const Chart = ({ setIsModalVisible }: { setIsModalVisible: Function }) => {
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleChartStatus = (text: string) => {
    setSelectedStatus(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <Text style={styles.overview}>Overview</Text>

        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={styles.statusSelector}
        >
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
      <BarChart
        showFractionalValues
        showYAxisIndices
        hideRules
        noOfSections={4}
        maxValue={400}
        data={barData}
        barWidth={20}
        sideWidth={10}
        // isThreeD
        side="right"
        // capRadius={20}
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
