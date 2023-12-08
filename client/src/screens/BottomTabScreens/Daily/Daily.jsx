// React Native
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Pressable,
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

const Daily = () => {
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
        <View>
          <Text style={styles.title}>Daily Challenge</Text>
        </View>

        {/* Banner */}
        <View style={styles.banner}>
          <LumiStreak width={190} height={190} />
          <View style={styles.streakBox}>
            <Text style={styles.titleStreak}>7</Text>
            <Text style={styles.subtitleStreak}>day streak!</Text>
          </View>
        </View>

        {/* Daily Options */}
        <TouchableOpacity
          style={styles.dailyBox}
          onPress={() => navigate("DailyQuestion")}
        >
          <Text style={styles.dailyTitle}>Daily Question</Text>
          <Text style={styles.dailyText}>
            Increase your day streak by answering today's question!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dailyBox}>
          <Text style={styles.dailyTitle}>Daily Fact</Text>
          <Text style={styles.dailyText}>
            Learn something new today by discovering a new daily fact.
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Daily;
