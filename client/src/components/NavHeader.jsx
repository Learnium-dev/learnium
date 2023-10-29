// Generate custom navigation header that has a back button and a title and a subtitle
import React from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowBack from '../../assets/icons/arrow_back.svg'
import { globalStyles } from '../../assets/common/global-styles';

const NavHeader = ({ title, subtitle }) => {
  const navigation = useNavigation();
  console.log('NavHeader title', title, subtitle);


  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <View style={styles.container}>
        <Pressable style={styles.pressable} onPress={handleBack}>
          <ArrowBack style={styles.backArrow} />
          <View>
            <Text style={styles.title}>{title}</Text>
            { subtitle && <Text>{subtitle}</Text> }
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 40,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  backArrow: {
    marginRight: 10,
    marginTop: 4,
  },
  pressable: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
    justifyContent: 'flex-start',
  },
  title: {
    fontFamily: 'Gabarito-Bold',
    fontSize: 20,
    color: globalStyles.colors.primary,
  },
});

export default NavHeader;