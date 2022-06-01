import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, Image } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { BackHandler } from "react-native";

import "firebase/firestore";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import {
  getAuth,
  updatePassword,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import AppInputField from "../components/AppInputField";
import UpdatePasswordComponent from "../components/UpdatePasswordComponent";
import { TouchableOpacity } from "react-native-gesture-handler";

const auth = getAuth();

function UpdateProfileScreen({ route, navigation }) {
  const [promptScreenVisible, setPromptScreenVisible] = useState(true);
  const [userName, setUserName] = useState(route.params.userName);
  const [userEmail, setUserEmail] = useState(route.params.userEmail);
  const [userPassword, setUserPassWord] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");

  const handleBackButtonClick = () => {
    navigation.navigate("UserProfile");
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

  const userUid = route.params.userUID;

  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const handleUserNameUpdate = async () => {
    var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if (regName.test(userName)) {
      const db = getFirestore();
      const userDoc = doc(db, "UserInfo", userUid);
      try {
        await updateDoc(userDoc, {
          name: userName,
        }).then(() => {
          alert("Name updated successfully!");
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("The name you entered is invalid!");
    }
  };

  const handleUserEmailUpdate = async () => {
    const user = auth.currentUser;
    if (userEmail !== "") {
      updateEmail(user, userEmail)
        .then(() => {
          updateUserEmailInFirestore();
        })
        .catch((error) => {
          alert(`Error : ${error.message}`);
        });
    } else {
      alert("Email cannot be empty!");
    }
  };
  const updateUserEmailInFirestore = async () => {
    const db = getFirestore();
    const userDoc = doc(db, "UserInfo", userUid);
    try {
      await updateDoc(userDoc, {
        email: userEmail,
      }).then(() => {
        alert("Email updated successfully!");
      });
    } catch (error) {
      alert(`Error : ${error.message}`);
    }
  };

  const handleUserPasswordUpdate = async () => {
    if (userPassword !== "") {
      if (userPassword === confirmPassword) {
        const user = auth.currentUser;
        updatePassword(user, userPassword)
          .then(() => {
            alert("Password Updated Succesfully!");
          })
          .catch((error) => {
            alert(`Error : ${error.message}`);
          });
      } else {
        alert("the passwords you entered do not match!");
      }
    } else {
      alert("Password cannot be empty!");
    }
  };

  const handleReauthenticate = () => {
    const user = auth.currentUser;
    const cred = EmailAuthProvider.credential(userEmail, userPassword);
    reauthenticateWithCredential(user, cred)
      .then(() => {
        setUserPassWord("");
        setPromptScreenVisible(false);
      })
      .catch((error) => {
        alert(`Error : ${error}`);
      });
  };

  return (
    <>
      {promptScreenVisible ? (
        <Screen>
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={require("../assets/logo.png")}
              ></Image>
            </View>
            <Text style={styles.passVerificationText}>
              Please verify your identity by re-entering your password!
            </Text>
            <AppInputField
              leftIcon="lock"
              rightIcon={rightIcon}
              placeholder="Enter your current password"
              autoCorrect={false}
              secureTextEntry={passwordVisibility}
              value={userPassword}
              autoCapitalize="none"
              textContentType="password"
              onChangeText={(text) => setUserPassWord(text)}
              handlePasswordVisibility={handlePasswordVisibility}
            />
            <AppButton
              title="Submit"
              onPress={() => {
                handleReauthenticate();
              }}
            ></AppButton>
          </View>
        </Screen>
      ) : (
        <Screen>
          <View style={styles.container}>
            <View style={styles.backbuttoncontainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("UserProfile")}
              >
                <Ionicons name="arrow-back" size={30} color={colors.primary} />
              </TouchableOpacity>
            </View>
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={require("../assets/logo.png")}
              ></Image>
            </View>
            <View style={styles.inputFieldContainer}>
              <View style={styles.subContainer}>
                <MaterialCommunityIcons
                  name="account"
                  size={30}
                  color={colors.primary}
                ></MaterialCommunityIcons>
                <TextInput
                  style={styles.TextBox}
                  placeholder={userName}
                  autoCapitalize="none"
                  autoFocus={true}
                  value={userName}
                  onChangeText={(text) => setUserName(text)}
                />
                <AppButton
                  title="Update"
                  onPress={handleUserNameUpdate}
                  width="30%"
                  color={"primary"}
                  fontSize={15}
                ></AppButton>
              </View>
              <View style={styles.subContainer}>
                <MaterialCommunityIcons
                  name="email"
                  size={30}
                  color={colors.primary}
                ></MaterialCommunityIcons>
                <TextInput
                  style={styles.TextBox}
                  placeholder={userEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoFocus={true}
                  value={userEmail}
                  onChangeText={(text) => setUserEmail(text)}
                />
                <AppButton
                  title="Update"
                  onPress={handleUserEmailUpdate}
                  width="30%"
                  color={"primary"}
                  fontSize={15}
                ></AppButton>
              </View>
              <View style={styles.subContainer2}>
                <MaterialCommunityIcons
                  name="lock"
                  size={35}
                  color={colors.primary}
                ></MaterialCommunityIcons>
                <View style={styles.passwordContainer}>
                  <UpdatePasswordComponent
                    rightIcon={rightIcon}
                    placeholder="Enter new password"
                    autoCorrect={false}
                    secureTextEntry={passwordVisibility}
                    value={userPassword}
                    autoCapitalize="none"
                    textContentType="password"
                    onChangeText={(text) => setUserPassWord(text)}
                    handlePasswordVisibility={handlePasswordVisibility}
                  />
                  <UpdatePasswordComponent
                    placeholder="Confirm new password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType="password"
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                  />
                </View>
                <AppButton
                  title="Update"
                  onPress={handleUserPasswordUpdate}
                  width="30%"
                  color={"primary"}
                  fontSize={15}
                ></AppButton>
              </View>
            </View>
          </View>
        </Screen>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  inputFieldContainer: {
    alignItems: "center",
    width: "100%",
    height: "30%",
    justifyContent: "space-evenly",
    borderRadius: 20,
  },
  logo: {
    width: 130,
    height: 130,
  },
  logoContainer: {
    marginTop: 20,
    marginBottom: 80,
    backgroundColor: colors.primary,
    alignItems: "center",
    borderRadius: 25,
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
  subContainer: {
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 20,
  },
  subContainer2: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 2,
    marginTop: 20,
  },
  TextBox: {
    backgroundColor: colors.white,
    height: 40,
    width: "60%",
    margin: 10,
    textAlignVertical: "center",
    borderRadius: 10,
    padding: 10,
    color: "grey",
    fontSize: 15,
    borderStyle: "solid",
    borderColor: colors.black,
    borderWidth: 1,
  },
  passwordContainer: {
    flex: 1,
    width: "100%",
  },
  backbuttoncontainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    marginTop: 10,
    marginLeft: 10,
  },
  passVerificationText: {
    fontSize: 23,
    textAlign: "center",
    color: colors.primary,
    fontWeight: "bold",
    marginBottom: 50,
  },
});

export default UpdateProfileScreen;
