import { View, FlatList, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCard from "../screens/BottomTabScreens/Progress/components/MaterialCard";
import { globalStyles } from "../../assets/common/global-styles";

const MaterialsProgressTabView = ({ selectedView, folders }) => {
  const accentColor =
    selectedView === "inProgress"
      ? globalStyles.colors.primary
      : globalStyles.colors.primary;

  const { navigate } = useNavigation();

  return (
    <View style={styles.listContainer}>
      <View style={{ ...styles.innerContainer, borderColor: accentColor }}>
        <View style={{ paddingVertical: 20, flex: 1 }}>
          {folders && folders.length ? (
            <FlatList
              data={folders}
              renderItem={({ item: material }) => (
                <MaterialCard
                  material={material}
                  selectedView={selectedView}
                  accentColor={accentColor}
                  onPress={() => navigate("Material", { material: material })}
                />
              )}
            />
          ) : (
            <Text>There are no materials here!</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
});

export default MaterialsProgressTabView;
