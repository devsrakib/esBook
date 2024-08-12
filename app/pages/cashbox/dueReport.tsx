import { View, Text, StyleSheet, FlatList, useWindowDimensions, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '@/components/UI/cashbox/Header'
import { Colors } from '@/constants/Colors'
import { Stack } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ReportCart from '@/components/UI/cashbox/ReportCart'
import { getCash_buy, getCash_sell } from '@/databases/Database'
import Empty from '@/components/UI/Empty'
import { MaterialIcons } from '@expo/vector-icons'
import { useSQLiteContext } from 'expo-sqlite'





const tabs = ['Customer Due', 'Supplier Due'];
const DueReport = () => {
    const { bottom, top } = useSafeAreaInsets();
    const [dueReport, setDueReport] = useState<any[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const db = useSQLiteContext();

    useEffect(() => {
        async function getDue() {
            
            if (selectedIndex === 0) {
               const due = (await getCash_sell(db)).filter((item: any) => item?.dueAmount > 0);
               setDueReport(due);
            } else if (selectedIndex === 1) {
                const 
                due = (await getCash_buy(db)).filter((item: any) => item?.dueAmount > 0);
                setDueReport(due);
            }

        }

        getDue();
    }, [selectedIndex]);

    return (
        <View style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}>
            <Stack.Screen options={{ headerShown: false }} />
            <Header title="Due" titleColor={Colors.white} height={70} />
           <View style={styles.tabContainer}>
            {
                tabs?.map((item, index) => (
                    <TouchableOpacity  style={[styles.tab, {borderBottomColor: index === selectedIndex ? Colors.mainColor : Colors.white}]} key={index} onPress={() => setSelectedIndex(index)}>
                        <Text style={{ color: index === index ? Colors.mainColor : Colors.text, fontSize: 16 }}>{item}</Text>
                    </TouchableOpacity>
                ))
            }
            
           </View>
           {
                selectedIndex === 0 ?  <View style={{ flex: 1, backgroundColor: Colors.white }}>
                {dueReport.length === 0 ? (
                    <Empty text="No Due" icon={<MaterialIcons name="hourglass-empty" size={40} color={Colors.text} />} />
                ) : (
                    <FlatList
                        data={dueReport}
                        contentContainerStyle={{ paddingTop: 10, gap: 10, paddingBottom: 10 }}
                        renderItem={({ item }) => <ReportCart item={item} text="Due" />}
                        keyExtractor={(item) => item.id.toString()}
                    />
                )}
            </View>  :  <View style={{ flex: 1, backgroundColor: Colors.white }}>
            {dueReport.length === 0 ? (
                <Empty text="No Due" icon={<MaterialIcons name="hourglass-empty" size={40} color={Colors.text} />} />
            ) : (
                <FlatList
                    data={dueReport}
                    contentContainerStyle={{ paddingTop: 10, gap: 10, paddingBottom: 10 }}
                    renderItem={({ item }) => <ReportCart item={item} text="Due" />}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    tabContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: 10,
        marginBottom: 10,
        gap: 10,
        width: Dimensions.get('window').width * .5,

    },
    tab:{
        height: 30,
        borderBottomColor: Colors.mainColor,
        borderBottomWidth: 1,
    }
});

export default DueReport;
