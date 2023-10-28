import { View, Pressable, StyleSheet, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { globalStyles } from '../../assets/common/global-styles';
import ProgressBarAnimated from "react-native-progress-bar-animated";

const FlashCardsHeader = ({ closeSheet, cardIndex, numberOfCards, practicing }) => {

  const progress = ((cardIndex + 1) / numberOfCards) * 100;

  return (
    <View>
      <View style={styles.header} >
        
        <View style={styles.left}>
          <Pressable  onPress={closeSheet}>
            <AntDesign name="close" size={24} color="black" />
          </Pressable>
          <Text style={styles.title}>Flashcards</Text>
        </View>

        <View style={styles.right}>

          { practicing && <View style={styles.index}>
            <Text style={styles.indexText}> {cardIndex + 1} / {numberOfCards}</Text>
          </View> }

          <Pressable>
            <Feather name="more-vertical" size={24} color="black" />
          </Pressable>
        </View>
      </View>
      { practicing && 
          <View style={{height: 40, width: '100%'}}>
            <ProgressBarAnimated
              width={"100%"}
              height={20}
              value={progress}
              backgroundColor={"#7000FF"}
              borderRadius={100}
              useNativeDriver={false}
              borderColor={"#ECECEC"}
              borderWidth={2}
            />
          </View> }
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  left: {
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-start'
  },
  title: {
    fontSize: 20,
    marginLeft: 10,
    fontFamily: 'Gabarito-Bold'
  },
  right: {
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-end'
  },
  index: {
    borderWidth: 2,
    borderColor: globalStyles.colors.primary,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 10
  },
  indexText: {
    fontSize: 12,
    fontFamily: 'Gabarito-Regular'
  }
});

export default FlashCardsHeader;
