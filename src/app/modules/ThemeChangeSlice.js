import { createSlice } from "@reduxjs/toolkit";

const themeChangeReducer = createSlice({
  name: "themeChange",
  initialState: {
    darkTheme: true,
  },
  reducers: {
    change: (state) => {
      state.darkTheme = !state.darkTheme;
    },
  },
});

export default themeChangeReducer.reducer;
export const { change, set } = themeChangeReducer.actions;
