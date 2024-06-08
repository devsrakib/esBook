import { View, Text, FlatList } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Home from "@/app/pages/home/home";

const MaterialTab = () => {
  const Tab = createMaterialTopTabNavigator();
  const data = [
    { name: "tab1", component: Home },
    { name: "tab2", component: Home },
    { name: "tab3", component: Home },
  ];
  return (
    <Tab.Navigator screenOptions={{}}>
      {data?.map((t) => {
        return <Tab.Screen name={t.name} component={t.component} />;
      })}
    </Tab.Navigator>
  );
};

export default MaterialTab;

{
  /* <Tab.Screen name="All" component={Home} />
<Tab.Screen name="Today" component={Home} />
<Tab.Screen name="Upcoming" component={Home} /> */
}
