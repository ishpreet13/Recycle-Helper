import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { BackHandler } from "react-native";

import AppButton from "../../components/AppButton";
import Screen from "../../components/Screen";
import Styles from "../../config/Styles";
import colors from "../../config/colors";

function ConstructionScreen({ navigation }) {
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
            Select Construction Category for Recycle Instructions
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            title="Carpet"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Carpet",
              })
            }
          ></AppButton>
          <AppButton
            title="Construction Waste"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Construction Waste",
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
export default ConstructionScreen;
