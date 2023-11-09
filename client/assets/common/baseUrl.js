import { Platform } from "react-native";

// Please type here your IP from Expo
let myExpoIP = '192.168.1.77'; // <-- Enter here your Expo IP without PORT, either Android or iOS

let baseURL = `http://${myExpoIP}:3000/api/v1/`; // <-- Check if server is running on port 3000, otherwise change here the PORT

// let baseURL =
//   Platform.OS == "android"
//     ? (baseURL = `${process.env.EXPO_PUBLIC_HOSTNAME}/api/v1/`) // <----- Type here you IP if you are using Android
//     : (baseURL = `${process.env.EXPO_PUBLIC_HOSTNAME}/api/v1/`); // <----- Type here you IP if you are using iOS

export default baseURL;
