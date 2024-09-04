import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import FormatDate from "@/utils/FormatDate";
import { getCollectionReminder } from "@/databases/Database";
import ListItem from "@/components/UI/Collection_component/ListItem";
import Empty from "@/components/UI/Empty";
import { MaterialIcons } from "@expo/vector-icons";

const Upcoming = () => {
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
        return collectionFormateDate > today;
      });

      console.log(filteredResult, "Filtered Data");
      setTodaysData(filteredResult);
    }
    collectionReminder();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {todaysData?.length === 0 ? (
        <Empty
          icon={
            <MaterialIcons name="hourglass-empty" size={24} color="black" />
          }
          text="No Data Found"
        />
      ) : (
        <FlatList
          data={todaysData}
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
          renderItem={({ item }) => {
            return <ListItem item={item} text="date" />;
          }}
        />
      )}
    </View>
  );
};

export default Upcoming;
