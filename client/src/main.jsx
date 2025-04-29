import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from "./store.js";
import { Provider } from "react-redux";
import { injectStore } from "./services/auth.js";

injectStore(store)

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);