import Navigation from "./navigation";

// redux imports
import { Provider } from "react-redux";
import store from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
