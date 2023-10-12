
import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import { useRef, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PagerView from 'react-native-pager-view';
import FlashCard from "../components/FlashCard";

const dummyCards = [ 
  {
    answer: "E-commerce, cloud computing, and digital streaming",
    question: "What does Amazon specialize in?",
    difficult: false,
  },
  {
    answer: "Jeff Bezos in 1994",
    question: "Who founded Amazon and when?",
    difficult: false,
  },
  {
    answer: "Bellevue, Washington",
    question: "Where was Amazon founded?",
    difficult: false,
  },
  {
    answer: "Zoox, Amazon Lab126, and Kuiper Systems among others",
    question: "What are some of Amazon’s subsidiaries?",
    difficult: false,
  },
  {
    answer: "Books",
    question: "What was Amazon initially an online marketplace for?",
    difficult: false,
  },
];


const FlashCardsContainer = ({ flashcards, closeSheet }) => {

  const [cards, setCards] = useState(dummyCards); // replace with flashcards

  const pagerRef = useRef(null);

  const next = (nextIndex) => {
    console.log('nextIndex: ', nextIndex);
    pagerRef.current.setPage(nextIndex > cards.length - 1 ? cards.length - 1 : nextIndex);
  }

  const previous = (prevIndex) => {
    console.log('prevIndex: ', prevIndex);
    pagerRef.current.setPage(prevIndex);
  }

  const updateCards = (card) => {
    console.log('update');
    // update card in the cards array and setCards
    markDifficult(card);
    const updatedCards = [...cards];
    setCards(updatedCards);
  }


  const markDifficult = (card) => {
    // Find the index of the card in the flashcards array
    const cardIndex = cards.findIndex((c) => c.question === card.question);

    if (cardIndex !== -1) {
      // Update the 'difficult' property of the card to true
      cards[cardIndex].difficult = true;
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Pressable onPress={closeSheet}>
          <AntDesign name="close" size={24} color="black" />
        </Pressable>

        <Pressable>
          <Feather name="more-vertical" size={24} color="black" />
        </Pressable>
      </View>

      <PagerView
        style={{ flex: 1, width: "100%", height: "100%" }}
        initialPage={0}
        scrollEnabled={true}
        overdrag={true}
        ref={pagerRef}
      >
        <View
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
          key={-1}
        >
          <Text style={styles.topicTitle}>Key Topic 1</Text>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "700",
              fontSize: 18,
              marginBottom: 10,
            }}
          >
            Set Up Your Flesh Cards
          </Text>
          <Text style={styles.instructions}>
            (All toggle functionality will be implemented later)
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "700",
              fontSize: 18,
              marginBottom: 10,
            }}
          >
            Swipe to the Left to Start Practicing
          </Text>
          <Text style={styles.instructions}>
            (Swiping will be changed to Button Click)
          </Text>
          <MaterialCommunityIcons
            name="gesture-swipe-left"
            size={36}
            color="black"
          />
        </View>

        {cards.map((card, index) => {
          return (
            <FlashCard
              card={card}
              index={index}
              key={index}
              next={() => next(index + 1)}
              previous={() => previous(index - 1)}
              onCardChange={updateCards}
            />
          );
        })}
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingLeft: 20,
    paddingRight: 20,
    height: "100%",
  },
  topicTitle: {
    textAlign: "auto",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 100,
  },
  instructions: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 80,
  },
});

export default FlashCardsContainer;

 