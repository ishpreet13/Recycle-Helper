import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { BackHandler } from "react-native";

import AppButton from "../../components/AppButton";
import Screen from "../../components/Screen";
import Styles from "../../config/Styles";
import colors from "../../config/colors";

function MetalScreen({ navigation }) {
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
            Select Metal Category for Recycle Instructions
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            title="Aerosol Cans"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Aerosol Cans",
              })
            }
          ></AppButton>
          <AppButton
            title="Aluminum Cans"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Aluminum Cans",
              })
            }
          ></AppButton>
          <AppButton
            title="Aluminum Foil"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Aluminum Foil",
              })
            }
          ></AppButton>
          <AppButton
            title="Aluminium Takeout Containers"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Aluminium Takeout Containers",
              })
            }
          ></AppButton>
          <AppButton
            title="Metal Caps and Lids"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Metal Caps and Lids",
              })
            }
          ></AppButton>
          <AppButton
            title="Scrap Metal"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Scrap Metal",
              })
            }
          ></AppButton>
          <AppButton
            title="Tin or Steel Cans"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Tin or Steel Cans",
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
export default MetalScreen;
