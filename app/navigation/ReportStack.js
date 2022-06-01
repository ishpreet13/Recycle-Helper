import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import YearlyReportScreen from "../screens/YearlyReportScreen";
import MonthlyReportScreen from "../screens/MonthlyReportScreen";
import ReportScreen from "../screens/ReportScreen";
import colors from "../config/colors";

const Tab = createBottomTabNavigator();

const ReportStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
      }}
    >
      <Tab.Screen
        name="Daily"
        component={ReportScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="today" color={color} size={size} />
          ),
          tabBarLabelStyle: {
            fontSize: 17,
          },
        }}
      />
      <Tab.Screen
        name="Monthly"
        component={MonthlyReportScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="calendar-month"
              color={color}
              size={size}
            />
          ),
          tabBarLabelStyle: {
            fontSize: 17,
          },
        }}
      />
      <Tab.Screen
        name="Yearly"
        component={YearlyReportScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="calendar-today" color={color} size={size} />
          ),
          tabBarLabelStyle: {
            fontSize: 17,
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ReportStack;
