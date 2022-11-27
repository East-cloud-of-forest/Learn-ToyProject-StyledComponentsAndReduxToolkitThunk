import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postFireStore } from "../../api/Firebase";

export const asyncPostFirebase = createAsyncThunk(
  "WritePostSlice/asyncPostFirebase",
  async (data) => {
    const resp = await postFireStore(data);
    return resp;
  }
);

const WritePostSlice = createSlice({
  name: "WritePostSlice",
  initialState: {
    status: "done",
  },
  extraReducers: (builder) => {
    builder
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

export default WritePostSlice.reducer;
