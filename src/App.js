import { Provider } from "react-redux";
import "./App.css";
import appStore from "./utils/appStore";
import AuthProvider from "./components/AuthProvider";
import AppRoutes from "./components/AppRoutes";

function App() {
  return (
    <Provider store={appStore}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Provider>
  );
}

export default App;
