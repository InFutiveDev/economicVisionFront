import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postJson } from "../api";

export const subscribeEmail = createAsyncThunk(
  "subscribe/submit",
  async ({ email, source, website }, { rejectWithValue }) => {
    try {
      return await postJson("/api/subscribe", { email, source, website });
    } catch (error) {
      return rejectWithValue(error.message || "Could not subscribe right now. Please try again.");
    }
  }
);

const subscribeSlice = createSlice({
  name: "subscribe",
  initialState: {
    dialogOpen: false,
    subscribedEmail: "",
  },
  reducers: {
    openSubscribe(state) {
      state.dialogOpen = true;
    },
    closeSubscribe(state) {
      state.dialogOpen = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(subscribeEmail.fulfilled, (state, action) => {
      state.subscribedEmail = action.meta.arg.email;
    });
  },
});

export const { openSubscribe, closeSubscribe } = subscribeSlice.actions;
export const selectSubscribeDialogOpen = (state) => state.subscribe.dialogOpen;
export default subscribeSlice.reducer;
