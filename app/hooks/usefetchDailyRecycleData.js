import React, { useEffect, useContext, useState } from "react";

import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import fetchUserProfile from "../utility/fetchUserProfile";

const usefetchDailyRecycleData = () => {
  const { user } = useContext(AuthenticatedUserContext);
  const [userImage, setUserImage] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [recyclingActivity, setRecyclingactivity] = useState([]);
  const [dataMap, setDataMap] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [totalItemsRecycled, setTotalItemsRecycled] = useState(0);
  const [totalDailyScore, setTotalDailyScore] = useState(0);
  const [totalDailyItemsRecycled, setTotalDailyItemsRecycled] = useState(0);
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

  const prepareDailyData = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDate = today.getDate();
    let dailyData = [];
    console.log("recycle activity ", recyclingActivity);
    var yearMap = recyclingActivity[currentYear];
    if (yearMap) {
      var monthMap = yearMap[currentMonth];
      if (monthMap) {
        var activityMap = monthMap["Activity"];
        if (activityMap) {
          var dateMap = activityMap[currentDate];
          if (dateMap) {
            setTotalDailyItemsRecycled(
              dateMap["DailyTotalNumberOfItemsRecycled"]
            );
            setTotalDailyScore(dateMap["TotalDailyScore"]);
            var timestampMap = dateMap["TimestampInfo"];
            let index = 0;
            for (var entry in timestampMap) {
              var obj = new Object();
              obj.timestamp = entry;
              var map = timestampMap[entry];
              obj.category = map["category"];
              obj.score = map["score"];
              dailyData[index] = obj;
              index++;
            }
            setDataMap(dailyData);
          } else {
            setInsufficientMonthDataError(
              "Not sufficient data for displaying stats!"
            );
          }
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
    () => userEmail && userName && recyclingActivity && prepareDailyData(),
    [(userEmail, userImage, userName, recyclingActivity)]
  );
  return {
    dataMap,
    userEmail,
    userName,
    userImage,
    totalScore,
    totalItemsRecycled,
    totalDailyItemsRecycled,
    totalDailyScore,
  };
};

export default usefetchDailyRecycleData;
