import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import "firebase/firestore";
import { doc, setDoc, getFirestore } from "firebase/firestore";

import Firebase from "../config/firebase";
import colors from "../config/colors";
import AppInputField from "../components/AppInputField";
import ErrorMessage from "../components/ErrorMessage";
import AppButton from "../components/AppButton";
import Screen from "../components/Screen";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(Firebase);

function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const [signupError, setSignupError] = useState("");

  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const addUserInfoInFirestore = async () => {
    const currentUser = auth.currentUser;
    const db = getFirestore();
    try {
      await setDoc(doc(db, "UserInfo", currentUser.uid), {
        name: name,
        email: currentUser.email,
        userImage: "",
        recycleActivity: {},
        goal: {},
      });
    } catch (err) {
      console.log("adding in database error", error);
    }
  };

  const onHandleSignup = async () => {
    var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if (regName.test(name)) {
      if (confirmPassword === password) {
        try {
          if (email !== "" && password !== "") {
            try {
              createUserWithEmailAndPassword(auth, email, password)
                .then((response) => {
                  addUserInfoInFirestore();
                })
                .catch((error) => {
                  setSignupError(error.message);
                });
            } catch (error) {
              setSignupError(error.message);
            }
          }
        } catch (error) {
          setSignupError(error.message);
        }
      } else {
        setSignupError("The password you entered did not match");
      }
    } else {
      setSignupError("Please Enter a Valid Name");
    }
  };

  return (
    <Screen>
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
            leftIcon="account"
            placeholder="Enter your full name"
            autoCapitalize="none"
            autoFocus={true}
            value={name}
            onChangeText={(text) => setName(text)}
          />
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
          <AppInputField
            inputStyle={{
              fontSize: 14,
            }}
            containerStyle={{
              backgroundColor: "#fff",
              marginBottom: 20,
            }}
            leftIcon="lock"
            placeholder="Confirm your password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
          {signupError ? (
            <ErrorMessage error={signupError} visible={true} />
          ) : null}
          <View style={styles.buttonContainer}>
            <AppButton
              title="Sign Up"
              onPress={onHandleSignup}
              color={"primary"}
            ></AppButton>
            <AppButton
              title="Login"
              onPress={() => navigation.navigate("Login")}
              color={"primary"}
            ></AppButton>
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  inputFieldContainer: {
    flex: 2,
    alignItems: "center",
    backgroundColor: colors.white,
    width: "100%",
    height: "30%",
  },
  logo: {
    alignSelf: "center",
    width: 130,
    height: 130,
  },
  logoContainer: {
    alignItems: "center",
    backgroundColor: colors.primary,
    marginBottom: 60,
    marginTop: 15,
    padding: 5,
    borderRadius: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "600",
    color: colors.white,
    alignSelf: "center",
    paddingBottom: 24,
  },
  buttonContainer: {
    flex: 3,
    width: "100%",
  },
});

export default SignUpScreen;
