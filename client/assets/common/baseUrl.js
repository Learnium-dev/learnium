import { Platform } from "react-native";


console.log("EXPO_PUBLIC_HOSTNAME", process.env.EXPO_PUBLIC_HOSTNAME)
// Please type here your IP from Expo
// let myExpoIP = '10.128.218.7'; // <-- Enter here your Expo IP without PORT, either Android or iOS

let baseURL = `http://${process.env.EXPO_PUBLIC_HOSTNAME}:3000/api/v1/`; // <-- Check if server is running on port 3000, otherwise change here the PORT
// let baseURL = `http://${process.env.EXPO_PUBLIC_HOSTNAME}:3000/api/v1/`; // <-- Check if server is running on port 3000, otherwise change here the PORT
// let baseURL = `http://${myExpoIP}:3000/api/v1/`; // <-- Check if server is running on port 3000, otherwise change here the PORT

console.log("baseURL", baseURL)

// let baseURL =
//   Platform.OS == "android"
//     ? (baseURL = `${process.env.EXPO_PUBLIC_HOSTNAME}/api/v1/`) // <----- Type here you IP if you are using Android
//     : (baseURL = `${process.env.EXPO_PUBLIC_HOSTNAME}/api/v1/`); // <----- Type here you IP if you are using iOS

export default baseURL;
