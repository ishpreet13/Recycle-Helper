import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { BackHandler } from "react-native";

import AppButton from "../../components/AppButton";
import Screen from "../../components/Screen";
import Styles from "../../config/Styles";
import colors from "../../config/colors";

function GlassScreen({ navigation }) {
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
            Select Glass Category for Recycle Instructions
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            title="Non-Container Glass"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "NonContainer Glass",
              })
            }
          ></AppButton>
          <AppButton
            title="Glass Container"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Glass Container",
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
export default GlassScreen;
