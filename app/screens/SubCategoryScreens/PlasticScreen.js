import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { BackHandler } from "react-native";

import AppButton from "../../components/AppButton";
import Screen from "../../components/Screen";
import Styles from "../../config/Styles";
import colors from "../../config/colors";

function PlasticScreen({ navigation }) {
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
            Select Plastic Category for Recycle Instructions
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            title="Packing Peanuts"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Packing Peanuts",
              })
            }
          ></AppButton>
          <AppButton
            title="Plastic Containers"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Plastic Container",
              })
            }
          ></AppButton>
          <AppButton
            title="Plastic Bags"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Plastic Bags",
              })
            }
          ></AppButton>
          <AppButton
            title="Plastic Cap and Lids"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Plastic Cap and Lids",
              })
            }
          ></AppButton>
          <AppButton
            title="Plastic Jugs and Bottles"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Plastic Jugs and Bottles",
              })
            }
          ></AppButton>
          <AppButton
            title="Plastic Wrap and Film"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Plastic Wrap and Film",
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
export default PlasticScreen;
