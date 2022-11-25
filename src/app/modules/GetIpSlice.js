import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const asyncGetIp = createAsyncThunk(
  "GetIpSlice/asyncGetIp",
  async () => {
    const resp = await (await fetch("https://jsonip.com")).json();
    return resp.ip;
  }
);

const GetIpSlice = createSlice({
  name: "GetIpSlice",
  initialState: {
    value: "",
    status: "done",
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetIp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(asyncGetIp.fulfilled, (state, action) => {
        state.value = action.payload;
        state.status = "done";
      })
      .addCase(asyncGetIp.rejected, (state) => {
        state.status = "fail";
      });
  },
});

export default GetIpSlice.reducer;
