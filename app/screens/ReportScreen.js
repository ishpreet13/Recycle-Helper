import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  FlatList,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import AppButton from "../components/AppButton";
import Screen from "../components/Screen";
import colors from "../config/colors";
import usefetchDailyRecycleData from "../hooks/usefetchDailyRecycleData";
import ListItemSeparator from "../components/ListItemSeparator";

function ReportScreen({ navigation }) {
  const chook = usefetchDailyRecycleData();
  const userImage = chook.userImage;
  const userName = chook.userName;
  const userEmail = chook.userEmail;
  const dataMap = chook.dataMap;
  const totalScore = chook.totalScore;
  const totalItemsRecycled = chook.totalItemsRecycled;
  const totalDailyItemsRecycled = chook.totalDailyItemsRecycled;
  const totalDailyScore = chook.totalDailyScore;

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
            <View style={styles.numberDashboardLabels}>
              <Text style={styles.dashboardText}>{totalDailyScore}</Text>
              <Text style={styles.dashboardTextLabel}>Today's Score</Text>
            </View>
            <View>
              <Text style={styles.dashboardText}>
                {totalDailyItemsRecycled}
              </Text>
              <Text style={styles.dashboardTextLabel}>
                Items Recycled Today
              </Text>
            </View>
          </View>
          {dataMap.length < 1 ? (
            <View style={styles.nothing}>
              <Image
                source={require("../assets/NoDataRecycleImage.png")}
                style={styles.NoDataImage}
              ></Image>
              <Text style={styles.NoDataText}>
                Seems like you did not recycle anything today!
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
              <FlatList
                data={dataMap}
                keyExtractor={(item) => item.timestamp.toString()}
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
                          color: colors.placeHolderTextColor,
                        }}
                      >
                        {item.timestamp.toString()}
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
                        {item.score}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: colors.placeHolderTextColor,
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

export default ReportScreen;
