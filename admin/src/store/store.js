import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import screenReducer from "./screenSlice"
import loadingSlice from "./loadingSlice"

import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const rootReducer = combineReducers({
    user: userReducer,
    screen: screenReducer,
    loading: loadingSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const appStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});
export default appStore