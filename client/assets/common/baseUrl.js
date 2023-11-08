import { Platform } from "react-native";

let baseURL =
  Platform.OS == "android"
    ? (baseURL = `${process.env.EXPO_PUBLIC_HOSTNAME}/api/v1/`)
    : (baseURL = `${process.env.EXPO_PUBLIC_HOSTNAME}/api/v1/`);

export default baseURL;
