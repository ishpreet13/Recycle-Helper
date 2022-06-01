import React, { useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { BackHandler } from "react-native";

import AppButton from "../../components/AppButton";
import Screen from "../../components/Screen";
import Styles from "../../config/Styles";
import colors from "../../config/colors";

function ElectronicsScreen({ navigation }) {
  const handleBackButtonClick = () => {
    navigation.navigate("MainCategoryList");
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);
  return (
    <Screen>
      <ScrollView style={styles.container}>
        <View style={styles.heading}>
          <Text style={Styles.heading}>
            Select Electronics Category for Recycle Instructions
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            title="CDs and Tapes"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "CDs and Tapes",
              })
            }
          ></AppButton>
          <AppButton
            title="Cell Phones"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Cell Phones",
              })
            }
          ></AppButton>
          <AppButton
            title="Computer Monitors"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Computer Monitors",
              })
            }
          ></AppButton>
          <AppButton
            title="Computers"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Computers",
              })
            }
          ></AppButton>
          <AppButton
            title="Ink Cartridges"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Ink Cartridges",
              })
            }
          ></AppButton>
          <AppButton
            title="Large Appliances"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Large Appliances",
              })
            }
          ></AppButton>
          <AppButton
            title="Large Electronics"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Large Electronics",
              })
            }
          ></AppButton>
          <AppButton
            title="LED Light Bulbs"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "LED Light Bulbs",
              })
            }
          ></AppButton>
          <AppButton
            title="Batteries"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Batteries",
              })
            }
          ></AppButton>
          <AppButton
            title="Small Appliances"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Small Appliances",
              })
            }
          ></AppButton>
          <AppButton
            title="Small Electronics"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Small Electronics",
              })
            }
          ></AppButton>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "90%",
    alignSelf: "center",
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  heading: {
    marginBottom: 5,
    paddingLeft: 2,
    paddingRight: 2,
  },
});
export default ElectronicsScreen;
