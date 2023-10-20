import { View, Image, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { globalStyles } from '../../assets/common/global-styles';

const TodayHeader = () => {

  return (
      <View style={styles.container}>
        {/* TODO replace images with SVG, need to use a library for this */}
        <Image source={require('../../assets/images/today-octopus.png')} />
        <View style={{flex: 1, width: 'auto'}}>
          <View style={styles.bubble}>
            <Text style={{color: 'white'}}>
              Ready to learn?
              Get ready for today's journey into new knowledge and exciting content.
            </Text>
          </View>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    maxWidth: '100%',
    flexDirection: 'row',
    alignItems: 'start',
  },
  bubble: {
    backgroundColor: globalStyles.colors.primary,
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 10,
    padding: 20,
    maxWidth: '85%',
  }
});


export default TodayHeader;