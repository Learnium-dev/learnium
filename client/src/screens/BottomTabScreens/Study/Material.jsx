import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Easing,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import { BottomSheetModal, SCREEN_HEIGHT } from "@gorhom/bottom-sheet";
import FlashCardsContainer from "../../../containers/FlashCardsContainer";
import NavHeader from "../../../components/NavHeader";
import DueCalendar from "../../../../assets/icons/due-calendar.svg";
import BadgeIcon from "../../../../assets/icons/badge-icon.svg";
import { shortDateOptions } from "../../../../utils/helpers";
import { globalStyles } from "../../../../assets/common/global-styles";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux'
import { fetchKeyTopics, fetchMaterial } from "../../../../slices/materialsSlice";
import Collapsible from 'react-native-collapsible';
import { Feather } from '@expo/vector-icons';
import KeyTopicListItem from "../../../components/KeyTopicListItem";

const Material = (props) => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  // Selectors
  const material = useSelector(state => state.material.material);
  const keyTopics = useSelector(state => state.material.keyTopics);

  const { keyTopic } = props.route.params;
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["95%"], []);
  const [isKeyTopicsCollapsed, setIsKeyTopicsCollapsed] = useState(true);
  const [isKeyTopicsListCollapsed, setIsKeyTopicsListCollapsed] = useState(true);

  useEffect(() => {
    dispatch(fetchMaterial(keyTopic.folderid._id));
    dispatch(fetchKeyTopics())
  }, [dispatch]);

  const openBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const closeBottomSheet = () => {
    bottomSheetModalRef.current.dismiss();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <NavHeader title={material?.name} showMenu={false} />
        <ScrollView style={styles.main}>
            <View style={styles.stats}>
              <View style={styles.statsItem}>
                <DueCalendar style={{ marginRight: 8 }} />
                <View>
                  <Text style={styles.statsItemText}>Due date:</Text>
                  <Text style={styles.statsItemText}>
                    {new Date(keyTopic.duedate).toLocaleDateString(
                      undefined,
                      shortDateOptions
                    )}
                  </Text>
                </View>
              </View>
              <View style={styles.statsItem}>
                <BadgeIcon style={{ marginRight: 8 }} />
                <View>
                  <Text style={styles.statsItemText}>Best Score:</Text>
                  <Text style={styles.statsItemText}>N/A</Text>
                </View>
              </View>
            </View>

            {/*  KEY TOPICS SUMMARY */}
            <Pressable style={styles.collapsibleKeytopics} onPress={() => setIsKeyTopicsCollapsed(!isKeyTopicsCollapsed)}>
              <Collapsible style={{}} collapsedHeight={150} collapsed={isKeyTopicsCollapsed} duration={50} easing={Easing.ease}>
                <View style={{}}>
                  <Text style={styles.summaryTitle}>Summary</Text>

                  {keyTopics.map((keyTopic, index) => (
                    <View style={{marginBottom: 20}} key={keyTopic._id}>
                      <Text style={{...styles.summaryText, fontFamily: 'Nunito-SemiBold'}}>Key Topic {index + 1}: {keyTopic.name}</Text>
                      <Text style={styles.summaryText}>{keyTopic.summary}</Text>
                    </View>
                  ))}

                </View>
                
              </Collapsible>
              <View style={{width: '100%', display: 'flex', alignItems: 'center', height: 20, marginTop: 10}}>
                { isKeyTopicsCollapsed ?
                  <Feather name="chevron-down" size={24} color="gray" /> :
                  <Feather name="chevron-up" size={24} color="gray" />
                }
              </View>
            </Pressable>

            {/*  FLASHCARD Button and Sheet */}
            <Pressable style={styles.flashCardsButton} onPress={openBottomSheet}>
              <Text style={styles.flashCardsButtonText}>Study Flashcards</Text>
            </Pressable>

            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={0}
              snapPoints={snapPoints}
            >
              <FlashCardsContainer
                keyTopic={keyTopic}
                studyMaterial={true}
                closeSheet={closeBottomSheet}
              />
            </BottomSheetModal>


            {/*  KEY TOPICS LIST */}
            <Pressable style={styles.collapsibleKeytopics} onPress={() => setIsKeyTopicsListCollapsed(!isKeyTopicsListCollapsed)}>
              <Collapsible style={{}} collapsedHeight={295} collapsed={isKeyTopicsListCollapsed} duration={50} easing={Easing.ease}>
                <View style={{}}>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10}}>
                    <Text style={styles.summaryTitle}>Key Topics</Text>
                    <View style={{backgroundColor: globalStyles.colors.accent, padding: 10, borderRadius: 20}}>
                        <Text style={{ fontFamily: 'Nunito-Bold'}}>0 / {keyTopics.length}</Text>
                    </View>
                  </View>

                  { keyTopics && keyTopics.length ? keyTopics.map((topic, index) => {
                    return (
                      <KeyTopicListItem
                        key={index}
                        topic={topic}
                        onPress={() => console.log('pressed')}
                      />
                    )
                  }) :
                    <Text>There are no topics here!</Text> }

                </View>
                
              </Collapsible>
              <View style={{width: '100%', display: 'flex', alignItems: 'center', height: 20, marginTop: 10}}>
                { isKeyTopicsListCollapsed ?
                  <Feather name="chevron-down" size={24} color="gray" /> :
                  <Feather name="chevron-up" size={24} color="gray" />
                }
              </View>
            </Pressable>



        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,

    backgroundColor: "white",
    padding: 20,
  },
  stats: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "start",
    justifyContent: "start",
    marginBottom: 30,
  },
  statsItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "start",
    marginRight: 20,
  },
  statsItemText: {
    fontFamily: "Nunito-Regular",
    fontSize: 12,
  },
  collapsibleKeytopics: {
    width: "100%",
    padding: 20,
    borderWidth: 2,
    borderColor: globalStyles.colors.primary,
    borderRadius: 20,
    marginBottom: 20,
  },
  summary: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "start",
    borderWidth: 2,
    borderColor: globalStyles.colors.primary,
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  summaryTitle: {
    fontFamily: "Nunito-Bold",
    fontSize: 18,
    marginBottom: 10,
    color: globalStyles.colors.primary,
  },
  summaryText: {
    fontFamily: "Nunito-Regular",
    fontSize: 14,
  },
  flashCardsButton: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: globalStyles.colors.primary,
    borderRadius: 40,
    padding: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  flashCardsButtonText: {
    fontFamily: "Gabarito-Bold",
    fontSize: 20,
    color: globalStyles.colors.primary,
  },
  quizButtonText: {
    fontFamily: "Gabarito-Bold",
    fontSize: 20,
    color: "white",
  },

  quizButton: {
    width: "100%",
    backgroundColor: "white",

    backgroundColor: globalStyles.colors.primary,

    borderRadius: 40,
    padding: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
  },
});

export default Material;
