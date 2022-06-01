import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  FlatList,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { BackHandler } from "react-native";

import AppButton from "../components/AppButton";
import Screen from "../components/Screen";
import colors from "../config/colors";
import usefetchYearlyRecycleData from "../hooks/usefetchYearlyRecycleData";
import ListItemSeparator from "../components/ListItemSeparator";

function YearlyReportScreen({ navigation }) {
  const chooky = usefetchYearlyRecycleData();
  const userImage = chooky.userImage;
  const userName = chooky.userName;
  const userEmail = chooky.userEmail;
  const recycleHistoryMap = chooky.recycleHistoryMap;
  const totalScore = chooky.totalScore;
  const totalItemsRecycled = chooky.totalItemsRecycled;
  const totalYearlyItemsRecycled = chooky.totalYearlyItemsRecycled;
  const totalYearlyScore = chooky.totalYearlyScore;
  const itemRecycleHistoryMap = chooky.itemRecycleHistoryMap;

  const handleBackButtonClick = () => {
    navigation.navigate("Home");
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
    <>
      <Screen>
        <View style={styles.container}>
          <StatusBar backgroundColor={colors.white} />
          <View style={styles.profileImageContainer}>
            {userImage === "" ? (
              <View style={styles.whenProfileImageAbsent}></View>
            ) : (
              <View style={styles.whenProfileImagePresent}>
                <ImageBackground
                  source={{ uri: userImage }}
                  style={styles.profileImage}
                ></ImageBackground>
              </View>
            )}
            <Text style={styles.userNameText}>{userName}</Text>
            <Text style={styles.userEmailText}>{userEmail}</Text>
          </View>
          <View style={styles.numbersDashboard}>
            <View style={styles.numberDashboardLabels}>
              <Text style={styles.dashboardText}>{totalScore}</Text>
              <Text style={styles.dashboardTextLabel}>Total Score</Text>
            </View>
            <View>
              <Text style={styles.dashboardText}>{totalItemsRecycled}</Text>
              <Text style={styles.dashboardTextLabel}>
                Total Items Recycled
              </Text>
            </View>
          </View>
          <View style={styles.DailyDashboard}>
            <View>
              <Text style={styles.dashboardText}>{totalYearlyScore}</Text>
              <Text style={styles.dashboardTextLabel}>Yearly Score</Text>
            </View>
            <View>
              <Text style={styles.dashboardText}>
                {totalYearlyItemsRecycled}
              </Text>
              <Text style={styles.dashboardTextLabel}>
                Yearly Items Recycled
              </Text>
            </View>
          </View>
          {recycleHistoryMap.length < 1 ? (
            <View style={styles.nothing}>
              <Image
                source={require("../assets/NoDataRecycleImage.png")}
                style={styles.NoDataImage}
              ></Image>
              <Text style={styles.NoDataText}>
                Seems like you did not recycle anything this month!
              </Text>
            </View>
          ) : (
            <View style={styles.whenRecycleDataPresent}>
              <Text
                style={{
                  marginBottom: 10,
                  textAlign: "center",
                  backgroundColor: colors.primary,
                  color: colors.white,
                  fontWeight: "bold",
                }}
              >
                Recycle History
              </Text>
              <View style={{ height: "42%", width: "100%" }}>
                <FlatList
                  data={recycleHistoryMap}
                  keyExtractor={(item) => item.month.toString()}
                  contentContainerStyle={styles.flatListView}
                  renderItem={({ item }) => (
                    <View style={styles.ruleTextContainer}>
                      <View>
                        <Text
                          style={{
                            fontSize: 15,
                            color: colors.black,
                          }}
                        >
                          {item.month}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: colors.dashboardLabelColor,
                          }}
                        >
                          Month
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontSize: 15,
                            color: colors.black,
                            textAlign: "center",
                          }}
                        >
                          {item.MonthlyTotalNumberOfItemsRecycled}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: colors.dashboardLabelColor,
                            textAlign: "center",
                          }}
                        >
                          Items Recycled
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontSize: 15,
                            color: colors.black,
                            textAlign: "center",
                          }}
                        >
                          {item.TotalMonthlyScore}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: colors.dashboardLabelColor,
                            textAlign: "center",
                          }}
                        >
                          Points
                        </Text>
                      </View>
                    </View>
                  )}
                  ItemSeparatorComponent={ListItemSeparator}
                ></FlatList>
              </View>
              <Text
                style={{
                  marginBottom: 10,
                  marginTop: 10,
                  textAlign: "center",
                  backgroundColor: colors.primary,
                  color: colors.white,
                  fontWeight: "bold",
                }}
              >
                Item Recycle History
              </Text>
              <View style={{ height: "42%", width: "100%" }}>
                <FlatList
                  data={itemRecycleHistoryMap}
                  keyExtractor={(item) => item.category.toString()}
                  contentContainerStyle={styles.flatListView}
                  renderItem={({ item }) => (
                    <View style={styles.ruleTextContainer}>
                      <View>
                        <Text
                          style={{
                            fontSize: 15,
                            color: colors.black,
                          }}
                        >
                          {item.category}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: colors.dashboardLabelColor,
                          }}
                        >
                          Category
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontSize: 15,
                            color: colors.black,
                            textAlign: "center",
                          }}
                        >
                          {item.count}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: colors.dashboardLabelColor,
                            textAlign: "center",
                          }}
                        >
                          Count
                        </Text>
                      </View>
                    </View>
                  )}
                  ItemSeparatorComponent={ListItemSeparator}
                ></FlatList>
              </View>
            </View>
          )}
          <View>
            <AppButton
              title="Start Recycling"
              fontSize={15}
              padding={10}
              onPress={() => navigation.navigate("Recycle")}
            ></AppButton>
          </View>
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 10,
  },
  numbersDashboard: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    marginBottom: 5,
  },
  DailyDashboard: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 15,
  },
  profileImageContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  whenProfileImageAbsent: {
    backgroundColor: "silver",
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  whenProfileImagePresent: {
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 40,
    overflow: "hidden",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  flatListView: {
    overflow: "scroll",
  },
  ruleTextContainer: {
    padding: 5,
    alignContent: "center",
    justifyContent: "space-between",
    marginRight: 10,
    flexDirection: "row",
    flex: 1,
  },
  nothing: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  NoDataImage: {
    height: 200,
    width: 150,
  },
  NoDataText: {
    color: colors.dashboardLabelColor,
  },
  dashboardText: {
    textAlign: "center",
    fontSize: 15,
    color: colors.black,
    fontWeight: "bold",
  },
  dashboardTextLabel: {
    textAlign: "center",
    color: colors.dashboardLabelColor,
    fontSize: 13,
  },
  userNameText: {
    fontSize: 15,
    color: colors.black,
  },
  userEmailText: {
    fontSize: 13,
    color: colors.dashboardLabelColor,
  },
  whenRecycleDataPresent: {
    flex: 1,
    width: "100%",
  },
});

export default YearlyReportScreen;
