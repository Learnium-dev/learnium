import { Platform } from "react-native";

let baseURL = "";

{
  Platform.OS == "android"
    ? (baseURL = "http://localhost:3000/api/v1/")
    : (baseURL = "http://localhost:3000/api/v1/");
}

export default baseURL;
