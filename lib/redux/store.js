import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "./slices/articleSlice";
import categoryHubReducer from "./slices/categoryHubSlice";
import homeReducer from "./slices/homeSlice";
import subscribeReducer from "./slices/subscribeSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      home: homeReducer,
      article: articleReducer,
      categoryHub: categoryHubReducer,
      subscribe: subscribeReducer,
    },
  });
}
