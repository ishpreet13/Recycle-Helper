import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import { TextInput } from "react-native-gesture-handler";

function AppInputField({
  leftIcon,
  rightIcon,
  placeholder,
  handlePasswordVisibility,
  ...rest
}) {
  return (
    <View style={styles.container}>
      {leftIcon ? (
        <MaterialCommunityIcons
          name={leftIcon}
          size={20}
          style={styles.leftIcon}
        />
      ) : null}
      <TextInput
        {...rest}
        placeholder={placeholder}
        placeholderTextColor={colors.placeHolderTextColor}
        style={styles.input}
      ></TextInput>
      {rightIcon ? (
        <TouchableOpacity onPress={handlePasswordVisibility}>
          <MaterialCommunityIcons
            name={rightIcon}
            size={20}
            style={styles.rightIcon}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 20,
    borderStyle: "solid",
    borderColor: colors.black,
    borderWidth: 1,
    flexDirection: "row",
    padding: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    width: "100%",
    fontSize: 18,
  },
  leftIcon: {
    marginRight: 10,
    color: colors.black,
  },
  rightIcon: {
    marginLeft: 10,
    alignSelf: "center",
  },
});

export default AppInputField;
