import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import { TextInput } from "react-native-gesture-handler";

function UpdatePasswordComponent({
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
        placeholderTextColor="grey"
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
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.black,
  },
  input: {
    flex: 1,
    backgroundColor: colors.white,
    height: 22,
    margin: 10,
    textAlignVertical: "center",
    borderRadius: 10,
    color: "grey",
    fontSize: 15,
  },
  leftIcon: {
    marginRight: 10,
    color: colors.black,
  },
  rightIcon: {
    marginRight: 10,
    alignSelf: "center",
  },
});

export default UpdatePasswordComponent;
