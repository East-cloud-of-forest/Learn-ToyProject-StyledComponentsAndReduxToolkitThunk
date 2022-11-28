import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { editFireStore, postFireStore } from "../../api/Firebase";

export const asyncPostFirebase = createAsyncThunk(
  "WritePostSlice/asyncPostFirebase",
  async (data) => {
    const resp = await postFireStore(data);
    return resp;
  }
);

export const asyncEditFirebase = createAsyncThunk(
  "WritePostSlice/asyncEditFirebase",
  async ({data, id}) => {
    const resp = await editFireStore(data, id);
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
      })
      .addCase(asyncEditFirebase.pending, (state) => {
        state.status = "loading";
      })
      .addCase(asyncEditFirebase.fulfilled, (state) => {
        state.status = "done";
      })
      .addCase(asyncEditFirebase.rejected, (state) => {
        state.status = "fail";
      });
  },
});

export default WritePostSlice.reducer;
