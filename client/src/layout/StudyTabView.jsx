import { View, FlatList, Text, Pressable } from "react-native";
import TodayHeader from "../components/TodayHeader";
import { useNavigation } from "@react-navigation/native";

const StudyTabView = ({ selectedView, keyTopics }) => {
  console.log('StudyTabView keyTopics: ', keyTopics.length);  

  const { navigate } = useNavigation();

  // const color = selectedView === 'missed' ? 'red' : selectedView === 'today' ? 'blue' : 'green';

  return (
      <View style={{ flex: 1}}>
        <TodayHeader />

        <View style={{paddingVertical: 20}}>
          <FlatList
            style={{ width: '100%'}}
            data={keyTopics}
            renderItem={({ item: topic }) => (
              <Pressable onPress={() => navigate('KeyTopic', { keyTopic: topic })}>
                <View style={{padding: 20, borderWidth: 1, borderRadius: 10, marginVertical: 2}}>
                  <Text style={{textTransform: 'capitalize', width: '100%'}}>{topic.name}</Text>
                </View>
              </Pressable>
            )}
          />
        </View>
      </View>
  );
}

export default StudyTabView;