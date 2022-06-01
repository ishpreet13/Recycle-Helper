import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import "firebase/storage";
import { getFunctions, httpsCallable } from "firebase/functions";

import AppButton from "../components/AppButton";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import ActivityIndicator from "../components/ActivityIndicator";
import Screen from "../components/Screen";

const functions = getFunctions();
const RecycleHelper = httpsCallable(
  functions,
  "RecycleHelperPredictionFunction"
);

function UploadScreen({ route, navigation }) {
  const { imagePath } = route.params;
  const [loading, setLoading] = useState(false);

  const onUploadToBucket = async () => {
    try {
      const arraysplit = JSON.stringify(imagePath).split("/");
      const destinationImageNameArray =
        arraysplit[arraysplit.length - 1].split(".");
      const response = await fetch(imagePath);
      const blob = await response.blob();
      const storage = getStorage();
      const timestamp = Date.now();
      const destinationImageName = destinationImageNameArray[0] + timestamp;
      const imageRef = ref(storage, `Images/${destinationImageName}.jpg`);
      setLoading(true);
      uploadBytes(imageRef, blob).then((snapshot) => {
        console.log("Uploaded a blob or file!");
        RecycleHelper({
          image: `https://firebasestorage.googleapis.com/v0/b/recyclehelper-26d6b.appspot.com/o/Images%2F${destinationImageName}.jpg?alt=media`,
        })
          .then((result) => {
            //Read the result of the cloud function
            const data = result.data;
            const predictedCategory = data.prediction;
            setLoading(false);
            navigation.navigate("Prediction", {
              predictedCategory: predictedCategory,
            });
          })
          .catch((error) => {
            //Getting error details
            const code = error.code;
            const message = error.message;
            const details = error.details;
          });
      });
    } catch (error) {
      console.log("Error message", error.message);
    }
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen>
        <View style={styles.container}>
          <Image source={{ uri: imagePath }} style={styles.thumbnail} />
          <View style={styles.buttonContainer}>
            <AppButton title="Check" onPress={onUploadToBucket}></AppButton>
          </View>
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {},
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  thumbnail: {
    alignSelf: "center",
    width: "80%",
    height: "50%",
    marginBottom: 30,
  },
});

export default UploadScreen;
