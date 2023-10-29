import { View, Text, Pressable } from "react-native";

// styles
import { styles } from "../styles/createContent";

// icons
import ArrowBack from "../../../../../assets/icons/arrow_back.svg";

// navigation
import { useNavigation } from "@react-navigation/native";

const Header = ({ name }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <Pressable onPress={() => navigation.goBack()}>
        <ArrowBack width={24} height={24} />
      </Pressable>
      <Text style={styles.title}>{name}</Text>
    </View>
  );
};

export default Header;
