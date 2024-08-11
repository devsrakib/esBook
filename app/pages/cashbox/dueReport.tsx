import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '@/components/UI/cashbox/Header'
import { Colors } from '@/constants/Colors'
import { Stack } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ReportCart from '@/components/UI/cashbox/ReportCart'
import { getCash_buy, getCash_sell } from '@/databases/Database'
import { useSQLiteContext } from 'expo-sqlite'
import Empty from '@/components/UI/Empty'
import { MaterialIcons } from '@expo/vector-icons'

const dueReport = () => {
    const {bottom, top} = useSafeAreaInsets();
    const [dueReport, setDueReport] = useState<any>([]);
const db = useSQLiteContext();
    useEffect(() => {
        async function getDue() {
            const due = (await getCash_sell(db)).filter(
                (item: any) => item?.dueAmount > 0
              );
              setDueReport(due);
        }
        getDue();
    }, [])
  return (
    <View style={[styles.container,{paddingTop: top, paddingBottom: bottom}]}>
        <Stack.Screen options={{
        headerShown: false,
      }}/>
     <Header title={"Due"} titleColor={Colors.white} height={70}/>
    {dueReport?.length === 0 ? <Empty text='No Due' icon={<MaterialIcons name="hourglass-empty" size={40} color={Colors.text} />}></Empty> : <FlatList
     data={dueReport}
     contentContainerStyle={{paddingTop: 10, gap: 10, paddingBottom: 10}}
     renderItem={({item})=>{
        return(
            <ReportCart item={item} text="Due" />
        )
     }}
     />}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
})

export default dueReport