import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getArticle } from "@/lib/articles";
import { getJson } from "../api";

export const fetchArticle = createAsyncThunk("article/fetch", async (slug, { rejectWithValue }) => {
  try {
    const data = await getJson(`/api/articles/${encodeURIComponent(slug)}`);
    if (data?.article) return { slug, ...data };
    const local = getArticle(slug);
    if (local) return { slug, article: local, related: [], more: [] };
    return rejectWithValue("not-found");
  } catch (error) {
    const local = getArticle(slug);
    if (local) return { slug, article: local, related: [], more: [] };
    return rejectWithValue(error.message || "Could not load this article.");
  }
});

const articleSlice = createSlice({
  name: "article",
  initialState: {
    slug: "",
    article: null,
    related: [],
    more: [],
    status: "idle",
    error: "",
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchArticle.pending, (state, action) => {
        state.status = "loading";
        state.error = "";
        if (state.slug !== action.meta.arg) {
          state.article = null;
          state.related = [];
          state.more = [];
        }
        state.slug = action.meta.arg;
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        if (state.slug !== action.payload.slug) return;
        state.status = "idle";
        state.article = action.payload.article;
        state.related = action.payload.related || [];
        state.more = action.payload.more || [];
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        if (state.slug !== action.meta.arg) return;
        state.status = "failed";
        state.article = null;
        state.error = action.payload || "Could not load this article.";
      });
  },
});

export const selectArticle = (state) => state.article;
export default articleSlice.reducer;
