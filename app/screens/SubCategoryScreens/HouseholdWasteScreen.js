import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { BackHandler } from "react-native";

import AppButton from "../../components/AppButton";
import Screen from "../../components/Screen";
import Styles from "../../config/Styles";
import colors from "../../config/colors";

function HouseholdWasteScreen({ navigation }) {
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
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={Styles.heading}>
            Select Household Waste Category for Recycle Instructions
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            title="CFLs"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "CFLs",
              })
            }
          ></AppButton>
          <AppButton
            title="Fluorescent Tubes"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Fluorescent Tube",
              })
            }
          ></AppButton>
          <AppButton
            title="Mercury Containing Items"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Mercury Containing Items",
              })
            }
          ></AppButton>
          <AppButton
            title="Medical Sharps"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Medical Sharps",
              })
            }
          ></AppButton>
          <AppButton
            title="Medications"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Medications",
              })
            }
          ></AppButton>
          <AppButton
            title="Paint"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Paint",
              })
            }
          ></AppButton>
          <AppButton
            title="Pesticides and Containers"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Pesticides and Containers",
              })
            }
          ></AppButton>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "90%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.white,
  },
  heading: {
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 2,
    paddingRight: 2,
  },
});
export default HouseholdWasteScreen;
