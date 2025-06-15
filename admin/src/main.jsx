import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import appStore from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import store from "./store/store.js";

const persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
    
        <Provider store={appStore}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
            <Toaster />
        </Provider>
    
);
