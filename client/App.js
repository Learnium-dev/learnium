// gesture handlers
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// navigation root component
import Navigation from "./navigation";

// redux imports
import { Provider } from "react-redux";
import { store } from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Navigation />
      </GestureHandlerRootView>
    </Provider>
  );
}
