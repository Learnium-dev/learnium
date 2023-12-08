import { View, Text } from "react-native";
import { globalStyles } from '../../assets/common/global-styles';

const ReviewTabLabel = (props) => {
  const { focused, style } = props;

  return (
    <View style={{ ...style, backgroundColor: focused ? globalStyles.colors.accent : 'transparent' }}>
      <Text style={{
        fontFamily: globalStyles.fonts.gabaritoRegular,
        fontSize: 13,
        color: focused ? globalStyles.colors.primary : globalStyles.colors.white
      }}>
        Review Content
      </Text>
    </View>
  )
};

export default ReviewTabLabel;
