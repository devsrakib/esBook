import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect } from "react";
import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import Header from "@/components/UI/header/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HistoryCard from "@/components/slip/HistoryCard";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import CustomLoader from "@/components/UI/CustomLoader";
import { fetchSlipHistory } from "@/redux/features/slip/slipHistorySlice";
import EmptyState from "@/components/UI/EmptyState";

const SlipHistory = () => {
  const { top } = useSafeAreaInsets();
  const dispatch = useAppDispatch();
const {slips, loading, error} = useAppSelector(state => state.slipHistory)

useEffect(() =>{
dispatch(fetchSlipHistory())
} ,[])

console.log(slips);


if(loading){
  return (
    <CustomLoader />
  )
}

if(error){
  return <Text>{error}</Text>
}
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Header
        children="Slip History"
        textColor={Colors.white}
        backgroundColor={Colors.mainColor}
      />
      <FlatList
        data={slips?.data}
        renderItem={({ item }) => {
          return <HistoryCard item={item} />;
        }}
        contentContainerStyle={styles.content}
        columnWrapperStyle={styles.columnWrapper}
        numColumns={2}
        ListEmptyComponent={() =>{
          return(
            <EmptyState message="No history found" />
          )
        }}
      />
    </View>
  );
};

export default SlipHistory;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 16,
    flex: 1,
  },
  columnWrapper: {
    gap: 16, // Add vertical space between rows
  },
});
