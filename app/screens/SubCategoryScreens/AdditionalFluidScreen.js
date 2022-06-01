import React from "react";
import { View, StyleSheet, Text } from "react-native";

import AppButton from "../../components/AppButton";
import colors from "../../config/colors";

function AdditionalFluidScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Please choose the fluid category {"\n"} </Text>
      <View style={styles.buttonContainer}>
        <AppButton
          title="Auto Fluids"
          onPress={() =>
            navigation.navigate("InstructionScreen", {
              documentName: "Auto Fluids",
            })
          }
          fontSize={15}
        ></AppButton>
        <AppButton
          title="Cooking Oil"
          onPress={() =>
            navigation.navigate("InstructionScreen", {
              documentName: "Cooking Oil",
            })
          }
          fontSize={15}
        ></AppButton>
        <AppButton
          title="Used Motor Oil and Filters"
          onPress={() =>
            navigation.navigate("InstructionScreen", {
              documentName: "Used Motor Oil and Filters",
            })
          }
          fontSize={15}
        ></AppButton>
      </View>
    </View>
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

export default AdditionalFluidScreen;
