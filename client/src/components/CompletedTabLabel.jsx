import { View, Text } from "react-native";
import { globalStyles } from '../../assets/common/global-styles';

const CompletedTabLabel = (props) => {
  const { focused, style } = props;

  return (
    <View
      style={{ ...style, backgroundColor: focused ? "white" : "transparent" }}
    >
      <Text
        style={{
          fontFamily: globalStyles.fonts.gabaritoRegular,
          fontSize: 16,
          color: focused
            ? globalStyles.colors.primary
            : globalStyles.colors.white,
          // fontFamily: focused ? globalStyles.fonts.nunitoSemiBold : globalStyles.fonts.nunitoRegular
        }}
      >
        Completed
      </Text>
    </View>
  );
};

export default CompletedTabLabel;
