import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#ffffff",
    primary: "#000000",
    mainBackground: "#e1e4e8",
    repositoryItemBackground: "white",
    languageTag: "#0366d6",
    button: "#0366d6",
    error: "#d73a4a",
    delete: "#ff3232",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    header: 30,
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
};

export default theme;
