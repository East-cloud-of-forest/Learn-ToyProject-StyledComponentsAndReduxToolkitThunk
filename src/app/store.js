import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import FirebaseReducer from "./modules/FirebaseSlice";
import GetIpReducer from "./modules/GetIpSlice";
import themeChangeReducer from "./modules/ThemeChangeSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    themeChange: themeChangeReducer,
    Firebase: FirebaseReducer,
    GetIp: GetIpReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
