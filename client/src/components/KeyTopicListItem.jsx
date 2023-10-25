import { View, Image, FlatList, Text, Pressable, StyleSheet } from "react-native";
import { globalStyles } from "../../assets/common/global-styles";

const KeyTopicListItem = ({ topic, onPress }) => {


  return (
    <Pressable onPress={onPress}>
      <View style={styles.itemContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.topicTitle}>{topic.name}</Text>
          <Text style={{textTransform: 'capitalize', width: '100%'}}>{topic.summary}</Text>
        </View>
        <View style={styles.characterContainer}>
          <Image source={require('../../assets/images/topic-list-item-character.png')} />
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
    borderColor: globalStyles.colors.primary, 
    borderRadius: 10,
    marginVertical: 2,
    overflow: 'hidden',
  },
  textContainer: {
    flex: 1,
  },
  topicTitle: {
    textTransform: 'capitalize',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: globalStyles.colors.primary,
  },
  characterContainer: {
    width: 50,
    height: 40,
  }
});

export default KeyTopicListItem;
