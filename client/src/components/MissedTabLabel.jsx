import { View, Text } from "react-native";
import { globalStyles } from '../../assets/common/global-styles';

const MissedTabLabel = (props) => {
  const { focused, style } = props;

  return (
    <View
      style={{ ...style, backgroundColor: focused ? "white" : "transparent" }}
    >
      <Text
        style={{
          fontFamily: globalStyles.fonts.gabaritoRegular,
          fontSize: 13,
          color: focused
            ? globalStyles.colors.secondary
            : globalStyles.colors.white,
        }}
      >
        Missed Content
      </Text>
    </View>
  );
};

export default MissedTabLabel;
