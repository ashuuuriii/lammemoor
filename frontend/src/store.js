import { configureStore } from "@reduxjs/toolkit";
import {
  userLoginReducer,
  userRegisterReducer,
  userPasswordResetReducer,
  userPasswordTokenReducer,
} from "./reducers/userReducers";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducer";

const preloadedUserInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const store = configureStore({
  reducer: {
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userPasswordReset: userPasswordResetReducer,
    userPasswordToken: userPasswordTokenReducer,
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
  },
  devTools: true,
  preloadedState: {
    userLogin: { userInfo: preloadedUserInfo },
  },
});

export default store;
