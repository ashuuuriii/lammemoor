import { configureStore } from "@reduxjs/toolkit";
import { userLoginReducer } from "./reducers/userReducers";

const store = configureStore({
  reducer: {
    userLogin: userLoginReducer,
  },
  devTools: true,
  preloadedState: {},
});

export default store;