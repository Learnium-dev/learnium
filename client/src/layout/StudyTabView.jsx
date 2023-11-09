import { View, FlatList, Text, Pressable, StyleSheet } from "react-native";
import TodayHeader from "../components/TodayHeader";
import { useNavigation } from "@react-navigation/native";
import KeyTopicListItem from "../components/KeyTopicListItem";
import { globalStyles } from "../../assets/common/global-styles";

const StudyTabView = ({ selectedView, keyTopics }) => {
  const accentColor =
    selectedView === "missed"
      ? globalStyles.colors.secondary
      : globalStyles.colors.primary;

  const { navigate } = useNavigation();

  return (
    <View style={styles.listContainer}>
      <View style={{ ...styles.innerContainer, borderColor: accentColor }}>
        <View
          style={{
            position: "relative",
            top: -70,
            zIndex: 1,
            marginBottom: -70,
          }}
        >
          <TodayHeader selectedView={selectedView} accentColor={accentColor} />
        </View>

        <View style={{ paddingVertical: 20, flex: 1, padding: 20 }}>
          {keyTopics && keyTopics.length ? (
            <FlatList
              data={keyTopics}
              renderItem={({ item: topic }) => (
                <KeyTopicListItem
                  topic={topic}
                  selectedView={selectedView}
                  accentColor={accentColor}
                  onPress={() => navigate("KeyTopic", { keyTopic: topic })}
                />
              )}
            />
          ) : (
            <Text style={{ fontFamily: globalStyles.fonts.nunitoRegular }}>There are no topics here!</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    marginTop: 60,
    borderWidth: 2,
    borderRadius: 20,
  },
});

export default StudyTabView;
