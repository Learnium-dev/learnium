import { View, Text, Pressable, StyleSheet } from "react-native";
import { dateOptions } from "../../../../../utils/helpers";

// Progress Circle
import * as Progress from "react-native-progress";

import { globalStyles } from "../../../../../assets/common/global-styles";

const MaterialCard = ({ material, selectedView, onPress }) => {

  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          borderWidth: 2,
          borderRadius: 20,
          borderColor: "#7000FF",
          padding: 12,
          marginBottom: 10,
        }}
      >
        <Progress.Circle
          fill="white"
          size={50}
          indeterminate={false}
          borderWidth={10}
          borderColor="#7000FF"
          progress={0.5}
          showsText={true}
          // formatText={(progress) => `${progress * 100}%`}
          textStyle={{
            fontFamily: globalStyles.fonts.nunitoBold,
            color: globalStyles.colors.primary,
            fontSize: 10,
          }}
        />

        <View style={{ paddingHorizontal: 10 }}>
          <Text
            style={{
              fontSize: 16,
              paddingBottom: 4,
              fontFamily: globalStyles.fonts.gabaritoRegular,
            }}
          >
            {material.name}
          </Text>
          <Text style={{ fontSize: 12 }}>
            Exam Date:{" "}
            {new Date(material.examdate).toLocaleString(undefined, dateOptions)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default MaterialCard;
