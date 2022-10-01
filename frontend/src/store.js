import { configureStore } from "@reduxjs/toolkit";
import {
  userLoginReducer,
  userRegisterReducer,
  userPasswordResetReducer,
  userPasswordTokenReducer,
  userUpdateDetailsReducer,
  userShippingAddressReducer,
  userAddAddressReducer,
  userShippingAddressDetailReducer,
  userUpdateAddressReducer,
  userRemoveAddressReducer,
} from "./reducers/userReducers";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducer";
import {
  orderCreateReducer,
  orderPaymentIntentReducer,
  orderDetailReducer,
} from "./reducers/orderReducers";

const preloadedUserInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const cartItemsFromLocalStoreage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const store = configureStore({
  reducer: {
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userPasswordReset: userPasswordResetReducer,
    userPasswordToken: userPasswordTokenReducer,
    userUpdateDetails: userUpdateDetailsReducer,
    userShippingAddress: userShippingAddressReducer,
    userShippingAddressDetail: userShippingAddressDetailReducer,
    userAddAddress: userAddAddressReducer,
    userUpdateAddress: userUpdateAddressReducer,
    userRemoveAddress: userRemoveAddressReducer,
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    orderCreate: orderCreateReducer,
    orderPaymentIntent: orderPaymentIntentReducer,
    orderDetail: orderDetailReducer,
  },
  devTools: true,
  preloadedState: {
    userLogin: { userInfo: preloadedUserInfo },
    cart: { cartItems: cartItemsFromLocalStoreage },
  },
});

export default store;
