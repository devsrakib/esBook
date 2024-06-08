import { View, Text } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Home from "@/app/pages/home/home";

const MaterialTab = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator screenOptions={{}}>
      <Tab.Screen name="All" component={Home} />
      <Tab.Screen name="Today" component={Home} />
      <Tab.Screen name="Upcoming" component={Home} />
    </Tab.Navigator>
  );
};

export default MaterialTab;
