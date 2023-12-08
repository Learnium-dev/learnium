// Generate custom navigation header that has a back button and a title and a subtitle
import { View, Text, StyleSheet, Pressable, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ArrowBack from "../../assets/icons/arrow_back.svg";
import { globalStyles } from "../../assets/common/global-styles";
import { useRef } from "react";
import PopupMenu from "./PopupMenu";

const NavHeader = ({
  title,
  subtitle,
  isCenter,
  blackText,
  purpleText,
  keyTopic,
  showMenu,
}) => {
  const navigation = useNavigation();
  // console.log("NavHeader title", title, subtitle);

  const handleBack = () => {
    navigation.goBack();
  };

  const menuOptions = [
    {
      text: "View Material",
      onSelect: () => navigation.navigate("Material", { keyTopic: keyTopic }),
    },
    {
      text: "Edit Key Topic",
      onSelect: () => console.log("Edit Key Topic"),
    },
    {
      text: "Delete Key Topic",
      onSelect: () => console.log("Delete Key Topic"),
    },
  ];

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Pressable style={[styles.pressable]} onPress={handleBack}>
          <ArrowBack style={styles.backArrow} />
          <View
            style={{
              textAlign: "center",
              marginLeft: "auto",
              marginRight: "auto",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {isCenter && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  textAlign: "center",
                  margin: "auto",
                }}
              >
                <Text style={[styles.title, styles.textBlack]}>
                  {blackText}
                </Text>
                <Text style={[styles.title, styles.textPurple]}>
                  {purpleText}
                </Text>
              </View>
            )}
            {title && <Text style={styles.title}>{title}</Text>}

            {subtitle && <Text>{subtitle}</Text>}
          </View>
        </Pressable>
        {showMenu && (
          <Pressable style={styles.menuButton}>
            <PopupMenu options={menuOptions} />
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 40,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  backArrow: {
    marginRight: 10,
    marginTop: 4,
  },
  pressable: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
    justifyContent: "flex-start",
    width: "90%",
  },
  menuButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "10%",
  },
  title: {
    fontFamily: "Gabarito-Bold",
    fontSize: 20,
    color: globalStyles.colors.primary,
    paddingHorizontal: 10,
    textAlign: "center",
  },
  textBlack: {
    color: globalStyles.colors.black,
  },
});

export default NavHeader;
