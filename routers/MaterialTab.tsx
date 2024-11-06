import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Colors } from "@/constants/Colors";

const MaterialTab = ({ tab }: any) => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.mainColor,
        tabBarInactiveTintColor: Colors.text,
        tabBarLabelStyle: { fontSize: 16, textTransform: "capitalize" },
        tabBarIndicatorStyle: {
          backgroundColor: Colors.mainColor,
        },
      }}
    >
      {tab?.map((t: any, index: number) => {
        return (
          <Tab.Screen key={index} name={t.tabName} component={t.component} />
        );
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
