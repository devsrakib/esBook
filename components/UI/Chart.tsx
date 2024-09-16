import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BarChart } from "react-native-gifted-charts";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { MaterialIcons } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";
import { getCash_sell } from "@/databases/Database";
import { radius } from "@/constants/sizes";
import Animated, { FadeIn, ZoomIn, ZoomOut } from "react-native-reanimated";
const chartStatusTime = ["Weekly", "Monthly", "Yearly"];

let status: string;
const Chart = () => {
  const [selectedStatus, setSelectedStatus] = useState("Weekly");
  const [chartData, setChartData] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleChartStatus = (text: string) => {
    setSelectedStatus(text);
  };

  const db = useSQLiteContext();

  useEffect(() => {
    async function setup() {
      const result = await getCash_sell(db);
      console.log("Raw Data from getCash_sell:", result); // Check the raw data
      if (result?.length !== 0) {
        processChartData(result);
      } else {
        processChartData;
      }
    }
    setup();
  }, [db, selectedStatus]);

  // const processChartData = (data: any[]) => {
  //   let groupedData: { [key: string]: number } = {};
  //   console.log(groupedData, ";;;;;;;;;;");

  //   data?.forEach((item) => {
  //     const key = formatDate(new Date(item?.createdAt));
  //     const saleAmount =
  //       isNaN(item?.saleAmount) || item?.saleAmount === null
  //         ? 0
  //         : item?.saleAmount;

  //     if (groupedData[key]) {
  //       groupedData[key] += saleAmount;
  //     } else {
  //       groupedData[key] = 0;
  //     }
  //   });

  //   const colors = [
  //     "#4ABFF4",
  //     "#79C3DB",
  //     "#28B2B3",
  //     "#4ADDBA",
  //     "#91E3E3",
  //     "#4ADDBA",
  //     "#91E3E3",
  //   ];

  //   const chartData = Object?.keys(groupedData)?.map((key, index) => ({
  //     label: key,
  //     value: !groupedData[key] || 0,
  //     frontColor: colors[index % colors.length],
  //     sideColor: colors[index % colors.length],
  //     topColor: colors[index % colors.length],
  //   }));

  //   setChartData(chartData);
  // };

  const processChartData = (data: any[]) => {
    let groupedData: { [key: string]: number } = {};

    data?.forEach((item) => {
      const key = formatDate(new Date(item?.createdAt));
      console.log(item, "lllllllllllll");

      // Check if saleAmount is valid, otherwise set to 0

      // If the key already exists, add to the existing value
      if (!groupedData[key]) {
        groupedData[key] += item?.saleAmount;
      } else {
        // Initialize the key with the first saleAmount, not 0
        groupedData[key] = item?.saleAmount;
      }
    });

    console.log("Processed Data: ", groupedData);

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

    const chartData = Object.keys(groupedData)?.map((key, index) => ({
      label: key,
      value: groupedData[key], // Use the accumulated value for the label
      frontColor: colors[index % colors.length],
      sideColor: colors[index % colors.length],
      topColor: colors[index % colors.length],
    }));

    setChartData(chartData);
  };
  console.log(chartData);

  const formatDate = (date: Date) => {
    if (selectedStatus === "Weekly") {
      return date?.toLocaleDateString("en-US", { weekday: "short" });
    } else if (selectedStatus === "Monthly") {
      return date?.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } else if (selectedStatus === "Yearly") {
      return date.toLocaleDateString("en-US", { year: "numeric" });
    }
    return "";
  };

  return (
    <View style={styles.container}>
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
        {/* don't change this view */}
        {isModalVisible && (
          <Animated.View
            entering={ZoomIn.duration(100)}
            style={styles.statusModal}
            exiting={ZoomOut.duration(100)}
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
    elevation: 15,
    paddingHorizontal: 5,
    paddingVertical: 10,
    shadowColor: Colors.text,
    gap: 8,
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
