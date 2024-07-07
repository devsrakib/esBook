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
      }}
    >
      {tab?.map((t: any, index: number) => {
        return (
          <Tab.Screen
            options={{}}
            key={index}
            name={t.tabName}
            component={t.component}
          />
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
