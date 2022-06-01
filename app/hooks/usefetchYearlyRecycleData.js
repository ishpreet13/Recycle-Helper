import React, { useEffect, useContext, useState } from "react";

import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import fetchUserProfile from "../utility/fetchUserProfile";

const usefetchYearlyRecycleData = () => {
  const { user } = useContext(AuthenticatedUserContext);
  const [userImage, setUserImage] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [recyclingActivity, setRecyclingactivity] = useState([]);
  const [recycleHistoryMap, setRecycleHistoryMap] = useState([]);
  const [itemRecycleHistoryMap, setItemRecycleHistoryMap] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [totalItemsRecycled, setTotalItemsRecycled] = useState(0);
  const [totalYearlyScore, setTotalYearlyScore] = useState(0);
  const [totalYearlyItemsRecycled, setTotalYearlyItemsRecycled] = useState(0);
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
      setTotalYearlyItemsRecycled(yearMap["YearlyTotalNumberOfItemsRecycled"]);
      setTotalYearlyScore(yearMap["TotalYearlyScore"]);
      let index2 = 0;
      let index3 = 0;
      for (var entry in yearMap) {
        if (
          entry == "1" ||
          entry == "2" ||
          entry == "3" ||
          entry == "4" ||
          entry == "5" ||
          entry == "6" ||
          entry == "7" ||
          entry == "8" ||
          entry == "9" ||
          entry == "10" ||
          entry == "11" ||
          entry == "12"
        ) {
          var monthMap = yearMap[entry];
          var obj = new Object();
          obj.month = entry;
          obj.MonthlyTotalNumberOfItemsRecycled =
            monthMap["MonthlyTotalNumberOfItemsRecycled"];
          obj.TotalMonthlyScore = monthMap["TotalMonthlyScore"];
          monthlyData[index3] = obj;
          index3++;
        } else if (
          entry != "YearlyTotalNumberOfItemsRecycled" &&
          entry != "TotalYearlyScore"
        ) {
          var obj = new Object();
          obj.category = entry;
          obj.count = yearMap[entry];
          infoData[index2] = obj;
          index2++;
        } else {
          continue;
        }
      }
      setItemRecycleHistoryMap(infoData);
      setRecycleHistoryMap(monthlyData);
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
    totalYearlyItemsRecycled,
    totalYearlyScore,
    itemRecycleHistoryMap,
  };
};

export default usefetchYearlyRecycleData;
