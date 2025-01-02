import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";

import { LineChart, PieChart, yAxisSides } from "react-native-gifted-charts";
import { BarChart } from "react-native-gifted-charts";

import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { MaterialIcons } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";
import { getCash_sell } from "@/databases/Database";

import Animated, { FadeInDown, ZoomIn } from "react-native-reanimated";
import { ICashSell, IChart } from "@/types/interfaces/home/chart.interface";
import useApiHook from "@/hooks/all_api_hooks";
import { radius } from "@/constants/sizes";
const chartStatusTime = ["Weekly", "Monthly", "Yearly"];

const Chart = () => {
  const [selectedStatus, setSelectedStatus] = useState("Weekly");
  const [chartData, setChartData] = useState<IChart[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  
  const handleChartStatus = (text: string) => {
    setSelectedStatus(text);
  };
    

  //   setChartData(lineChartData);
  // };

  const lineData = [
    {value: 0},
    {value: 20},
    {value: 18},
    {value: 40},
    {value: 36},
    {value: 60},
    {value: 54},
    {value: 85},
  ];

  const formatDate = (date: Date) => {
    if (selectedStatus === "Weekly") {
      return date?.toLocaleDateString("en-US", { weekday: "short" });
    } else if (selectedStatus === "Monthly") {
      return date?.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } else if (selectedStatus === "Yearly") {
      return date?.toLocaleDateString("en-US", { year: "numeric" });
    }
    return "";
  };

  const data = [
    {value: 15, label: 'Jan'},
    {value: 40, label: 'Feb'},
    {value: 10, label: 'Mar'},
    {value: 30, label: 'Apr'},
  ];


  return (
    <Animated.View
      entering={FadeInDown.delay(50)
        .duration(200)
        .damping(80)
        .springify()
        .stiffness(200)}
      style={styles.container}
    >
      <View style={styles.statusContainer}>
        <Text style={styles.overview}>Overview</Text>

        <TouchableOpacity
          onPress={() => setIsModalVisible(!isModalVisible)}
          style={styles.statusSelector}
        >
          <Text style={styles.status}>{selectedStatus}</Text>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={16}
            color={Colors.text}
          />
        </TouchableOpacity>

        {isModalVisible && (
          <Animated.View
            entering={ZoomIn.duration(100)}
            style={styles.statusModal}
          >
            {chartStatusTime?.map((text: string, index: number) => (
              <TouchableOpacity
                style={styles.statusPill}
                onPress={() => {
                  setIsModalVisible(false), setSelectedStatus(text);
                }}
                key={index.toString()}
              >
                <Text adjustsFontSizeToFit>{text}</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        )}
      </View>

      <BarChart
         data={data}
         barWidth={15}
         cappedBars
         capColor={Colors.mainColor}
         capThickness={4}
         showGradient
         
         gradientColor={Colors.mainColor}
         frontColor={Colors.VeroneseGreen}
         width={220}
        //  yAxisSide={yAxisSides.RIGHT}
      />
      <View style={{ display: "none" }}>
        {chartStatusTime?.map((text: string, index: number) => (
          <Text onPress={() => handleChartStatus(text)} key={index.toString()}>
            {text}
          </Text>
        ))}
      </View>

      {/* <BarChart
        showFractionalValues
        showYAxisIndices
        hideRules
        noOfSections={4}
        maxValue={Math.max(...chartData?.map((item) => item?.value))}
        data={chartData}
        barWidth={20}
        sideWidth={10}
        side="right"
      /> */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 10,
    shadowColor: Colors.shadow,
    elevation: 10,
    overflow: "hidden",
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
    position: "relative",
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
  statusModal: {
    width: 110,
    position: "absolute",
    top: 44,
    right: 0,
    backgroundColor: Colors.background,
    borderRadius: radius.small,
    zIndex: 1,
    shadowColor: Colors.shadow,
    elevation: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
    gap: 5,
  },
  statusPill: {
    height: 32,
    borderRadius: radius.small,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    alignSelf: "center",
  },
});

export default Chart;
