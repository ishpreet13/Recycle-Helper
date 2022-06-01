import { Platform } from "react-native";

import colors from "./colors";

export default {
  text: {
    color: "#696969",
    fontSize: 15,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  heading: {
    margin: 10,
    color: colors.primary,
    fontSize: 22,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
    textAlign: "center",
  },
};
