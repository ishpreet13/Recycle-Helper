import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";

import AppButton from "../components/AppButton";
import Styles from "../config/Styles";
import Screen from "../components/Screen";
import colors from "../config/colors";

function MainCategoryListScreen({ navigation }) {
  return (
    <Screen>
      <ScrollView style={styles.container}>
        <View style={styles.heading}>
          <Text style={Styles.heading}>
            Select Item Category for Recycle Instructions
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            title="Automotive"
            onPress={() => navigation.navigate("Automotive")}
          ></AppButton>
          <AppButton
            title="Construction"
            onPress={() => navigation.navigate("Construction")}
          ></AppButton>
          <AppButton
            title="Glass"
            onPress={() => navigation.navigate("Glass")}
          ></AppButton>
          <AppButton
            title="Plastic"
            onPress={() => navigation.navigate("Plastic")}
          ></AppButton>
          <AppButton
            title="Metal"
            onPress={() => navigation.navigate("Metal")}
          ></AppButton>
          <AppButton
            title="Electronics"
            onPress={() => navigation.navigate("Electronics")}
          ></AppButton>
          <AppButton
            title="Paper"
            onPress={() => navigation.navigate("Paper")}
          ></AppButton>
          <AppButton
            title="HouseHold Waste"
            onPress={() => navigation.navigate("HouseholdWaste")}
          ></AppButton>
          <AppButton
            title="Household"
            onPress={() => navigation.navigate("Household")}
          ></AppButton>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  heading: {
    marginBottom: 10,
    paddingLeft: 2,
    paddingRight: 2,
  },
  buttonContainer: {
    width: "90%",
    alignSelf: "center",
  },
});

export default MainCategoryListScreen;
