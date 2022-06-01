import React, { useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { BackHandler } from "react-native";

import AppButton from "../../components/AppButton";
import Screen from "../../components/Screen";
import Styles from "../../config/Styles";
import colors from "../../config/colors";

function HouseholdScreen({ navigation }) {
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
            Select Household Category for Recycle Instructions
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            title="Christmas Trees"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Christmas Trees",
              })
            }
          ></AppButton>
          <AppButton
            title="Clothing and Accessories"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Clothing and Accessories",
              })
            }
          ></AppButton>
          <AppButton
            title="Cooking Oil"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Cooking Oil",
              })
            }
          ></AppButton>
          <AppButton
            title="Cookware"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Cookware",
              })
            }
          ></AppButton>
          <AppButton
            title="Corks"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Corks",
              })
            }
          ></AppButton>
          <AppButton
            title="Furniture"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Furniture",
              })
            }
          ></AppButton>
          <AppButton
            title="Mattresses"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Mattresses",
              })
            }
          ></AppButton>
          <AppButton
            title="Pillows"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Pillows",
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
export default HouseholdScreen;
