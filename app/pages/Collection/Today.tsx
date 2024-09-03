import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { getCollectionReminder } from "@/databases/Database";
import FormatDate from "@/utils/FormatDate";

const Today = () => {
  const [todaysData, setTodaysData] = useState<any>([]);
  const db = useSQLiteContext();

  const today = FormatDate(new Date());
  // Function to filter data for today's records
  useEffect(() => {
    async function collectionReminder() {
      const result = await getCollectionReminder(db);
      const filteredResult = result?.filter((item: any) => {
        const createdAtDate = new Date(item?.collectionDate);
        const collectionFormateDate = FormatDate(createdAtDate);
        return collectionFormateDate === today;
      });

      console.log(filteredResult, "Filtered Data");
      setTodaysData(filteredResult);
    }
    collectionReminder();
  }, []);

  return (
    <View>
      <Text adjustsFontSizeToFit>Today</Text>
      {todaysData.map((item: any, index: any) => (
        <Text key={index}>{item?.amount}</Text>
      ))}
    </View>
  );
};

export default Today;
