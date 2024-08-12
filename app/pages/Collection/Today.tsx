import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { getCollectionReminder } from "@/databases/Database";

const Today = () => {
  const [todaysData, setTodaysData] = useState<any>([]);
  const db = useSQLiteContext();

  // Function to filter data for today's records
  const getTodaysData = (data) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to 00:00:00
    console.log(data, "Data");

    console.log(today, "Today");

    return data?.filter((item) => {
      const createdAtDate = new Date(item?.createdAt);
      console.log(createdAtDate, "Date");

      return createdAtDate >= today;
    });
  };

  useEffect(() => {
    async function collectionReminder() {
      const result = await getCollectionReminder(db);
      console.log(result, "Database result");

      const filteredData = getTodaysData(result); // Filter the data for today's records
      console.log(filteredData, "Filtered Data");

      setTodaysData(filteredData);
    }
    collectionReminder();
  }, []);

  console.log(todaysData);

  return (
    <View>
      <Text>Today</Text>
      {todaysData.map((item: any, index: any) => (
        <Text key={index}>{item?.amount}</Text>
      ))}
    </View>
  );
};

export default Today;
