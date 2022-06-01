import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import LottieView from "lottie-react-native";
import { StatusBar } from "expo-status-bar";
import { useIsFocused } from "@react-navigation/native";

import Firebase from "../config/firebase";
import { getAuth, signOut } from "firebase/auth";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import fetchUserProfile from "../utility/fetchUserProfile";
import Screen from "../components/Screen";

// const auth = Firebase.auth();
const auth = getAuth(Firebase);

function HomeScreen({ navigation }) {
  const isFocused = useIsFocused();
  const [userName, setUserName] = useState();
  const { user } = useContext(AuthenticatedUserContext);
  useEffect(() => {
    if (isFocused) {
      const something = fetchUserProfile.getDocumentFromFirestore(user.uid);
      something.then((value) => {
        setUserName(value.name);
      });
    }
  }, [isFocused]);

  console.log(user);
  const handleSignOut = async () => {
    try {
      auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  const onStartRecycling = () => {
    navigation.navigate("Recycle");
  };

  return (
    <Screen>
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.white} />
        <View style={styles.animationContainer}>
          <LottieView
            autoPlay
            loop
            source={require("../assets/welcomeEarthAnimation.json")}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Welcome {userName} !</Text>
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            title="Start Recycling"
            onPress={onStartRecycling}
          ></AppButton>
          <AppButton
            title="Profile"
            onPress={() => {
              navigation.navigate("UserProfile");
            }}
          ></AppButton>
          <AppButton
            title="Recycle Report"
            onPress={() => {
              navigation.navigate("Report");
            }}
          ></AppButton>
          <AppButton
            title="Recycle Goal"
            onPress={() => {
              navigation.navigate("SetUserGoal");
            }}
          ></AppButton>
          <AppButton title="Log out" onPress={handleSignOut}></AppButton>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: "center",
  },
  animationContainer: {
    width: "50%",
    height: "30%",
    alignItems: "center",
    flexDirection: "column-reverse",
  },
  textContainer: {
    margin: 20,
    marginBottom: 30,
    justifyContent: "center",
  },
  buttonContainer: {
    width: "100%",
  },
  text: {
    fontSize: 25,
    color: colors.secondary,
    fontWeight: "bold",
  },
});

export default HomeScreen;
