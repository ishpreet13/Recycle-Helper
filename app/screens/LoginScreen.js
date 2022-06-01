import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { useState } from "react";

import Firebase from "../config/firebase";
import colors from "../config/colors";
import AppInputField from "../components/AppInputField";
import ErrorMessage from "../components/ErrorMessage";
import AppButton from "../components/AppButton";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(Firebase);

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const [loginError, setLoginError] = useState("");

  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onLogin = async () => {
    if (email == "") {
      setLoginError("Please enter your email");
    } else if (password == "") {
      setLoginError("Please enter your password");
    } else {
      try {
        if (email !== "" && password !== "") {
          signInWithEmailAndPassword(auth, email, password)
            .then(() => {
              // navigation.navigate("Home");
              // console.log("navigating to home");
            })
            .catch((error) => {
              setLoginError(error.message);
            });
        }
      } catch (error) {
        setLoginError(error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.white} />
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/logo.png")}
        ></Image>
      </View>
      <View style={styles.inputFieldContainer}>
        <AppInputField
          leftIcon="email"
          placeholder="Enter your email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <AppInputField
          leftIcon="lock"
          rightIcon={rightIcon}
          placeholder="Enter your password"
          autoCorrect={false}
          secureTextEntry={passwordVisibility}
          value={password}
          autoCapitalize="none"
          textContentType="password"
          onChangeText={(text) => setPassword(text)}
          handlePasswordVisibility={handlePasswordVisibility}
        />
        {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}
        <AppButton
          title="Login"
          onPress={onLogin}
          color={"primary"}
        ></AppButton>
        <AppButton
          title="Sign Up"
          onPress={() => navigation.navigate("SignUp")}
          color={"primary"}
        ></AppButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  inputFieldContainer: {
    backgroundColor: colors.white,
    paddingBottom: 20,
    width: "100%",
    height: "50%",
  },
  logo: {
    alignSelf: "center",
    width: 130,
    height: 130,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 5,
  },
  title: {
    fontSize: 40,
    fontWeight: "600",
    color: colors.white,
    alignSelf: "center",
    paddingBottom: 24,
  },
});

export default LoginScreen;
