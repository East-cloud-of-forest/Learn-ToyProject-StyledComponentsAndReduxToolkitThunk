import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAddAllFireStore, getAllFireStore } from "../../api/Firebase";

export const asyncGetAllFirebase = createAsyncThunk(
  "GetBoardDataSlice/asyncGetAllFirebase",
  async () => {
    const resp = await getAllFireStore();
    return resp;
  }
);

export const asyncGetAddAllFirebase = createAsyncThunk(
  "GetBoardDataSlice/asyncGetAddAllFirebase",
  async ({ start, size }) => {
    const resp = await getAddAllFireStore(start, size);
    return resp;
  }
);

const GetBoardDataSlice = createSlice({
  name: "GetBoardDataSlice",
  initialState: {
    status: "done",
    list: [],
    counter: 0,
    start: null
  },
  extraReducers: (builder) => {
    builder
      // 전체 리스트
      .addCase(asyncGetAllFirebase.pending, (state) => {
        state.status = "loading";
      })
      .addCase(asyncGetAllFirebase.fulfilled, (state, action) => {
        state.list = action.payload.board;
        state.start = action.payload.start;
        state.counter = action.payload.counter;
        state.status = "done";
      })
      .addCase(asyncGetAllFirebase.rejected, (state) => {
        state.status = "fail";
      })

      // 추가 리스트
      .addCase(asyncGetAddAllFirebase.pending, (state) => {
        state.status = "loading";
      })
      .addCase(asyncGetAddAllFirebase.fulfilled, (state, action) => {
        state.list = [...state.list, ...action.payload.board];
        state.start = action.payload.start;
        state.status = "done";
      })
      .addCase(asyncGetAddAllFirebase.rejected, (state) => {
        state.status = "fail";
      })
  },
});

export default GetBoardDataSlice.reducer;