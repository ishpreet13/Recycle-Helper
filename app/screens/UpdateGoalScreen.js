import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import "firebase/firestore";
import { StatusBar } from "expo-status-bar";
import { doc, setDoc, getFirestore } from "firebase/firestore";

import AppButton from "../components/AppButton";
import AppInputField from "../components/AppInputField";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import colors from "../config/colors";

function UpdateGoalScreen({ route, navigation }) {
  const targetGoal = route.params;
  const [newTargetGoal, setNewTargetGoal] = useState(targetGoal);
  const { user } = useContext(AuthenticatedUserContext);
  const [inputFieldLength, setInputFieldLength] = useState(0);

  const UpdateGoal = async () => {
    if (newTargetGoal < 0) {
      alert("Target number of items cannot be negative!");
    } else if (newTargetGoal == 0) {
      alert("Target number of items cannot be zero!");
    } else if (newTargetGoal == null || newTargetGoal == "") {
      alert("Target goal cannot be null!");
    } else if (isNaN(newTargetGoal)) {
      alert("The value entered is not a number!");
    } else {
      console.log("here", inputFieldLength);
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const db = getFirestore();
      const docref = doc(db, "UserInfo", user.uid);
      try {
        setDoc(
          docref,
          {
            goal: {
              [year]: {
                [month]: {
                  Target: parseInt(newTargetGoal),
                },
              },
            },
          },
          { merge: true }
        );
      } catch (error) {
        console.log(error);
      }
      alert("Goal updated successfully!");
      navigation.navigate("SetUserGoal");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.white} />
      <View style={{ margin: 20 }}>
        <AppInputField
          placeholder="Update target number of items"
          onChangeText={(text) => {
            setNewTargetGoal(text);
            setInputFieldLength(text.length);
          }}
          keyboardType="number-pad"
          autoCorrect={false}
          autoCapitalize="none"
        ></AppInputField>
      </View>
      <AppButton title="Update" onPress={UpdateGoal} width="50%"></AppButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default UpdateGoalScreen;
