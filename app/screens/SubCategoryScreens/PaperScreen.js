import React, { useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { BackHandler } from "react-native";

import AppButton from "../../components/AppButton";
import Screen from "../../components/Screen";
import Styles from "../../config/Styles";
import colors from "../../config/colors";

function PaperScreen({ navigation }) {
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
            Select Paper Category for Recycle Instructions
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            title="Books and Magazines"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Books and Magazines",
              })
            }
          ></AppButton>
          <AppButton
            title="Cardboard"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Cardboard",
              })
            }
          ></AppButton>
          <AppButton
            title="Cartons"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Cartons",
              })
            }
          ></AppButton>
          <AppButton
            title="Gift Cards and Gift Wrap"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Gift Cards and Gift Wrap",
              })
            }
          ></AppButton>
          <AppButton
            title="Newspaper"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Newspaper",
              })
            }
          ></AppButton>
          <AppButton
            title="Paper"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Paper",
              })
            }
          ></AppButton>
          <AppButton
            title="Paper Bags"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Paper Bags",
              })
            }
          ></AppButton>
          <AppButton
            title="Paper Cups"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Paper Cups",
              })
            }
          ></AppButton>
          <AppButton
            title="Paperboard"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Paperboard",
              })
            }
          ></AppButton>
          <AppButton
            title="Phone Books"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Phone Books",
              })
            }
          ></AppButton>
          <AppButton
            title="Shredded Paper"
            onPress={() =>
              navigation.navigate("InstructionScreen", {
                documentName: "Shredded Paper",
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
export default PaperScreen;
