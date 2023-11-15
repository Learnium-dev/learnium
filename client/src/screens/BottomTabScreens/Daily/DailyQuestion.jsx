// React Native
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";

// React
import { useState, useEffect, useRef } from "react";

// React Navigation
import { useNavigation } from "@react-navigation/native";

// Components

// Styles
import { styles } from "./styles/indexStyles";

// SVGs
import LumiStreak from "../../../../assets/images/characters/daily/lumiStreak.svg";
import ArrowBack from "../../../../assets/icons/arrow_back.svg";
import { Ionicons } from "@expo/vector-icons";

const DailyQuestion = () => {
  const { navigate } = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 20,
          paddingBottom: 50,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          <ArrowBack width={30} height={30} onPress={() => navigate("Daily")} />
          <Text style={styles.title}>Daily Question</Text>
        </View>

        {/* Banner */}
        <View style={styles.banner}>
          <LumiStreak width={190} height={190} />
          <View style={styles.streakBox}>
            <Text style={styles.titleStreak}>7</Text>
            <Text style={styles.subtitleStreak}>day streak!</Text>
          </View>
        </View>

        {/* Daily Question */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={styles.dailyQuestionBox}>
            {/* header */}
            <View style={styles.dailyHeader}>
              <Ionicons
                name="ios-chevron-back-outline"
                size={24}
                color="white"
              />
              <Text
                style={{
                  color: "white",
                  fontFamily: "Nunito-Bold",
                  fontSize: 14,
                }}
              >
                Dec 5, 2023
              </Text>
              <Ionicons name="ios-chevron-forward" size={24} color="white" />
            </View>

            {/* question */}
            <Text style={styles.question}>
              What were the turning points of World War II and which country was
              responsible?
            </Text>

            {/* answer */}
            <View style={{ width: "100%" }}>
              <TextInput style={styles.answer} placeholder="Type answer here" />
            </View>
          </View>
        </KeyboardAvoidingView>
        {/* study button */}
        <TouchableOpacity
          style={styles.studyButton}
          onPress={() => navigate("StudyHome", { screen: "Study" })}
        >
          <Text style={styles.studyButtonText}>Start Studying</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DailyQuestion;
