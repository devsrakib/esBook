import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { LineChart } from "react-native-gifted-charts";
import { ruleTypes } from "gifted-charts-core";
=======
import { BarChart } from "react-native-gifted-charts";
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { MaterialIcons } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";
import { getCash_sell } from "@/databases/Database";
<<<<<<< HEAD
import Animated, { FadeInDown, ZoomIn, ZoomOut } from "react-native-reanimated";
import { ICashSell, IChart } from "@/types/interfaces/home/chart.interface";
import useApiHook from "@/hooks/all_api_hooks";
import { radius } from "@/constants/sizes";

=======
import { radius } from "@/constants/sizes";
import Animated, {
  FadeIn,
  FadeInDown,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";
import { ICashSell, IChart } from "@/types/interfaces/home/chart.interface";
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
const chartStatusTime = ["Weekly", "Monthly", "Yearly"];

const Chart = () => {
  const [selectedStatus, setSelectedStatus] = useState("Weekly");
  const [chartData, setChartData] = useState<IChart[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
<<<<<<< HEAD
  const db = useSQLiteContext();
  console.log(chartData);
=======
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b

  const handleChartStatus = (text: string) => {
    setSelectedStatus(text);
  };

<<<<<<< HEAD
  const { data } = useApiHook("cash-sells/");

  const processChartData = (apiData: ICashSell[]) => {
    if (!apiData || apiData?.length === 0) return;
    console.log(apiData);

    let groupedData: { [key: string]: number } = {};

    // Iterate over the API data
    apiData?.forEach((item) => {
      const key = formatDate(new Date(item?.createdAt));
      // Accumulate saleAmount or use a default value
      groupedData[key] = (groupedData[key] || 0) + (item?.sell_amount || 50);
    });
    console.log(groupedData);

    // Prepare data for the LineChart
    const colors = ["#4ABFF4", "#79C3DB", "#28B2B3", "#4ADDBA", "#91E3E3"];
    const lineChartData = Object.keys(groupedData)?.map((key, index) => ({
      value: groupedData[key],
      label: key,
      dataPointColor: colors[index % colors.length],
      dataPointText: groupedData[key].toString(),
    }));

    setChartData(lineChartData);
=======
  const db = useSQLiteContext();

  useEffect(() => {
    async function setup() {
      const result = await getCash_sell(db);
      processChartData(result as ICashSell[]);
    }
    setup();
  }, [db, selectedStatus]);

  const processChartData = (data: ICashSell[]) => {
    console.log(data);

    let groupedData: { [key: string]: number } = {};

    data?.forEach((item) => {
      const key = formatDate(new Date(item?.createdAt));
      if (groupedData[key]) {
        groupedData[key] += item?.saleAmount;
      } else {
        groupedData[key] = item?.saleAmount;
      }
    });

    // Continue processing and updating chart data as before...
    const colors = [
      "#4ABFF4",
      "#79C3DB",
      "#28B2B3",
      "#4ADDBA",
      "#91E3E3",
      "#4ADDBA",
      "#91E3E3",
    ];

    const chartData = Object.keys(groupedData).map((key, index) => ({
      label: key,
      value: groupedData[key], // Use the accumulated value for the label
      frontColor: colors[index % colors.length],
      sideColor: colors[index % colors.length],
      topColor: colors[index % colors.length],
    }));

    setChartData(chartData);
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
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
<<<<<<< HEAD
      return date?.toLocaleDateString("en-US", { year: "numeric" });
=======
      return date.toLocaleDateString("en-US", { year: "numeric" });
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
    }
    return "";
  };

<<<<<<< HEAD
  useEffect(() => {
    if (data?.data) {
      processChartData(data?.data);
    }
  }, [data, selectedStatus]);

  return (
    <Animated.View entering={FadeInDown.duration(200)} style={styles.container}>
=======
  return (
    <Animated.View
      entering={FadeInDown.delay(50)
        .duration(200)
        .damping(80)
        .springify()
        .stiffness(200)}
      style={styles.container}
    >
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
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
<<<<<<< HEAD

=======
        {/* don't change this view */}
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
        {isModalVisible && (
          <Animated.View
            entering={ZoomIn.duration(100)}
            style={styles.statusModal}
<<<<<<< HEAD
          >
            {chartStatusTime.map((text, index) => (
              <TouchableOpacity
                style={styles.statusPill}
                onPress={() => {
                  setIsModalVisible(false);
                  setSelectedStatus(text);
=======
            exiting={ZoomOut.duration(100)}
          >
            {chartStatusTime?.map((text: string, index: number) => (
              <TouchableOpacity
                style={styles.statusPill}
                onPress={() => {
                  setIsModalVisible(false), setSelectedStatus(text);
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
                }}
                key={index.toString()}
              >
                <Text adjustsFontSizeToFit>{text}</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        )}
<<<<<<< HEAD
      </View>

      <View style={{ width: "100%" }}>
        <LineChart
          data={chartData}
          width={Dimensions.get("window").width * 0.73}
          height={200}
          isAnimated
          // thickness={2}
          dataPointsRadius={4}
          color="#4ABFF4"
          hideDataPoints={false}
          showVerticalLines={false}
          showFractionalValues
        />
      </View>
=======
        <View style={{ display: "none" }}>
          {chartStatusTime?.map((text: string, index: number) => (
            <Text
              onPress={() => handleChartStatus(text)}
              key={index.toString()}
            >
              {text}
            </Text>
          ))}
        </View>
      </View>
      <BarChart
        showFractionalValues
        showYAxisIndices
        hideRules
        noOfSections={4}
        maxValue={Math.max(...chartData?.map((item) => item?.value))} // Adjust maxValue dynamically
        data={chartData}
        barWidth={20}
        sideWidth={10}
        side="right"
      />
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 16,
    backgroundColor: Colors.white,
<<<<<<< HEAD
    borderRadius: 10,
    shadowColor: Colors.shadow,
    elevation: 10,
    overflow: "hidden",
=======
    // width: "100%",
    borderRadius: 10,
    shadowColor: Colors.shadow,
    elevation: 10,
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
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
<<<<<<< HEAD
=======
    position: "relative",
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
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
<<<<<<< HEAD
    shadowColor: Colors.shadow,
    elevation: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
    gap: 5,
=======
    elevation: 15,
    paddingHorizontal: 5,
    paddingVertical: 10,
    shadowColor: Colors.text,
    gap: 8,
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
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
