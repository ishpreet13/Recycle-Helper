import fetchUserProfile from "../utility/fetchUserProfile";

const fetchUserGoalData = async (userID) => {
  var userImage = "";
  var userName = "";
  var userEmail = "";
  var recyclingActivity = [];
  var userGoal = [];
  var totalScore = 0;
  var totalItemsRecycled = 0;
  var totalMonthlyScore = 0;
  var totalMonthlyItemsRecycled = 0;
  var targetGoal = 0;
  var currentGoal = 0;

  try {
    const something = await fetchUserProfile.getDocumentFromFirestore(userID);
    userImage = something.userImage;
    userName = something.name;
    userEmail = something.email;
    recyclingActivity = something.recycleActivity;
    userGoal = something.goal;
  } catch (error) {
    console.log("error", error);
  }
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  var yearMap = recyclingActivity[currentYear];
  if (yearMap) {
    var monthMap = yearMap[currentMonth];
    if (monthMap) {
      totalMonthlyItemsRecycled = monthMap["MonthlyTotalNumberOfItemsRecycled"];
      totalMonthlyScore = monthMap["TotalMonthlyScore"];
    }
  }
  var goalYearMap = userGoal[currentYear];
  if (goalYearMap) {
    var goalMonthMap = goalYearMap[currentMonth];
    if (goalMonthMap) {
      currentGoal = goalMonthMap["Current"];
      targetGoal = goalMonthMap["Target"];
    }
  }
  totalScore = recyclingActivity["TotalScore"];
  totalItemsRecycled = recyclingActivity["TotalNumberOfItemsRecycled"];

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

export default { fetchUserGoalData };
