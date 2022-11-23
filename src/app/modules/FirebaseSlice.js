import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllFireStore } from "../api/Firebase";

export const asyncGetFirebase = createAsyncThunk(
  "FirebaseSlice/asyncGetFirebase",
  async () => {
    const resp = await getAllFireStore();
    return resp;
  }
);

const FirebaseSlice = createSlice({
  name: "FirebaseSlice",
  initialState: {
    board: [],
    value: 'done'
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetFirebase.pending, (state) => {
        state.value = 'loading'
      })
      .addCase(asyncGetFirebase.fulfilled, (state, action) => {
        state.board = action.payload
        state.value = 'done'
      })
      .addCase(asyncGetFirebase.rejected, (state) => {
        state.value = 'fail'
      });
  },
});

export default FirebaseSlice.reducer;
