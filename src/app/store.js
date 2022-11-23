import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import themeChangeReducer from "./modules/ThemeChangeSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    themeChange: themeChangeReducer,
  },
});
