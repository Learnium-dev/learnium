import { View, Text, Pressable } from "react-native";

// styles
import { styles } from "../styles/createContent";

// icons
import ArrowBack from "../../../../../assets/icons/arrow_back.svg";

// navigation
import { useNavigation } from "@react-navigation/native";

const Header = ({ name, back }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (typeof back === "function") {
      back();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.header}>
      <Pressable onPress={handlePress}>
        <ArrowBack width={24} height={24} />
      </Pressable>
      <Text style={styles.title}>{name}</Text>
    </View>
  );
};

export default Header;
