import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getJson } from "../api";

export const fetchHome = createAsyncThunk("home/fetch", async (_, { rejectWithValue }) => {
  try {
    const data = await getJson("/api/home");
    return data || { hero: [], topStories: [], latest: { featured: null, updates: [] } };
  } catch (error) {
    return rejectWithValue(error.message || "Could not load the homepage.");
  }
});

const homeSlice = createSlice({
  name: "home",
  initialState: {
    hero: [],
    topStories: [],
    latest: { featured: null, updates: [] },
    status: "idle",
    error: "",
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchHome.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchHome.fulfilled, (state, action) => {
        state.status = "idle";
        state.hero = action.payload.hero || [];
        state.topStories = action.payload.topStories || [];
        state.latest = action.payload.latest || { featured: null, updates: [] };
      })
      .addCase(fetchHome.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Could not load the homepage.";
      });
  },
});

export const selectHome = (state) => state.home;
export default homeSlice.reducer;
