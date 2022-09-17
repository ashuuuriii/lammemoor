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
