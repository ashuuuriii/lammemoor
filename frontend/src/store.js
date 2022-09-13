import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {},
  devTools: true,
  preloadedState: {},
});

export default store;