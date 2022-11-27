import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getOneFireStore,
  postAddLike,
} from "../../api/Firebase";

export const asyncGetOneFirebase = createAsyncThunk(
  "GetPostDataSlice/asyncOneFirebase",
  async (id) => {
    const resp = await getOneFireStore(id);
    return resp;
  }
);

export const asyncPostAddLikeFirebase = createAsyncThunk(
  "GetPostDataSlice/asyncPostAddLikeFirebase",
  async ({ id, like }) => {
    const resp = await postAddLike(id, like);
    return resp;
  }
);

const GetPostDataSlice = createSlice({
  name: "GetPostDataSlice",
  initialState: {
    status: "done",
    data: {},
  },
  extraReducers: (builder) => {
    builder
      // 글 내용 조회
      .addCase(asyncGetOneFirebase.pending, (state) => {
        state.status = "loading";
      })
      .addCase(asyncGetOneFirebase.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "done";
      })
      .addCase(asyncGetOneFirebase.rejected, (state) => {
        state.status = "fail";
      })

      // 좋아요 버튼 누르기
      .addCase(asyncPostAddLikeFirebase.pending, (state) => {
        state.status = "likeloading";
      })
      .addCase(asyncPostAddLikeFirebase.fulfilled, (state, action) => {
        state.data.like = action.payload;
        state.status = "done";
      })
      .addCase(asyncPostAddLikeFirebase.rejected, (state) => {
        state.status = "fail";
      });
  },
});

export default GetPostDataSlice.reducer;
