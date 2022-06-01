import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, ImageBackground, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { doc, setDoc, getFirestore, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, deleteObject } from "firebase/storage";
import { useIsFocused } from "@react-navigation/native";

import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import fetchUserProfile from "../utility/fetchUserProfile";
import fetchUserGoalData from "../utility/fetchUserGoalData";
import Screen from "../components/Screen";
import colors from "../config/colors";
import AppButton from "../components/AppButton";

function UserProfileScreen({ navigation }) {
  const isFocused = useIsFocused();
  const [userImage, setUserImage] = useState("");
  const [userName, setUserName] = useState("");
  const [totalScore, setTotalScore] = useState(0);
  const [totalItemsRecycled, setTotalItemsRecycled] = useState(0);
  const [previousUserProfileImageName, setPreviousUserProfileImageName] =
    useState("");
  const { user } = useContext(AuthenticatedUserContext);

  useEffect(() => {
    if (isFocused) {
      const something = fetchUserGoalData.fetchUserGoalData(user.uid);
      something.then((value) => {
        setUserImage(value.userImage);
        setUserName(value.userName);
        setTotalScore(value.totalScore);
        setTotalItemsRecycled(value.totalItemsRecycled);
      });
    }
  }, [isFocused]);

  const onhandleUploadImage = async () => {
    // Ask the user for the permission to access the media
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    // Explore the result
    if (!pickerResult.cancelled) {
      setUserImage(pickerResult.uri);
      console.log("pickerResult.uri", pickerResult.uri);
      console.log("Image URI ====", pickerResult.uri);
      if (pickerResult.uri !== null) {
        if (previousUserProfileImageName !== "") {
          deletePreviousProfileImage();
        }
        onUploadToBucket(pickerResult.uri);
      }
    }
  };

  const deletePreviousProfileImage = async () => {
    const storage = getStorage();
    // Create a reference to the file to delete
    const desertRef = ref(
      storage,
      `UserProfileImage/${previousUserProfileImageName}.jpg`
    );
    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
        console.log("File deleted successfully");
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log("Uh-oh, an error occurred!", error);
      });
  };

  const onUploadToBucket = async (imagePath) => {
    try {
      const arraysplit = JSON.stringify(imagePath).split("/");
      const destinationImageNameArray =
        arraysplit[arraysplit.length - 1].split(".");
      const response = await fetch(imagePath);
      const blob = await response.blob();
      const storage = getStorage();
      const timestamp = Date.now();
      const destinationImageName = destinationImageNameArray[0] + timestamp;
      setPreviousUserProfileImageName(destinationImageName);
      const imageRef = ref(
        storage,
        `UserProfileImage/${destinationImageName}.jpg`
      );
      uploadBytes(imageRef, blob).then((snapshot) => {
        console.log("Uploaded a blob or file!");
        updateUserInfo(destinationImageName);
      });
    } catch (error) {
      console.log("Error message", error.message);
    }
  };
  const updateUserInfo = async (destinationImageName) => {
    const db = getFirestore();
    const userDoc = doc(db, "UserInfo", user.uid);
    try {
      await updateDoc(userDoc, {
        userImage: `https://firebasestorage.googleapis.com/v0/b/recyclehelper-26d6b.appspot.com/o/UserProfileImage%2F${destinationImageName}.jpg?alt=media`,
      });
      setUserImage(
        `https://firebasestorage.googleapis.com/v0/b/recyclehelper-26d6b.appspot.com/o/UserProfileImage%2F${destinationImageName}.jpg?alt=media`
      );
    } catch (err) {
      console.log("Adding in database error", err);
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.profileImageContainer}>
          {userImage === "" ? (
            <View style={styles.whenProfileImageAbsent}>
              <TouchableOpacity onPress={onhandleUploadImage}>
                <MaterialCommunityIcons
                  name="camera"
                  size={30}
                  color="black"
                ></MaterialCommunityIcons>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.whenProfileImagePresent}>
              <ImageBackground
                source={{ uri: userImage }}
                style={styles.profileImage}
              >
                <TouchableOpacity onPress={onhandleUploadImage}>
                  <MaterialCommunityIcons
                    name="camera"
                    size={30}
                    color="whitesmoke"
                  ></MaterialCommunityIcons>
                </TouchableOpacity>
              </ImageBackground>
            </View>
          )}
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.subContainer}>
            <Text style={styles.LabelTextBox}>{"Name"}</Text>
            <Text style={styles.TextBox}>{userName}</Text>
          </View>
          <View style={styles.subContainer}>
            <Text style={styles.LabelTextBox}>{"Email"}</Text>
            <Text style={styles.TextBox}>{user.email}</Text>
          </View>
          <View style={styles.subContainer}>
            <Text style={styles.LabelTextBox}>{"Items Recycled"}</Text>

            <Text style={styles.TextBox}>{totalItemsRecycled}</Text>
          </View>
          <View style={styles.subContainer}>
            <Text style={styles.LabelTextBox}>{"Score"}</Text>
            <Text style={styles.TextBox}>{totalScore}</Text>
          </View>
        </View>
        <View style={styles.editProfileButton}>
          <AppButton
            title="Edit Profile"
            onPress={() =>
              navigation.navigate("UpdateProfile", {
                userName: userName,
                userEmail: user.email,
                userUID: user.uid,
                userImage: userImage,
              })
            }
          ></AppButton>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.white,
  },
  contentContainer: {
    flex: 1,
    borderRadius: 20,
    padding: 10,
    margin: 20,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  profileImageContainer: {
    width: "100%",
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: colors.primary,
  },
  whenProfileImageAbsent: {
    backgroundColor: "silver",
    height: 200,
    width: 200,
    borderRadius: 100,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  whenProfileImagePresent: {
    height: 200,
    width: 200,
    borderRadius: 100,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  profileImage: {
    height: 200,
    width: 200,
    borderRadius: 100,
    overflow: "hidden",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  TextBox: {
    backgroundColor: colors.white,
    height: 40,
    width: "70%",
    margin: 10,
    marginRight: 15,
    textAlignVertical: "center",
    borderRadius: 10,
    padding: 10,
    color: colors.dashboardLabelColor,
    borderStyle: "solid",
    borderWidth: 1,
  },
  LabelTextBox: {
    width: "40%",
    textAlignVertical: "center",
    borderRadius: 10,
    padding: 5,
    marginLeft: 10,
    color: "black",
    fontSize: 15,
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  editProfileButton: {
    flexDirection: "row",
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});

export default UserProfileScreen;
