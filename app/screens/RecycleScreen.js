import React, { useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { StatusBar } from "expo-status-bar";
import AppButton from "../components/AppButton";
import colors from "../config/colors";

function RecycleScreen({ navigation }) {
  const [pickedImagePath, setPickedImagePath] = useState("");
  const onClickPicture = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert(" Permission to access camera is required!");
      return;
    }
    const pickerResult = await ImagePicker.launchCameraAsync();
    //Explore the result
    console.log(pickerResult);
    if (!pickerResult.cancelled) {
      setPickedImagePath(pickerResult.uri);
      const fileImage = await ImageManipulator.manipulateAsync(
        pickerResult.uri,
        [{ resize: { width: 512, height: 384 } }]
      );
      console.log("fileImage is ", fileImage);
      console.log(pickedImagePath);
      console.log("Captured Image uri====", pickerResult.uri);
      if (pickedImagePath !== null) {
        console.log("Captured Image path in recycle screen", pickerResult.uri);
        navigation.navigate("Upload", { imagePath: fileImage.uri });
      }
    }
  };

  const onSelectPicture = async () => {
    // Ask the user for the permission to access the media
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    // Explore the result
    console.log(pickerResult);
    if (!pickerResult.cancelled) {
      setPickedImagePath(pickerResult.uri);
      console.log(pickedImagePath);
      console.log("Image URI ====", pickerResult.uri);
      if (pickedImagePath !== null) {
        const fileImage = await ImageManipulator.manipulateAsync(
          pickerResult.uri,
          [{ resize: { width: 512, height: 384 } }]
        );
        console.log("fileImage is ", fileImage);
        console.log("PickedImage path in recycle screen", pickerResult.uri);
        navigation.navigate("Upload", { imagePath: fileImage.uri });
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
      <View style={styles.taglineContainer}>
        <Text style={styles.tagLine}>Recycle Helper</Text>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton title="Click Picture" onPress={onClickPicture}></AppButton>
        <AppButton
          title="Choose picture from Gallery"
          onPress={onSelectPicture}
        ></AppButton>
        <AppButton
          title="Choose Item Category"
          onPress={() => navigation.navigate("MainCategoryList")}
        ></AppButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  buttonContainer: {
    alignItems: "center",
    width: "90%",
    marginBottom: 50,
  },
  logo: {
    width: 150,
    height: 150,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    backgroundColor: colors.primary,
    alignItems: "center",
    borderRadius: 25,
  },
  tagLine: {
    color: colors.primary,
    fontSize: 30,
    fontWeight: "600",
    paddingVertical: 20,
  },
  taglineContainer: {
    alignItems: "center",
    position: "absolute",
    top: 220,
  },
  thumbnail: {
    alignSelf: "center",
    width: 130,
    height: 130,
  },
});

export default RecycleScreen;
