import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Pressable,
  Linking,
  TouchableOpacity,
} from "react-native";
import "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import {
  doc,
  setDoc,
  getFirestore,
  updateDoc,
  increment,
} from "firebase/firestore";
import { BackHandler } from "react-native";

import fetchInstructions from "../utility/fetchInstructions";
import fetchNewInstructions from "../utility/fetchNewInstructions";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import usefetchUserGoalData from "../hooks/usefetchUserGoalData";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import Styles from "../config/Styles";
import colors from "../config/colors";
import Weblinks from "../config/Weblinks";

function InstructionsScreen({ route, navigation }) {
  const { user } = useContext(AuthenticatedUserContext);
  const chooky = usefetchUserGoalData();
  const targetGoal = chooky.targetGoal;
  const { documentName } = route.params;
  const [rules, setRules] = useState([]);
  const [link, setLink] = useState("");
  const [selectAllCheckBox, setSelectAllCheckBox] = useState(false);

  useEffect(() => {
    const something =
      fetchNewInstructions.getDocumentFromFirestore(documentName);
    something.then((value) => {
      setRules(value.instructionsMap);
      setLink(value.link);
    });
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  const handleBackButtonClick = () => {
    navigation.navigate("Recycle");
    return true;
  };

  function CheckBox({ id, value }) {
    const [checked, onChange] = useState(value);
    const checkBoxId = id;

    function onCheckmarkPress() {
      onChange(!checked);
      console.log("checkbox id is :", checkBoxId);
    }
    return (
      <Pressable
        style={[styles.checkBoxBase, checked && styles.checkBoxChecked]}
        onPress={() => {
          handleCheckbox(checkBoxId);
          onCheckmarkPress();
        }}
      >
        {checked && <Ionicons name="checkmark" size={24} color={"white"} />}
      </Pressable>
    );
  }

  function SelectAllCheckBox() {
    const checkBoxId = 0;
    function onCheckmarkPress() {
      if (selectAllCheckBox == false) {
        rules.map((rlitem) => {
          rlitem.isChecked = true;
        });
      }
      if (selectAllCheckBox == true) {
        rules.map((rlitem) => {
          rlitem.isChecked = false;
        });
      }
    }
    return (
      <Pressable
        style={[
          styles.checkBoxBase,
          selectAllCheckBox && styles.checkBoxChecked,
        ]}
        onPress={() => {
          setSelectAllCheckBox(!selectAllCheckBox);
          onCheckmarkPress();
        }}
      >
        {selectAllCheckBox && (
          <Ionicons name="checkmark" size={24} color={"white"} />
        )}
      </Pressable>
    );
  }

  const handleCheckbox = (id) => {
    rules.map((rlitem) => {
      if (id === rlitem.id) {
        rlitem.isChecked = !rlitem.isChecked;
      }
    });
  };
  const handleSubmit = () => {
    let selectedCheckBox = rules.filter((rlitem) => rlitem.isChecked);
    const score = selectedCheckBox.length;
    if (score <= 0) {
      alert("Please check off atleast one step that you followed!");
    } else {
      const today = new Date();
      var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const dayNumber = today.getDate();
      if (targetGoal == 0) {
        sendInfoToFirestore(year, month, score, dayNumber, time);
      } else {
        sendInfoToFirestoreAndUpdateGoal(year, month, score, dayNumber, time);
      }
      navigation.navigate("Congratulations");
    }
  };
  const sendInfoToFirestore = async (year, month, score, dayNumber, time) => {
    const db = getFirestore();
    const docref = doc(db, "UserInfo", user.uid);
    try {
      setDoc(
        docref,
        {
          recycleActivity: {
            [year]: {
              [month]: {
                Activity: {
                  [dayNumber]: {
                    TimestampInfo: {
                      [time]: {
                        score: score,
                        category: documentName.toString(),
                      },
                    },
                    TotalDailyScore: increment(score),
                    DailyTotalNumberOfItemsRecycled: increment(1),
                    [documentName]: increment(1),
                  },
                },
                TotalMonthlyScore: increment(score),
                MonthlyTotalNumberOfItemsRecycled: increment(1),
                [documentName]: increment(1),
              },
              TotalYearlyScore: increment(score),
              YearlyTotalNumberOfItemsRecycled: increment(1),
              [documentName]: increment(1),
            },
            TotalScore: increment(score),
            TotalNumberOfItemsRecycled: increment(1),
            [documentName]: increment(1),
          },
        },
        { merge: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const sendInfoToFirestoreAndUpdateGoal = async (
    year,
    month,
    score,
    dayNumber,
    time
  ) => {
    const db = getFirestore();
    const docref = doc(db, "UserInfo", user.uid);
    try {
      setDoc(
        docref,
        {
          recycleActivity: {
            [year]: {
              [month]: {
                Activity: {
                  [dayNumber]: {
                    TimestampInfo: {
                      [time]: {
                        score: score,
                        category: documentName.toString(),
                      },
                    },
                    TotalDailyScore: increment(score),
                    DailyTotalNumberOfItemsRecycled: increment(1),
                    [documentName]: increment(1),
                  },
                },
                TotalMonthlyScore: increment(score),
                MonthlyTotalNumberOfItemsRecycled: increment(1),
                [documentName]: increment(1),
              },
              TotalYearlyScore: increment(score),
              YearlyTotalNumberOfItemsRecycled: increment(1),
              [documentName]: increment(1),
            },
            TotalScore: increment(score),
            TotalNumberOfItemsRecycled: increment(1),
            [documentName]: increment(1),
          },
          goal: {
            [year]: {
              [month]: {
                Current: increment(1),
              },
            },
          },
        },
        { merge: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={Styles.heading}>
            Recycle Instructions for {documentName}
          </Text>
        </View>
        <View
          style={{
            alignSelf: "flex-start",
            marginLeft: 10,
            marginBottom: 5,
            flexDirection: "row",
          }}
        >
          <SelectAllCheckBox />
          {selectAllCheckBox == true ? (
            <Text
              style={{
                marginLeft: 10,
                fontSize: 15,
                color: colors.primary,
                fontWeight: "bold",
              }}
            >
              Unselect All
            </Text>
          ) : (
            <Text
              style={{
                marginLeft: 10,
                fontSize: 15,
                color: colors.primary,
                fontWeight: "bold",
              }}
            >
              Select All
            </Text>
          )}
        </View>
        <FlatList
          data={rules}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListView}
          renderItem={({ item }) => (
            <View style={styles.ruleContainer}>
              <View style={styles.checkBoxContainer}>
                {selectAllCheckBox == true ? (
                  <CheckBox value={selectAllCheckBox} id={item.id} />
                ) : (
                  <CheckBox value={item.isChecked} id={item.id} />
                )}
              </View>
              <View style={styles.ruleTextContainer}>
                <Text style={[styles.content, Styles.text]}>{item.rule}</Text>
              </View>
            </View>
          )}
        ></FlatList>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              margin: 10,
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => Linking.openURL(Weblinks.recycleLocator)}
            >
              <Ionicons name="search" size={24} color="black" />
            </TouchableOpacity>
            <Text style={{ color: "grey" }}>Recycling Locator</Text>
          </View>
          {link == "" ? (
            <View
              style={{
                margin: 10,
                flexDirection: "column",
                alignItems: "center",
              }}
            ></View>
          ) : (
            <View
              style={{
                margin: 10,
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={() => Linking.openURL(link)}>
                <Ionicons name="information-outline" size={24} color="black" />
              </TouchableOpacity>
              <Text style={{ color: "grey" }}>Additional Information</Text>
            </View>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <AppButton title="submit" onPress={handleSubmit}></AppButton>
        </View>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
  },
  checkBoxBase: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: "transparent",
  },
  checkBoxChecked: {
    backgroundColor: colors.primary,
  },
  checkBoxContainer: {
    padding: 5,
    alignContent: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
  },
  content: {
    flexWrap: "wrap",
    paddingRight: 10,
    textAlign: "justify",
    lineHeight: 20,
  },
  flatListView: {
    overflow: "scroll",
  },
  heading: {
    marginBottom: 20,
    paddingLeft: 2,
    paddingRight: 2,
  },
  ruleContainer: {
    flexDirection: "row",
    flex: 1,
    padding: 5,
    alignContent: "center",
    marginRight: 10,
    paddingRight: 10,
  },
  ruleTextContainer: {
    padding: 5,
    alignContent: "center",
    justifyContent: "center",
    marginRight: 10,
  },
});

export default InstructionsScreen;
