
import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import { useRef, useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import PagerView from 'react-native-pager-view';
import FlashCard from "../components/FlashCard";
import { getFlashCards } from '../services/flashcardsService';
import FlashCardsSetupView from "../layout/FlashCardsSetupView";
import { updateDetails } from "../services/detailsService";

const FlashCardsContainer = ({ closeSheet, keytopicid }) => {

  const [cards, setCards] = useState([]);
  const [practicing, setPracticing] = useState(false);
  const [questionFirst, setQuestionFirst] = useState(true);
  
  useEffect(() => {
    loadFlashCards();
  }, []);

  const loadFlashCards = () => {
    // using hardcoded keytopicid for now, it will be passed in as props later
    const keytopicTemporary = '651c6dfef7a8d6f181bdf420'
    getFlashCards(keytopicTemporary).then((flashcards) => {
        console.log('Flashcards loaded', flashcards);
        setCards(flashcards);
      },
      (error) => {
        alert('Error', `Something went wrong! ${error}`);
      }
    )
  }

  const pagerRef = useRef(null);

  const handleStart = (questionFirst) => {
    setQuestionFirst(questionFirst);
    setPracticing(true);
  }

  const next = (nextIndex) => {
    pagerRef.current.setPage(nextIndex > cards.length - 1 ? cards.length - 1 : nextIndex);
  }

  const previous = (prevIndex) => {
    pagerRef.current.setPage(prevIndex < 0 ? 0 : prevIndex);
  }

  const markValid = (card) => {
    const details = card.details[0];
    updateDetails(details._id, { isvalid: true }).then((updatedDetails) => {
      console.log('Details updated: ', updatedDetails);
      // Update the state
      card.details[0] = updatedDetails;
      const updatedCards = [...cards, card];
      setCards(updatedCards);
    }, (error) => {
      alert('Error', `Couldn't update! ${error}`);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header} >
        <Pressable onPress={closeSheet}>
          <AntDesign name="close" size={24} color="black" />
        </Pressable>
        <Pressable>
          <Feather name="more-vertical" size={24} color="black" />
        </Pressable>
      </View>

      { practicing ? <PagerView
        style={styles.pagerView}
        initialPage={0}
        scrollEnabled={true}
        overdrag={true}
        ref={pagerRef}
      >
        {cards && cards.map((card, index) => {
          return (
            <FlashCard
              card={card}
              index={index}
              key={index}
              next={() => next(index + 1)}
              previous={() => previous(index - 1)}
              questionFirst={questionFirst}
              markValid={markValid}
            />
          );
        })}
      </PagerView> : <FlashCardsSetupView onStartPracticing={handleStart} /> }
    </View>
  )};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    height: "100%",
    backgroundColor: 'white'
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  pagerView: { 
    flex: 1,
    width: "100%",
    height: "100%" 
  }
});

export default FlashCardsContainer;

 