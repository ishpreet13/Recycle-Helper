import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import Screen from "../components/Screen";

import colors from "../config/colors";

function WelcomeScreen({ navigation }) {
  // const navigation = useNavigation();
  return (
    <View style={{ flex: 1, height: "100%" }}>
      <ImageBackground
        blurRadius={0.72}
        style={styles.background}
        source={require("../assets/recycleWelcomeScreen3.jpg")}
      >
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/logo.png")}
          ></Image>
          <Text style={styles.tagLine}>Recycle Helper</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <AppButton
            title="Login"
            onPress={() => navigation.navigate("Login")}
            color="secondary"
          ></AppButton>
          <AppButton
            title="Sign Up"
            onPress={() => navigation.navigate("SignUp")}
            color="secondary"
          ></AppButton>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  logo: {
    width: 150,
    height: 150,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  tagLine: {
    color: colors.white,
    fontSize: 25,
    fontWeight: "600",
    paddingVertical: 20,
  },
});
export default WelcomeScreen;
