import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

// React
import { useState } from "react";

// icons
import SearchIcon from "../../../../assets/icons/search.svg";
import Header from "./components/Header";

// styles
import { styles } from "./styles/allMaterialsStyles";
import { SafeAreaView } from "react-native-safe-area-context";

// Top tab bar
import { TabView, SceneMap } from "react-native-tab-view";
import MaterialCard from "./components/MaterialCard";

const FirstRoute = () => {
  // Click Search
  const handleClick = () => {
    console.log("Clicked");
  };

  return (
    <>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            // value={searchTerm}
            // onChangeText={(text) => setSearchTerm(text)}
            placeholder="Enter Material Name?"
            placeholderTextColor={"#8C8C8C"}
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <SearchIcon width={24} height={24} />
        </TouchableOpacity>
      </View>
      <MaterialCard />
    </>
  );
};

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const MaterialsStudy = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "In Progress" },
    { key: "second", title: "Completed" },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header name={"All Materials"} />

      {/* Top Tab Bar */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        tabStyle={{ flex: 1, borderRadius: 30 }}
      />
    </SafeAreaView>
  );
};

export default MaterialsStudy;
