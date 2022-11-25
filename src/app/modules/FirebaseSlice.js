import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAddAllFireStore,
  getAllFireStore,
  getOneFireStore,
  postFireStore,
} from "../api/Firebase";

export const asyncGetAllFirebase = createAsyncThunk(
  "FirebaseSlice/asyncGetAllFirebase",
  async () => {
    const resp = await getAllFireStore();
    return resp;
  }
);

export const asyncGetAddAllFirebase = createAsyncThunk(
  "FirebaseSlice/asyncGetAddAllFirebase",
  async ({ start, size }) => {
    const resp = await getAddAllFireStore(start, size);
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

export const asyncPostFirebase = createAsyncThunk(
  "FirebaseSlice/asyncPostFirebase",
  async (data) => {
    const resp = await postFireStore(data);
    return resp;
  }
);

const FirebaseSlice = createSlice({
  name: "FirebaseSlice",
  initialState: {
    status: "done",
    board: [],
    post: {},
    counter: 0,
  },
  extraReducers: (builder) => {
    builder
      // 전체 리스트
      .addCase(asyncGetAllFirebase.pending, (state) => {
        state.status = "loading";
      })
      .addCase(asyncGetAllFirebase.fulfilled, (state, action) => {
        state.board = action.payload.board;
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
        state.board = [...state.board, ...action.payload.board];
        state.start = action.payload.start;
        state.status = "done";
      })
      .addCase(asyncGetAddAllFirebase.rejected, (state) => {
        state.status = "fail";
      })

      // 글 하나 조회
      .addCase(asyncGetOneFirebase.pending, (state) => {
        state.status = "loading";
      })
      .addCase(asyncGetOneFirebase.fulfilled, (state, action) => {
        state.post = action.payload;
        state.status = "done";
      })
      .addCase(asyncGetOneFirebase.rejected, (state) => {
        state.status = "fail";
      })

      // 글 쓰기
      .addCase(asyncPostFirebase.pending, (state) => {
        state.status = "loading";
      })
      .addCase(asyncPostFirebase.fulfilled, (state) => {
        state.status = "done";
      })
      .addCase(asyncPostFirebase.rejected, (state) => {
        state.status = "fail";
      });
  },
});

export default FirebaseSlice.reducer;
