import {
  View,
  Text,
  ScrollView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

// React Hooks
import { useState, useEffect } from "react";

// React Navigation
import { useNavigation } from "@react-navigation/native";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setToken } from "../../../../slices/credentialsSlice";

// Axios
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

// Icons
import SearchIcon from "../../../../assets/icons/search.svg";
import Header from "./components/Header";

// Styles
import { styles } from "./styles/allMaterialsStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../../../assets/common/global-styles";

// Top tab bar
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import AllMaterialsProgressTabBar from "../../../components/AllMaterialsProgressTabBar";
import MaterialsProgressTabView from "../../../layout/MaterialsProgressTabView";
import { getFolders } from "../../../services/foldersService";



// const FirstRoute = () => {
//   // Click Search
  const handleClick = () => {
    console.log("Clicked");
  };

const AllMaterials = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const [folders, setFolders] = useState([]);
  const [isFoldersLoaded, setIsFoldersLoaded] = useState(false);
  // const [searchTerm, setSearchTerm] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  // const [isSearchResultsLoaded, setIsSearchResultsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "inProgress", title: "In Progress" },
    { key: "completed", title: "Completed" },
  ]);

  useEffect(() => {
//Get token
    AsyncStorage.getItem("jwt").then((token) => {
      if (token) {
        dispatch(setToken(token));

        // Get email
        AsyncStorage.getItem("email").then((email) => {
          if (email) {
            dispatch(setEmail(email));
          }
        });
      }
    });
      loadFolders();
   
  }, []);
    
  // Get folders
  const loadFolders = () => {
    getFolders().then((folders) => {
      console.log("Folders loaded", folders);
      setFolders(folders);
      setIsFoldersLoaded(true);
    },
      (error) => {
      alert("Error", `Couldn't load Materials! ${error}`);
      }
    );
  };

  // TabView
  const layout = useWindowDimensions();
  const filteredFolders = (routeKey) => {
    switch (routeKey) {
      case "inProgress":
        return folders;
      case "completed":
        return folders;
      default:
        return folders.filter((folder) => folder.progress < 100);
    }
  };

  const renderScene = ({ route }) => {
    return MaterialsProgressTabView({ 
      selectedView: route.key,
      folders: filteredFolders(route.key),
    });
  };

  

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={{ marginTop: 20, marginBottom: 10 }}>
        <Header name={"All Materials"} />
      </View>

      {/* Search Container */}
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

      {/* Top Tab Bar */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={AllMaterialsProgressTabBar}
        // tabStyle={{ flex: 1, borderRadius: 30 }}
      />
    </SafeAreaView>
  );
}

export default AllMaterials;



//   return (
//     <>



//       <MaterialCard />
//     </>
//   );
// };

// const SecondRoute = () => (
//   <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
// );

// const renderScene = SceneMap({
//   first: FirstRoute,
//   second: SecondRoute,
// });

// const MaterialsStudy = () => {
//   const layout = useWindowDimensions();
//   const [index, setIndex] = useState(0);
//   const [routes] = useState([
//     { key: "first", title: "In Progress" },
//     { key: "second", title: "Completed" },
//   ]);

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <Header name={"All Materials"} />

//       {/* Top Tab Bar */}
//       <TabView
//         navigationState={{ index, routes }}
//         renderScene={renderScene}
//         onIndexChange={setIndex}
//         initialLayout={{ width: layout.width }}
//         renderTabBar={AllMaterialsProgressTabBar}
//         tabStyle={{ flex: 1, borderRadius: 30 }}
//       />
//     </SafeAreaView>
//   );
// };

// export default MaterialsStudy
