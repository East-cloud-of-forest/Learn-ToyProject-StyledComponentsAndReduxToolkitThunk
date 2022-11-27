import { configureStore } from "@reduxjs/toolkit";
import GetBoardDataSlice from "./modules/Firebase/GetBoardDataSlice";
import GetPostDataSlice from "./modules/Firebase/GetPostDataSlice";
import WritePostSlice from "./modules/Firebase/WritePostSlice";
import GetIpSlice from "./modules/GetIpSlice";
import ThemeChangeSlice from "./modules/ThemeChangeSlice";

export const store = configureStore({
  reducer: {
    themeChange: ThemeChangeSlice,
    board: GetBoardDataSlice,
    post: GetPostDataSlice,
    write: WritePostSlice,
    ip: GetIpSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
