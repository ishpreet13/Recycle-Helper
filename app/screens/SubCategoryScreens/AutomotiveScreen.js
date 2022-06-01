import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { BackHandler } from "react-native";

import AppButton from "../../components/AppButton";
import Screen from "../../components/Screen";
import Styles from "../../config/Styles";
import colors from "../../config/colors";

function AutomotiveScreen({ navigation }) {
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
            Select Automotive Category for Recycle Instructions
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            title="Auto Fluids"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Auto Fluids",
              })
            }
          ></AppButton>
          <AppButton
            title="Car Batteries"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Car Batteries",
              })
            }
          ></AppButton>
          <AppButton
            title="Tires"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Tires",
              })
            }
          ></AppButton>
          <AppButton
            title="Used Motor Oil and Filters"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Used Motor Oil and Filters",
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

export default AutomotiveScreen;
