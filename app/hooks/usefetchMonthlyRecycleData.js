import React, { useEffect, useContext, useState } from "react";

import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import fetchUserProfile from "../utility/fetchUserProfile";

const usefetchMonthlyRecycleData = () => {
  const { user } = useContext(AuthenticatedUserContext);
  const [userImage, setUserImage] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [recyclingActivity, setRecyclingactivity] = useState([]);
  const [recycleHistoryMap, setRecycleHistoryMap] = useState([]);
  const [itemRecycleHistoryMap, setItemRecycleHistoryMap] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [totalItemsRecycled, setTotalItemsRecycled] = useState(0);
  const [totalMonthlyScore, setTotalMonthlyScore] = useState(0);
  const [totalMonthlyItemsRecycled, setTotalMonthlyItemsRecycled] = useState(0);
  const [insufficientMonthDataError, setInsufficientMonthDataError] =
    useState();

  const fetch = () => {
    const something = fetchUserProfile.getDocumentFromFirestore(user.uid);
    something.then((value) => {
      setUserImage(value.userImage);
      setUserName(value.name);
      setUserEmail(value.email);
      setRecyclingactivity(value.recycleActivity);
    });
  };

  const prepareMonthlyData = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    let monthlyData = [];
    let infoData = [];
    var yearMap = recyclingActivity[currentYear];
    if (yearMap) {
      var monthMap = yearMap[currentMonth];
      if (monthMap) {
        setTotalMonthlyItemsRecycled(
          monthMap["MonthlyTotalNumberOfItemsRecycled"]
        );
        setTotalMonthlyScore(monthMap["TotalMonthlyScore"]);
        let index2 = 0;
        for (var entry in monthMap) {
          if (
            entry == "Activity" ||
            entry == "MonthlyTotalNumberOfItemsRecycled" ||
            entry == "TotalMonthlyScore"
          ) {
            continue;
          } else {
            var obj = new Object();
            obj.category = entry;
            obj.count = monthMap[entry];
            infoData[index2] = obj;
            index2++;
          }
        }
        setItemRecycleHistoryMap(infoData);
        var activityMap = monthMap["Activity"];
        if (activityMap) {
          let index = 0;
          for (var entry in activityMap) {
            var obj = new Object();
            var dateMap = activityMap[entry];
            obj.date = entry;
            obj.DailyTotalNumberOfItemsRecycled =
              dateMap["DailyTotalNumberOfItemsRecycled"];
            obj.TotalDailyScore = dateMap["TotalDailyScore"];
            monthlyData[index] = obj;
            index++;
          }
          setRecycleHistoryMap(monthlyData);
        } else {
          // no data for activity map
          setInsufficientMonthDataError(
            "Not sufficient data for displaying stats!"
          );
        }
      } else {
        // no data for month
        setInsufficientMonthDataError(
          "Not sufficient data for displaying stats!"
        );
      }
    } else {
      // No data for year
      setInsufficientMonthDataError(
        "Not sufficient data for displaying stats!"
      );
    }
    getOtherData();
  };

  const getOtherData = () => {
    setTotalScore(recyclingActivity["TotalScore"]);
    setTotalItemsRecycled(recyclingActivity["TotalNumberOfItemsRecycled"]);
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(
    () => userEmail && userName && recyclingActivity && prepareMonthlyData(),
    [(userEmail, userImage, userName, recyclingActivity)]
  );
  return {
    recycleHistoryMap,
    userEmail,
    userName,
    userImage,
    totalScore,
    totalItemsRecycled,
    totalMonthlyItemsRecycled,
    totalMonthlyScore,
    itemRecycleHistoryMap,
  };
};

export default usefetchMonthlyRecycleData;
