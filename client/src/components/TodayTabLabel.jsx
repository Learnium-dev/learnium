import { View, Text } from "react-native";
import { globalStyles } from '../../assets/common/global-styles';

const TodayTabLabel = (props) => {
  const { focused, style } = props;

  return (
    <View style={{ ...style, backgroundColor: focused ? 'white' : 'transparent' }}>
      <Text style={{
        fontSize: 12,
        color: focused ? globalStyles.colors.primary : globalStyles.colors.white,
        fontFamily: focused ? globalStyles.fonts.nunitoSemiBold : globalStyles.fonts.nunitoRegular
        }}>
        Today's Content
      </Text>
    </View>
  )
};

export default TodayTabLabel;
