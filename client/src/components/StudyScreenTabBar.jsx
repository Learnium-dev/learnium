import { TabBar } from "react-native-tab-view";
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import { globalStyles } from "../../assets/common/global-styles";
import MissedTabLabel from "./MissedTabLabel";
import TodayTabLabel from "./TodayTabLabel";
import ReviewTabLabel from "./ReviewTabLabel";

const AnimatedTabBar = Animated.createAnimatedComponent(TabBar);

const StudyScreenTabBar = (props) => {
  const { navigationState, position } = props;
  const { index, routes } = navigationState;

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  // To improve animation of tab bar background color
  const color = position.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [
      globalStyles.colors.secondary,
      globalStyles.colors.primary,
      globalStyles.colors.primary,
    ],
  });

  const renderLabel = ({ route, focused, style }) => {
    switch (route.key) {
      case "missed":
        return <MissedTabLabel focused={focused} style={style} />;
      case "today":
        return <TodayTabLabel focused={focused} style={style} />;
      case "review":
        return <ReviewTabLabel focused={focused} style={style} />;
      default:
        return <TodayTabLabel focused={focused} style={style} />;
    }
  };

  return (
    <Animated.View
      style={{ ...styles.tabBarContainer, backgroundColor: color }}
    >
      <TabBar
        {...props}
        style={{
          ...styles.tabBar,
          backgroundColor: "transparent",
          // paddingVertical: windowHeight * -0.10,
          flexWrap: "nowrap",
          alignItems: "stretch",
        }}
        indicatorStyle={{ display: "none" }}
        renderLabel={(props) =>
          renderLabel({ ...props, style: styles.labelStyle })
        }
        tabStyle={{
          borderRadius: 30,
          marginHorizontal: windowWidth * -0.03,
        }}
        scrollEnabled={false}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    padding: 0,
    marginBottom: 10,
    borderRadius: 30,
  },
  tabBar: {
    display: "flex",
    justifyContent: "space-between",
    borderRadius: 30,
    paddingVertical: 0,
  },
  labelStyle: {
    padding: 8,
    borderRadius: 30,
    fontSize: 12,
    display: "flex",
    justifyContent: "center",
    flexWrap: "nowrap",
  },
});

export default StudyScreenTabBar;
