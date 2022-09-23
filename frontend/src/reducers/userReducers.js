import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_PASSWORD_RESET_REQUEST,
  USER_PASSWORD_RESET_SUCCESS,
  USER_PASSWORD_RESET_FAIL,
  USER_PASSWORD_RESET_RESET,
  USER_PASSWORD_TOKEN_REQUEST,
  USER_PASSWORD_TOKEN_SUCCESS,
  USER_PASSWORD_TOKEN_FAIL,
  USER_PASSWORD_TOKEN_RESET,
  USER_UPDATE_DETAILS_REQUEST,
  USER_UPDATE_DETAILS_SUCCESS,
  USER_UPDATE_DETAILS_FAIL,
  USER_UPDATE_DETAILS_RESET,
  USER_GET_ADDRESSES_REQUEST,
  USER_GET_ADDRESSES_SUCCESS,
  USER_GET_ADDRESSES_FAIL,
  USER_GET_ADDRESSES_RESET,
  USER_GET_ADDRESS_DETAIL_REQUEST,
  USER_GET_ADDRESS_DETAIL_SUCCESS,
  USER_GET_ADDRESS_DETAIL_FAIL,
  USER_GET_ADDRESS_DETAIL_RESET,
  USER_ADD_ADDRESS_REQUEST,
  USER_ADD_ADDRESS_SUCCESS,
  USER_ADD_ADDRESS_FAIL,
  USER_ADD_ADDRESS_RESET,
  USER_UPDATE_ADDRESS_REQUEST,
  USER_UPDATE_ADDRESS_SUCCESS,
  USER_UPDATE_ADDRESS_FAIL,
  USER_UPDATE_ADDRESS_RESET,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAILURE:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userPasswordResetReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PASSWORD_RESET_REQUEST:
      return { loading: true };
    case USER_PASSWORD_RESET_SUCCESS:
      return { loading: false, success: true };
    case USER_PASSWORD_RESET_FAIL:
      return { loading: false, error: action.payload };
    case USER_PASSWORD_RESET_RESET:
      return {};
    default:
      return state;
  }
};

export const userPasswordTokenReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PASSWORD_TOKEN_REQUEST:
      return { loading: true };
    case USER_PASSWORD_TOKEN_SUCCESS:
      return { loading: false, success: true };
    case USER_PASSWORD_TOKEN_FAIL:
      return { loading: false, error: action.payload };
    case USER_PASSWORD_TOKEN_RESET:
      return {};
    default:
      return state;
  }
};

export const userUpdateDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_DETAILS_REQUEST:
      return { loading: true };
    case USER_UPDATE_DETAILS_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_UPDATE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_DETAILS_RESET:
      return {};

    default:
      return state;
  }
};

export const userShippingAddressReducer = (
  state = { userAddresses: [] },
  action
) => {
  switch (action.type) {
    case USER_GET_ADDRESSES_REQUEST:
      return { loading: true };
    case USER_GET_ADDRESSES_SUCCESS:
      return { loading: false, userAddresses: action.payload };
    case USER_GET_ADDRESSES_FAIL:
      return { loading: false, error: action.payload };
    case USER_GET_ADDRESSES_RESET:
      return { userAddresses: [] };
    default:
      return state;
  }
};

export const userShippingAddressDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_GET_ADDRESS_DETAIL_REQUEST:
      return { loading: true };
    case USER_GET_ADDRESS_DETAIL_SUCCESS:
      return { loading: false, address: action.payload };
    case USER_GET_ADDRESS_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    case USER_GET_ADDRESS_DETAIL_RESET:
      return {};
    default:
      return state;
  }
};

export const userAddAddressReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ADD_ADDRESS_REQUEST:
      return { loading: true };
    case USER_ADD_ADDRESS_SUCCESS:
      return { loading: false, success: true };
    case USER_ADD_ADDRESS_FAIL:
      return { loading: false, error: action.payload };
    case USER_ADD_ADDRESS_RESET:
      return {};
    default:
      return state;
  }
};

export const userUpdateAddressReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_ADDRESS_REQUEST:
      return { loading: true };
    case USER_UPDATE_ADDRESS_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_ADDRESS_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_ADDRESS_RESET:
      return {};
    default:
      return state;
  }
};