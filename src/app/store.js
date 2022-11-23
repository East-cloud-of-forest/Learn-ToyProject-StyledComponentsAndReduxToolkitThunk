import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import FirebaseReducer from "./modules/FirebaseSlice";
import themeChangeReducer from "./modules/ThemeChangeSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    themeChange: themeChangeReducer,
    Firebase: FirebaseReducer
  },
});
