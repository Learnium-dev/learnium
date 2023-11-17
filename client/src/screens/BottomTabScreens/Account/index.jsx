import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Flame from "../../../../assets/icons/fireIcon.svg";
import { styles } from "../Daily/styles/indexStyles";
import { profileOptions } from "../../../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setToken } from "../../../../slices/credentialsSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirstName } from "../../../services/userService";
import { getLastName } from "../../../services/userService";

const Profile = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [buttonStates, setButtonStates] = useState(
    profileOptions.map(() => ({
      isToggled: false,
    }))
  );

  useEffect(() => {
    // Get token
    AsyncStorage.getItem("jwt").then((token) => {
      if (token) {
        dispatch(setToken(token));

        // Get email
        AsyncStorage.getItem("email").then((email) => {
          if (email) {
            dispatch(setEmail(email));
          }
        });
      }
    });
    loadUserFirstName();
    loadUserLastName();
  }, []);

  const loadUserFirstName = async () => {
    getFirstName().then(
      (firstName) => {
        console.log("First name loaded", firstName);
        setFirstName(firstName);
        setIsFirstNameLoaded(true);
      },
      (error) => {
        alert("Error", `Couldn't load user's first name! ${error}`);
      }
    );
  };
    const loadUserLastName = async () => {
      getLastName().then(
        (lastName) => {
          console.log("Last name loaded", lastName);
          setLastName(lastName);
          setIsLastNameLoaded(true);
        },
        (error) => {
          alert("Error", `Couldn't load user's last name! ${error}`);
        }
      );
    };

  const toggleButtons = (index) => {
    setButtonStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = {
        isToggled: !newStates[index].isToggled,
      };
      return newStates;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 20,
          paddingBottom: 50,
        }}
      >
        <View>
          <Text style={styles.title}>Profile</Text>
        </View>

        {/* Banner */}
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          {/* Avatar */}
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 120,
              height: 120,
            }}
          >
            <View
              style={{
                width: 90,
                height: 90,
                borderRadius: 100,
                overflow: "hidden",
                backgroundColor: "#FEE702",
              }}
            >
              <Image
                source={require("../../../../assets/images/characters/lumi_profile.png")}
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 100,
                  position: "absolute",
                  top: -50,
                  left: -50,
                  transform: [{ scale: 0.5 }],
                }}
              />
            </View>
            <Flame
              width={30}
              height={30}
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                transform: [{ translateX: 10 }],
              }}
            />
            <Text
              style={{
                fontFamily: "Nunito-Bold",
                fontSize: 16,
                position: "absolute",
                bottom: 0,
                right: 0,
                transform: [{ translateX: -20 }],
              }}
            >
              7
            </Text>
          </View>
          {/* User name */}
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "Gabarito-Bold",
                fontSize: 26,
                color: "#262626",
                marginBottom: 5,
              }}
            >
              {firstName || "User"} {lastName ? ` ${lastName}` : ""}
            </Text>
            <Text
              style={{
                fontFamily: "Nunito-Bold",
                fontSize: 14,
                color: "#262626",
              }}
            >
              Joined on 10/02/2023
            </Text>
          </View>
        </View>

        {/* User Options */}
        {profileOptions.map((item, index) => {
          const dynamicMarginTop =
            index === profileOptions.length - 1 ? 55 : 12;
          const isToggled = buttonStates[index].isToggled;
          return (
            <TouchableOpacity
              onPress={() => toggleButtons(index)}
              key={index}
              style={{
                ...styles.dailyBox,
                borderColor: isToggled ? "#7000FF" : "#E8E8E8",
                backgroundColor: isToggled ? "#7000FF" : "#f5f5f5",
                marginTop: dynamicMarginTop,
                marginBottom: 0,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  ...styles.userOption,
                  color: isToggled ? "#fff" : "#262626",
                }}
              >
                {item}
              </Text>
              <Ionicons
                name="ios-chevron-forward"
                size={24}
                color={isToggled ? "#fff" : "#262626"}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
