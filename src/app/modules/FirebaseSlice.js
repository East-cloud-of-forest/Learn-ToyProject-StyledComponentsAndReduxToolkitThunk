import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllFireStore, getOneFireStore } from "../api/Firebase";

export const asyncGetAllFirebase = createAsyncThunk(
  "FirebaseSlice/asyncGetAllFirebase",
  async () => {
    const resp = await getAllFireStore();
    return resp;
  }
);

export const asyncGetOneFirebase = createAsyncThunk(
  "FirebaseSlice/asyncOneFirebase",
  async (id) => {
    const resp = await getOneFireStore(id);
    return resp;
  }
);

const FirebaseSlice = createSlice({
  name: "FirebaseSlice",
  initialState: {
    value: "done",
    board: [],
    post: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetAllFirebase.pending, (state) => {
        state.value = "loading";
      })
      .addCase(asyncGetAllFirebase.fulfilled, (state, action) => {
        state.board = action.payload;
        state.value = "done";
      })
      .addCase(asyncGetAllFirebase.rejected, (state) => {
        state.value = "fail";
      })

      .addCase(asyncGetOneFirebase.pending, (state) => {
        state.value = "loading";
      })
      .addCase(asyncGetOneFirebase.fulfilled, (state, action) => {
        state.post = action.payload;
        state.value = "done";
      })
      .addCase(asyncGetOneFirebase.rejected, (state) => {
        state.value = "fail";
      });
  },
});

export default FirebaseSlice.reducer;
