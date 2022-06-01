import { useEffect, useContext, useState } from "react";

import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import fetchUserProfile from "../utility/fetchUserProfile";

const usefetchUserGoalData = () => {
  const { user } = useContext(AuthenticatedUserContext);
  const [userImage, setUserImage] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [recyclingActivity, setRecyclingactivity] = useState([]);
  const [userGoal, setUserGoal] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [totalItemsRecycled, setTotalItemsRecycled] = useState(0);
  const [totalMonthlyScore, setTotalMonthlyScore] = useState(0);
  const [totalMonthlyItemsRecycled, setTotalMonthlyItemsRecycled] = useState(0);
  const [targetGoal, setTargetGoal] = useState(0);
  const [currentGoal, setCurrentGoal] = useState(0);
  const [insufficientMonthDataError, setInsufficientMonthDataError] =
    useState();

  const fetch = () => {
    const something = fetchUserProfile.getDocumentFromFirestore(user.uid);
    something.then((value) => {
      setUserImage(value.userImage);
      setUserName(value.name);
      setUserEmail(value.email);
      setRecyclingactivity(value.recycleActivity);
      setUserGoal(value.goal);
    });
  };

  const prepareMonthlyData = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    var yearMap = recyclingActivity[currentYear];
    if (yearMap) {
      var monthMap = yearMap[currentMonth];
      if (monthMap) {
        setTotalMonthlyItemsRecycled(
          monthMap["MonthlyTotalNumberOfItemsRecycled"]
        );
        setTotalMonthlyScore(monthMap["TotalMonthlyScore"]);
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
    var goalYearMap = userGoal[currentYear];
    if (goalYearMap) {
      var goalMonthMap = goalYearMap[currentMonth];
      if (goalMonthMap) {
        setCurrentGoal(goalMonthMap["Current"]);
        setTargetGoal(goalMonthMap["Target"]);
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
    () =>
      userEmail &&
      userName &&
      recyclingActivity &&
      userGoal &&
      prepareMonthlyData(),
    [(userEmail, userName, recyclingActivity, userGoal)]
  );
  return {
    userEmail,
    userName,
    userImage,
    totalMonthlyItemsRecycled,
    totalMonthlyScore,
    targetGoal,
    currentGoal,
    totalScore,
    totalItemsRecycled,
  };
};

export default usefetchUserGoalData;
