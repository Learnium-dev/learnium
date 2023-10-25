import { View, FlatList, Text, Pressable, StyleSheet } from "react-native";
import TodayHeader from "../components/TodayHeader";
import { useNavigation } from "@react-navigation/native";
import KeyTopicListItem from "../components/KeyTopicListItem";
import { globalStyles } from "../../assets/common/global-styles";

const StudyTabView = ({ selectedView, keyTopics }) => {
  console.log('StudyTabView keyTopics: ', keyTopics?.length);

  const { navigate } = useNavigation();

  // const color = selectedView === 'missed' ? 'red' : selectedView === 'today' ? 'blue' : 'green';

  return (
      <View style={styles.listContainer}>

        <View style={styles.innerContainer}>
          
          <View style={{ position: 'relative', top: -70, zIndex: 1, marginBottom: -70 }}>
            <TodayHeader />
          </View>

          <View style={{paddingVertical: 20, flex: 1, padding: 20}}>
          { keyTopics && keyTopics.length && <FlatList
              data={keyTopics}
              renderItem={({ item: topic }) => (
                <KeyTopicListItem topic={topic} onPress={() => navigate('KeyTopic', { keyTopic: topic })} />
              )}
            /> }
          </View>

        </View>


      </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    // backgroundColor: 'orange',
    marginTop: 60,
    borderWidth: 2,
    borderColor: globalStyles.colors.primary,
    borderRadius: 20,
  }
});

export default StudyTabView;