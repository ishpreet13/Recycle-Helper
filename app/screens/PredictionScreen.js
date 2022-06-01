import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { BackHandler } from "react-native";

import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import colors from "../config/colors";

function PredictionScreen({ route, navigation }) {
  const { predictedCategory } = route.params;
  let fluidCategory = "";
  if (
    predictedCategory == "Auto Fluids" ||
    predictedCategory == "Cooking Oil" ||
    predictedCategory == "Used Motor Oil and Filters"
  ) {
    fluidCategory = "Fluid";
  }

  const handleYesButton = () => {
    if (fluidCategory != "") {
      navigation.navigate("AdditionalFluidScreen");
    } else {
      navigation.navigate("InstructionScreen", {
        documentName: predictedCategory,
      });
    }
  };

  const handleBackButtonClick = () => {
    navigation.navigate("Recycle");
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
        <Text style={styles.text}>
          Our bot predicted the item to be {"\n"}{" "}
          {fluidCategory == "" ? predictedCategory : fluidCategory}
        </Text>
        <Text style={styles.text}>
          Do you think the prediction is correct?{"\n"}
          {"\n"}
        </Text>
        <View style={styles.buttonContainer}>
          <AppButton
            title="Yes, show me recycle instructions!"
            onPress={handleYesButton}
            fontSize={15}
          ></AppButton>
          <AppButton
            title="No, Pick correct category!"
            onPress={() => navigation.navigate("MainCategoryList")}
            fontSize={15}
          ></AppButton>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  text: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    width: "90%",
    alignSelf: "center",
  },
});

export default PredictionScreen;
