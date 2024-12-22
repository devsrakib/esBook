import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";

import { LineChart } from "react-native-gifted-charts";
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

  const db = useSQLiteContext();
  const { data } = useApiHook("cash-sells/");

  const handleChartStatus = (text: string) => {
    setSelectedStatus(text);
  };

  // Move useEffect here to observe `data` and `selectedStatus` changes
  useEffect(() => {
    if (data?.data) {
      processChartData(data?.data);
    }
  }, [data, selectedStatus]);

  // Moved data processing to a separate function
  const processChartData = (apiData: ICashSell[]) => {
    if (!apiData || apiData?.length === 0) return;

    let groupedData: { [key: string]: number } = {};

    // Iterate over the API data
    apiData?.forEach((item) => {
      const key = formatDate(new Date(item?.createdAt));
      groupedData[key] = (groupedData[key] || 0) + (item?.sell_amount || 50);
    });

    // Prepare data for the LineChart
    const colors: string[] = [
      "#4ABFF4",
      "#79C3DB",
      "#28B2B3",
      "#4ADDBA",
      "#91E3E3",
    ];
    const lineChartData = Object.keys(groupedData)?.map((key, index) => ({
      value: groupedData[key],
      label: key,
      dataPointColor: colors[index % colors?.length],
      dataPointText: groupedData[key].toString(),
    }));

    setChartData(lineChartData);
  };

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

      <LineChart
        areaChart
        stepChart
        hideDataPoints
        isAnimated
        animationDuration={1200}
        startFillColor="#0BA5A4"
        startOpacity={1}
        endOpacity={0.3}
        initialSpacing={0}
        data={chartData}
        spacing={30}
        thickness={5}
        width={Dimensions.get('window').width-40}
        hideRules
        hideYAxisText
        yAxisColor="#0BA5A4"
        showVerticalLines
        verticalLinesColor="rgba(14,164,164,0.5)"
        xAxisColor="#0BA5A4"
        color="#0BA5A4"
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
