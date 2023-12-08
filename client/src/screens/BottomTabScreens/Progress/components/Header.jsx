import { View, Text, Pressable } from "react-native";

// styles
import { styles } from "../../Progress/styles/singleKeyTopicStyles";

// icons
import ArrowBack from "../../../../../assets/icons/arrow_back.svg";

// navigation
import { useNavigation } from "@react-navigation/native";

// Custom Header
const CustomHeader = ({ title, subtitle }) => (
  <View style={{ display: "flex" }}>
    <Text style={styles.title}>{title}</Text>
    {subtitle && <Text style={styles.subtitle}>From {subtitle}</Text>}
  </View>
);

const Header = ({ name, materialName }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <Pressable onPress={() => navigation.goBack()}>
        <ArrowBack width={24} height={24} />
      </Pressable>
      <CustomHeader title={name} subtitle={materialName} />
    </View>
  );
};

export default Header;
