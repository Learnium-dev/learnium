import { View, Image, FlatList, Text, Pressable, StyleSheet } from "react-native";
import { globalStyles } from "../../assets/common/global-styles";
import TodayCharacter from '../../assets/images/characters/today-list-character.svg';
import MissedCharacter from '../../assets/images/characters/missed-list-character.svg';
import ReviewCharacter from '../../assets/images/characters/review-list-character.svg';
import InactiveCharacter from '../../assets/images/characters/inactive-list-character.svg';
import { dateOptions } from "../../utils/helpers";

const KeyTopicListItem = ({ topic, accentColor, selectedView, onPress }) => {

  const renderCharacter = () => {

    if (topic.progress === 0) {
      return <InactiveCharacter />;
    }

    switch (selectedView) {
      case 'today':
        return <TodayCharacter />;
      case 'missed':
        return <MissedCharacter />;
      case 'review':
        return <ReviewCharacter />;
      default:
        return <TodayCharacter />;
    }
  }

  const getColor = () => {
    if (topic.progress === 0) {
      return globalStyles.colors.textColor;
    }

    switch (selectedView) {
      case 'today':
      case 'review':
        return globalStyles.colors.primary;
      case 'missed':
        return globalStyles.colors.secondary;
      default:
        return globalStyles.colors.primary;
    }
  }

  return (
    <Pressable onPress={onPress}>
      <View style={{ ...styles.itemContainer, borderColor: getColor() }}>
        <View style={styles.textContainer}>
          <Text
            style={{ ...styles.topicTitle, color: getColor() }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {topic.name}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode="tail">
            From: {topic.folderid.name}
          </Text>
          <Text style={styles.subtitle}>
            Due Date:{" "}
            {new Date(topic.duedate).toLocaleString(undefined, dateOptions)}
          </Text>
        </View>
        <View style={styles.characterContainer}>{renderCharacter()}</View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 15, 
    borderWidth: 2,
    borderRadius: 20,
    marginVertical: 4,
    overflow: 'hidden',
  },
  textContainer: {
    flex: 1,
    minHeight: 65,
  },
  topicTitle: {
    fontFamily: globalStyles.fonts.gabaritoBold,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontFamily: globalStyles.fonts.nunitoRegular,
    fontSize: 14,
    marginBottom: 5,
  },
  characterContainer: {
    width: 50,
    height: 40,
  }
});

export default KeyTopicListItem;
