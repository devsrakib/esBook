// TabComponent.js
import { Colors } from '@/constants/Colors';
import { getCollectionReminder } from '@/databases/Database';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TabComponent = ({ tabs, setActiveTab, activeTab }:{tabs: string[], setActiveTab: Function,activeTab: number}) => {
 

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.tab, activeTab === index && styles.activeTab]}
          onPress={() => setActiveTab(index)}
        >
          <Text style={[styles.tabText, activeTab === index && styles.activeTabText]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.mainColor,
    marginTop: 10,
    borderRadius: 25,
  },
  tab: {
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  tabText: {
    color: 'white',
    fontSize: 16,
  },
  activeTabText: {
    fontWeight: 'bold',
  },
});

export default TabComponent;
