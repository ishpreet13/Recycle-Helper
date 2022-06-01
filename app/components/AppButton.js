import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

import colors from "../config/colors";

function AppButton({
  title,
  onPress,
  color = "primary",
  width = "100%",
  fontSize = 20,
  padding = 15,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: colors[color], width: width, padding: padding },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, { fontSize: fontSize }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.white,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
    borderColor: colors.white,
  },
  text: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
  },
});

export default AppButton;
