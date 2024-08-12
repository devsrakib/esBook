import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import ListItem from "@/components/UI/Collection_component/ListItem";
import { useSQLiteContext } from "expo-sqlite";
import { getCollectionReminder } from "@/databases/Database";

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
      <FlatList
        data={reminder}
        contentContainerStyle={{
          paddingHorizontal: 20,
        }}
        renderItem={({ item }) => {
          return <ListItem item={item} text="date" />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default All;
