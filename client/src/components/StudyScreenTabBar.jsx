import { TabBar } from 'react-native-tab-view';
import { View, Text, StyleSheet } from "react-native";
import { globalStyles } from '../../assets/common/global-styles';

const renderLabel = ({ route, focused, color }) => {

  return (
    <View style={{ 
      padding: 6, 
      backgroundColor: focused ? globalStyles.colors.white : globalStyles.colors.primary,
      borderRadius: 30,
    }}>
      <Text style={{ 
          color: focused ? globalStyles.colors.primary : globalStyles.colors.white,
          fontSize: 12, 
          textTransform: 'capitalize'
        }}>
        {route.title}
      </Text>
    </View>
  )

};

const StudyScreenTabBar = props =>  {

  return (
    <TabBar
    {...props}
    style={styles.tabBar}
    indicatorStyle={{ display: 'none' }}
    renderLabel={renderLabel}
    tabStyle={{ flex: 1, borderRadius: 30 }}
  />
  );
};


const styles = StyleSheet.create({
  tabBar: { 
    display: 'flex', 
    justifyContent: 'space-between',
    backgroundColor: globalStyles.colors.primary,
    borderRadius: 30, 
    marginBottom: 10 
  }
});

export default StudyScreenTabBar;
