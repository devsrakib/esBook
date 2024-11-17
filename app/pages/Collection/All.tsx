import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import ListItem from "@/components/UI/Collection_component/ListItem";
import { useSQLiteContext } from "expo-sqlite";
import { getCollectionReminder } from "@/databases/Database";
import Empty from "@/components/UI/Empty";
import { MaterialIcons } from "@expo/vector-icons";

const All = () => {
  const [reminder, setReminder] = useState<any>([]);
  const db = useSQLiteContext();

  useEffect(() => {
    async function collectionReminder() {
      const result = await getCollectionReminder(db);

      setReminder(result);
    }
    collectionReminder();
  }, []);
  // console.log(reminder, ":::::::::::::::::");

  return (
    <View style={styles.container}>
      {reminder?.length === 0 ? (
        <Empty
          icon={
            <MaterialIcons name="hourglass-empty" size={24} color="black" />
          }
          text="No Data Found"
        />
      ) : (
        <FlatList
          data={reminder}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default All;
