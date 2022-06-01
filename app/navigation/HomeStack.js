import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import RecycleScreen from "../screens/RecycleScreen";
import UploadScreen from "../screens/UploadScreen";
import MainCategoryListScreen from "../screens/MainCategoryListScreen";
import PlasticScreen from "../screens/SubCategoryScreens/PlasticScreen";
import AutomotiveScreen from "../screens/SubCategoryScreens/AutomotiveScreen";
import ConstructionScreen from "../screens/SubCategoryScreens/ConstructionScreen";
import ElectronicsScreen from "../screens/SubCategoryScreens/ElectronicsScreen";
import GlassScreen from "../screens/SubCategoryScreens/GlassScreen";
import HouseholdWasteScreen from "../screens/SubCategoryScreens/HouseholdWasteScreen";
import HouseholdScreen from "../screens/SubCategoryScreens/HouseholdScreen";
import MetalScreen from "../screens/SubCategoryScreens/MetalScreen";
import PaperScreen from "../screens/SubCategoryScreens/PaperScreen";
import InstructionsScreen from "../screens/InstructionsScreen";
import PredictionScreen from "../screens/PredictionScreen";
import UpdateProfileScreen from "../screens/UpdateProfileScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import CongratulationsScreen from "../screens/CongratulationsScreen";
import ReportStack from "./ReportStack";
import checktrialsscreen from "../screens/checktrialsscreen";
import SetUserGoalScreen from "../screens/SetUserGoalScreen";
import UpdateGoalScreen from "../screens/UpdateGoalScreen";
import AdditionalFluidScreen from "../screens/SubCategoryScreens/AdditionalFluidScreen";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Recycle" component={RecycleScreen} />
      <Stack.Screen name="Upload" component={UploadScreen} />
      <Stack.Screen
        name="MainCategoryList"
        component={MainCategoryListScreen}
      />
      <Stack.Screen name="Automotive" component={AutomotiveScreen} />
      <Stack.Screen name="Construction" component={ConstructionScreen} />
      <Stack.Screen name="Electronics" component={ElectronicsScreen} />
      <Stack.Screen name="Glass" component={GlassScreen} />
      <Stack.Screen name="Household" component={HouseholdScreen} />
      <Stack.Screen name="HouseholdWaste" component={HouseholdWasteScreen} />
      <Stack.Screen name="Metal" component={MetalScreen} />
      <Stack.Screen name="Paper" component={PaperScreen} />
      <Stack.Screen name="Plastic" component={PlasticScreen} />
      <Stack.Screen name="InstructionScreen" component={InstructionsScreen} />
      <Stack.Screen name="Prediction" component={PredictionScreen} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
      <Stack.Screen name="Congratulations" component={CongratulationsScreen} />
      <Stack.Screen name="Report" component={ReportStack} />
      <Stack.Screen name="trial" component={checktrialsscreen} />
      <Stack.Screen name="SetUserGoal" component={SetUserGoalScreen} />
      <Stack.Screen name="UpdateGoal" component={UpdateGoalScreen} />
      <Stack.Screen
        name="AdditionalFluidScreen"
        component={AdditionalFluidScreen}
      />
    </Stack.Navigator>
  );
}
