import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { globalStyles } from "../../assets/common/global-styles";
import TodayHeaderCharacter from "../../assets/images/characters/today-header-character.svg";
import MissedHeaderCharacter from "../../assets/images/characters/missed-header-character.svg";
import ReviewHeaderCharacter from "../../assets/images/characters/review-header-character.svg";

const TodayHeader = ({ selectedView, accentColor }) => {
  const getHeadline = () => {
    switch (selectedView) {
      case "missed":
        return "Uh, oh...";
      case "today":
        return "Ready to learn?";
      case "review":
        return "Let's review!";
      default:
        return "Ready to learn?";
    }
  };

  const getSubHeadline = () => {
    switch (selectedView) {
      case "missed":
        return "Catch up on what you didn't study or explore what you missed yesterday";
      case "today":
        return "Get ready for today's journey into new knowledge and exciting content.";
      case "review":
        return "Let's review some content you've already learned.";
      default:
        return "Get ready for today's journey into new knowledge and exciting content.";
    }
  };

  const getCharacter = () => {
    switch (selectedView) {
      case "missed":
        return <MissedHeaderCharacter />;
      case "today":
        return <TodayHeaderCharacter />;
      case "review":
        return <ReviewHeaderCharacter />;
      default:
        return <TodayHeaderCharacter />;
    }
  };

  return (
    <View style={styles.container}>
      {getCharacter()}
      <View style={{ flex: 1, width: "auto" }}>
        <View style={{ ...styles.bubble, backgroundColor: accentColor }}>
          <Text style={styles.headline}>{getHeadline()}</Text>
          <Text style={styles.subHeadline}>{getSubHeadline()}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    maxWidth: "100%",
    flexDirection: "row",
    alignItems: "start",
  },
  bubble: {
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 10,
    padding: 20,
    maxWidth: "90%",
  },
  headline: {
    color: "white",
    fontFamily: globalStyles.fonts.gabaritoBold,
    fontSize: 16,
    marginBottom: 5,
  },
  subHeadline: {
    color: "white",
    fontSize: 12,
    fontFamily: globalStyles.fonts.nunitoRegular,
  },
});

export default TodayHeader;
