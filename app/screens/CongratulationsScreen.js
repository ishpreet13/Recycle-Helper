import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import LottieView from "lottie-react-native";
import { BackHandler } from "react-native";

import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import getRandomNumberBetween from "../config/quotes";

function CongratulationsScreen({ navigation }) {
  const [randomQuote, setRandomQuote] = useState(getRandomNumberBetween());
  const handleBackButtonClick = () => {
    navigation.navigate("Recycle");
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.animationContainer}>
          <LottieView
            autoPlay
            loop
            source={require("../assets/congratsAnimation.json")}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.text}>
            {randomQuote.quote} {"\n"}
            {`\t                       \t– `}
            {randomQuote.author}
            {"\n"}
          </Text>
          <Text style={styles.text2}>
            Congratulations! You did the right thing!{"\n"}
          </Text>
          <AppButton
            title="Go back to home page"
            onPress={() => navigation.navigate("Home")}
          ></AppButton>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  animationContainer: {
    width: "100%",
    height: "60%",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
  },
  text: {
    color: "coral",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  text2: {
    color: "chocolate",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});

export default CongratulationsScreen;
