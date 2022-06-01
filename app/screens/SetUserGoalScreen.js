import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, ImageBackground, Text } from "react-native";
import "firebase/firestore";
import { StatusBar } from "expo-status-bar";
import { doc, setDoc, getFirestore } from "firebase/firestore";

import AppButton from "../components/AppButton";
import AppInputField from "../components/AppInputField";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import colors from "../config/colors";
import { useIsFocused } from "@react-navigation/native";
import fetchUserGoalData from "../utility/fetchUserGoalData";
import Screen from "../components/Screen";

function SetUserGoalScreen({ navigation }) {
  const isFocused = useIsFocused();
  const { user } = useContext(AuthenticatedUserContext);
  const [userImage, setUserImage] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [totalMonthlyItemsRecycled, setTotalMonthlyItemsRecycled] = useState(0);
  const [totalMonthlyScore, setTotalMonthlyScore] = useState(0);
  const [currentGoal, setCurrentGoal] = useState(0);
  const [targetGoal, setTargetGoal] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [totalItemsRecycled, setTotalItemsRecycled] = useState(0);

  useEffect(() => {
    if (isFocused) {
      const chook = fetchUserGoalData.fetchUserGoalData(user.uid);
      chook.then((value) => {
        setUserImage(value.userImage);
        setUserName(value.userName);
        setUserEmail(value.userEmail);
        setTotalMonthlyItemsRecycled(value.totalMonthlyItemsRecycled);
        setTotalMonthlyScore(value.totalMonthlyScore);
        setCurrentGoal(value.currentGoal);
        setTargetGoal(value.targetGoal);
        setTotalScore(value.totalScore);
        setTotalItemsRecycled(value.totalItemsRecycled);
      });
    }
  }, [isFocused, targetGoal]);

  const [newTargetGoal, setNewTargetGoal] = useState(targetGoal);
  let percentageCompleted = ((currentGoal / targetGoal) * 100).toFixed(2);

  const handleSetGoal = async () => {
    if (newTargetGoal < 0) {
      alert("Target number of items cannot be negative!");
    } else if (newTargetGoal == 0) {
      alert("Target number of items cannot be zero!");
    } else if (newTargetGoal == null || newTargetGoal == "") {
      alert("Target goal cannot be null!");
    } else if (isNaN(newTargetGoal)) {
      alert("The value entered is not a number!");
    } else {
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
                  Current: currentGoal,
                },
              },
            },
          },
          { merge: true }
        );
      } catch (error) {
        console.log(error);
      }
      setTargetGoal(newTargetGoal);
      alert("Goal set successfully!");
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.white} />
        <View style={styles.profileImageContainer}>
          {userImage === "" ? (
            <View style={styles.whenProfileImageAbsent}></View>
          ) : (
            <View style={styles.whenProfileImagePresent}>
              <ImageBackground
                source={{ uri: userImage }}
                style={styles.profileImage}
              ></ImageBackground>
            </View>
          )}
          <Text style={styles.userNameText}>{userName}</Text>
          <Text style={styles.userEmailText}>{userEmail}</Text>
        </View>
        <View style={styles.numbersDashboard}>
          <View style={styles.numberDashboardLabels}>
            <Text style={styles.dashboardText}>{totalScore}</Text>
            <Text style={styles.dashboardTextLabel}>Total Score</Text>
          </View>
          <View>
            <Text style={styles.dashboardText}>{totalItemsRecycled}</Text>
            <Text style={styles.dashboardTextLabel}>Total Items Recycled</Text>
          </View>
        </View>
        <View style={styles.DailyDashboard}>
          <View>
            <Text style={styles.dashboardText}>{totalMonthlyScore}</Text>
            <Text style={styles.dashboardTextLabel}>Monthly Score</Text>
          </View>
          <View>
            <Text style={styles.dashboardText}>
              {totalMonthlyItemsRecycled}
            </Text>
            <Text style={styles.dashboardTextLabel}>
              Monthly Items Recycled
            </Text>
          </View>
        </View>
        {targetGoal == 0 ? (
          <View
            style={{
              flex: 1,
              margin: 20,
              justifyContent: "flex-start",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                margin: 5,
                marginTop: 20,
                padding: 5,
              }}
            >
              Set a monthly target to recycle items
            </Text>
            <AppInputField
              placeholder="Enter target number of items"
              onChangeText={(text) => setNewTargetGoal(text)}
              keyboardType="number-pad"
              autoCorrect={false}
              autoCapitalize="none"
            ></AppInputField>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <AppButton title="Set Goal" onPress={handleSetGoal}></AppButton>
            </View>
          </View>
        ) : (
          <View>
            <Text
              style={{
                fontSize: 30,
                textAlign: "center",
                color: "grey",
                marginTop: 15,
              }}
            >
              You have completed
            </Text>
            <Text
              style={{
                fontSize: 30,
                textAlign: "center",
                color: "grey",
                margin: 20,
              }}
            >
              {percentageCompleted}%
            </Text>
            <Text
              style={{
                fontSize: 20,
                textAlign: "center",
                color: "black",
                margin: 20,
              }}
            >
              Target: {targetGoal} items
            </Text>
            <Text
              style={{
                fontSize: 20,
                textAlign: "center",
                color: "black",
                margin: 20,
              }}
            >
              Completed: {currentGoal} items
            </Text>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <AppButton
                title="Update goal"
                onPress={() =>
                  navigation.navigate("UpdateGoal", {
                    targetGoal: targetGoal,
                  })
                }
              ></AppButton>
              <AppButton
                title="Start Recycling"
                onPress={() => navigation.navigate("Recycle")}
              ></AppButton>
            </View>
          </View>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    textAlign: "center",
    padding: 10,
  },
  profileImageContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  whenProfileImageAbsent: {
    backgroundColor: "silver",
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  whenProfileImagePresent: {
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 40,
    overflow: "hidden",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  DailyDashboard: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 15,
  },
  dashboardText: {
    textAlign: "center",
    fontSize: 15,
    color: colors.black,
    fontWeight: "bold",
  },
  dashboardTextLabel: {
    textAlign: "center",
    color: colors.dashboardLabelColor,
    fontSize: 13,
  },
  numbersDashboard: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    marginBottom: 5,
  },
  background: {},
});

export default SetUserGoalScreen;
