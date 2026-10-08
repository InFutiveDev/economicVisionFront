import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getJson } from "../api";

export const hubKey = (slug, sub = "") => (sub ? `${slug}/${sub}` : slug);

export const fetchCategoryHub = createAsyncThunk(
  "categoryHub/fetch",
  async ({ slug, sub = "" }, { rejectWithValue }) => {
    try {
      const path = sub
        ? `/api/categories/${encodeURIComponent(slug)}/${encodeURIComponent(sub)}`
        : `/api/categories/${encodeURIComponent(slug)}`;
      const data = await getJson(`${path}?limit=1`);
      return {
        category: data?.category || null,
        article: data?.articles?.[0] || null,
        total: data?.total || 0,
      };
    } catch (error) {
      return rejectWithValue(error.message || "Could not load this section.");
    }
  },
  {
    condition({ slug, sub = "" }, { getState }) {
      const status = getState().categoryHub.entries[hubKey(slug, sub)]?.status;
      return status !== "loading" && status !== "succeeded";
    },
  }
);

const categoryHubSlice = createSlice({
  name: "categoryHub",
  initialState: { entries: {} },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCategoryHub.pending, (state, action) => {
        const key = hubKey(action.meta.arg.slug, action.meta.arg.sub);
        state.entries[key] = { ...state.entries[key], status: "loading", error: "" };
      })
      .addCase(fetchCategoryHub.fulfilled, (state, action) => {
        const key = hubKey(action.meta.arg.slug, action.meta.arg.sub);
        state.entries[key] = { status: "succeeded", error: "", ...action.payload };
      })
      .addCase(fetchCategoryHub.rejected, (state, action) => {
        const key = hubKey(action.meta.arg.slug, action.meta.arg.sub);
        state.entries[key] = {
          ...state.entries[key],
          status: "failed",
          error: action.payload || "Could not load this section.",
        };
      });
  },
});

export const selectHubEntry = (slug, sub = "") => (state) =>
  state.categoryHub.entries[hubKey(slug, sub)];

export default categoryHubSlice.reducer;
