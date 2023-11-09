import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import TermFirstView from "../layout/TermFirstView";
import DefinitionFirstView from "../layout/DefinitionFirstView";
import { globalStyles } from "../../assets/common/global-styles";
import FlipCard from 'react-native-flip-card'
import BookmarkFront from '../../assets/icons/bookmarkFront.svg'
import BookmarkFrontFilled from '../../assets/icons/bookmarkFrontFilled.svg'
import BookmarkBack from '../../assets/icons/bookmarkBack.svg'
import BookmarkBackFilled from '../../assets/icons/bookmarkBackFilled.svg'
import { useDispatch, useSelector } from "react-redux";
import flashCardsSlice from "../../slices/flashCardsSlice";
import BookmarkWhite from "../../assets/icons/bookmarkWhite.svg";
import BookmarkInfo from "../../assets/icons/bookmark-info.svg";
import TapToSeeAnswer from "../../assets/icons/tap-to-view.svg";
import Previous from '../../assets/icons/previous.svg';
import Next from '../../assets/icons/next.svg';

const FlashCard = ({ card, termFirst, markDifficult }) => {

  const cardIndex = useSelector(state => state.flashCards.cardIndex);
  const showingInfo = useSelector(state => state.flashCards.showingInfo);
  const dispatch = useDispatch();
  const { updateCardAnswer, setShowingInfo } = flashCardsSlice.actions;

  const [answer, setAnswer] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
    handleSubmitAnswer();
  };

  const handleSubmitAnswer = () => {
    // Save the answer to the flashcards state (not the database)
    // If we need to save to database, we can do it in flashCardsSlice (similar to updateFlashcard)
    dispatch(updateCardAnswer({index: cardIndex, answer: answer}));
  };

  const renderSide = () => {
    return (
      <View style={{width: '100%', flex: 1}}>
        <Pressable style={{...styles.bookmark, display: showingInfo ? 'none' : 'block'}} onPress={() => markDifficult(card)}>
          { !card.isdone ? 
              <BookmarkFront style={styles.bookmarkIcon} /> : 
            isFlipped ? 
              <BookmarkBackFilled style={styles.bookmarkIcon} /> : <BookmarkFrontFilled style={styles.bookmarkIcon} />
          }
        </Pressable>
        {termFirst ? (
          <TermFirstView isFlipped={isFlipped} details={card} answer={answer} onAnswer={setAnswer} />
        ) : (
          <DefinitionFirstView
            isFlipped={isFlipped}
            details={card}
            answer={answer}
            onAnswer={setAnswer}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View
        style={{ ...styles.deckOne, display: showingInfo ? "none" : "block" }}
      ></View>
      <View
        style={{ ...styles.deckTwo, display: showingInfo ? "none" : "block" }}
      ></View>
      <View style={styles.cardContainer}>
        {showingInfo && (
          <View
            style={{
              position: "absolute",
              zIndex: 1,
              width: "100%",
              height: "100%",
            }}
          >
            <View
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundColor: "black",
                opacity: 0.7,
                borderRadius: 20,
              }}
            ></View>
            <Text
              style={{
                color: "white",
                position: "absolute",
                right: 26,
                top: -43,
                fontFamily: "Nunito-Regular",
              }}
            >
              Tap to mark difficult
            </Text>
            <BookmarkInfo style={styles.bookmarkInfoIcon} />

            <View
              style={{
                position: "absolute",
                top: "80%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontFamily: "Nunito-Regular" }}>
                Tap to see answer
              </Text>
              <TapToSeeAnswer />
            </View>

            <View
              style={{
                position: "absolute",
                bottom: "33%",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Previous style={{ marginLeft: 20, marginRight: 5 }} />
                <Text style={{ color: "white", fontFamily: "Nunito-Regular" }}>
                  Previous
                </Text>
              </View>
              <View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ color: "white", fontFamily: "Nunito-Regular" }}
                  >
                    Next
                  </Text>
                  <Next style={{ marginLeft: 5, marginRight: 20 }} />
                </View>
              </View>
            </View>
          </View>
        )}
        <FlipCard
          style={{
            ...styles.card,
            backgroundColor: isFlipped ? globalStyles.colors.primary : "white",
          }}
          friction={10}
          flipHorizontal={true}
          flipVertical={false}
          clickable={true}
          onFlipStart={flipCard}
        >
          {renderSide()}
          {renderSide()}
        </FlipCard>
      </View>
      <View style={styles.infoButtonContainer}>
        <Pressable
          style={{
            ...styles.infoButton,
            backgroundColor: showingInfo
              ? "white"
              : globalStyles.colors.primary,
          }}
          onPress={() => dispatch(setShowingInfo(!showingInfo))}
        >
          <Text
            style={{
              ...styles.infoButtonText,
              color: showingInfo ? "black" : "white",
            }}
          >
            i
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    paddingTop: 40,
    marginBottom: 60
  },
  deckOne: {
    height: 30,
    width: '92%',
    height: '86%',
    alignSelf: 'center',
    position: 'absolute',
    borderWidth: 2,
    borderColor: globalStyles.colors.primary,
    backgroundColor: 'white',
    borderRadius: 20,
    top: 28,
    zIndex: -1
  },
  deckTwo: {
    height: 30,
    width: '84%',
    height: '80%',
    alignSelf: 'center',
    position: 'absolute',
    borderWidth: 2,
    borderColor: globalStyles.colors.primary,
    borderRadius: 20,
    top: 18,
    zIndex: -2
    },
  bookmark: {
    position: 'absolute',
    right: 30,
    top: -6,
    zIndex: 1,
  },
  bookmarkInfoIcon: {
    opacity: 1,
    position: 'absolute',
    right: 32,
    top: -20, // -4
    zIndex: 3,
  },
  cardContainer: {
    flex: 1,
    width: "100%",
    display: "flex",
    marginBottom: 40,
    position: 'relative',
  },
  card: {
    borderWidth: 2,
    borderColor: globalStyles.colors.primary,
    borderRadius: 20
  },
  topButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 80,
  },
  infoButtonContainer: {
    width: '100%', 
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginBottom: -5
  },
  infoButton: {
    width: 50, 
    height: 50, 
    borderRadius: 30, 
    backgroundColor: globalStyles.colors.primary
  },
  infoButtonText: {
    color: 'white', 
    fontSize: 25, 
    fontFamily: 'Gabarito-Bold',
    margin: 'auto',
    marginBottom: 5,
    textAlign: 'center',
    position: 'relative',
    top: 10
  },
  instructions: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
});

export default FlashCard;
