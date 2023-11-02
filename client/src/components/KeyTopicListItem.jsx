import { View, Image, FlatList, Text, Pressable, StyleSheet } from "react-native";
import { globalStyles } from "../../assets/common/global-styles";
import TodayCharacter from '../../assets/images/characters/today-list-character.svg';
import MissedCharacter from '../../assets/images/characters/missed-list-character.svg';
import { dateOptions } from "../../utils/helpers";

const KeyTopicListItem = ({ topic, accentColor, selectedView, onPress }) => {


  return (
    <Pressable onPress={onPress}>
      <View style={{...styles.itemContainer, borderColor: accentColor}}>
        <View style={styles.textContainer}>
          <Text style={{...styles.topicTitle, color: accentColor}}>{topic.name}</Text>
          <Text style={styles.subtitle}>From: Course title here</Text>
          <Text style={styles.subtitle}>Due date: {new Date(topic.duedate).toLocaleString(undefined, dateOptions)}</Text>
        </View>
        <View style={styles.characterContainer}>
          { selectedView === 'missed' ? <MissedCharacter /> : <TodayCharacter /> }
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 20, 
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
    fontFamily: globalStyles.fonts.nunito,
    fontSize: 14,
    marginBottom: 5,
  },
  characterContainer: {
    width: 50,
    height: 40,
  }
});

export default KeyTopicListItem;
