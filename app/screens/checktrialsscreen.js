import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import AppButton from "../components/AppButton";
import fetchUserGoalData from "../utility/fetchUserGoalData";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";

function checktrialsscreen(props) {
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
  });

  // useEffect(() => {
  //   chook.then((value) => {
  //     setUserImage(value.userImage);
  //     setUserName(value.name);
  //     setUserEmail(value.email);
  //     setTotalMonthlyItemsRecycled(value.totalMonthlyItemsRecycled);
  //     setTotalMonthlyScore(value.totalMonthlyScore);
  //     setCurrentGoal(value.currentGoal);
  //     setTargetGoal(value.targetGoal);
  //     setTotalScore(value.totalScore);
  //     setTotalItemsRecycled(value.totalItemsRecycled);
  //   });
  // }, []);

  return (
    <View style={styles.container}>
      {console.log(" user Image", userImage)}
      {console.log(" user email ", userEmail)}
      {console.log(" user name", userName)}
      {console.log("  TMIR", totalMonthlyItemsRecycled)}
      {console.log(" TMS", totalMonthlyScore)}
      {console.log(" CG", currentGoal)}
      {console.log(" TG", targetGoal)}
      {console.log(" TS", totalScore)}
      {console.log(" TIR", totalItemsRecycled)}
      <AppButton
        title="Click Me"
        onPress={() => console.log("here ")}
      ></AppButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default checktrialsscreen;
