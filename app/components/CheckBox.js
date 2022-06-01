import React, { useState } from "react";
import { StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function CheckBox() {
  const [checked, onChange] = useState(false);

  function onCheckmarkPress() {
    onChange(!checked);
  }
  return (
    <Pressable
      style={[styles.checkBoxBase, checked && styles.checkBoxChecked]}
      onPress={onCheckmarkPress}
    >
      {checked && <Ionicons name="checkmark" size={24} color={"white"} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  checkBoxBase: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "coral",
    backgroundColor: "transparent",
  },
  checkBoxChecked: {
    backgroundColor: "coral",
  },
});

export default CheckBox;
