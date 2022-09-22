import axios from "axios";

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
  USER_PASSWORD_TOKEN_REQUEST,
  USER_PASSWORD_TOKEN_SUCCESS,
  USER_PASSWORD_TOKEN_FAIL,
  USER_UPDATE_DETAILS_REQUEST,
  USER_UPDATE_DETAILS_SUCCESS,
  USER_UPDATE_DETAILS_FAIL,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/accounts/login",
      {
        username: email,
        password: password,
      },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");

  dispatch({
    type: USER_LOGOUT,
  });
};

export const register =
  (firstName, lastName, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/accounts/register",
        {
          first_name: firstName,
          last_name: lastName,
          username: email,
          password: password,
        },
        config
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const sendPasswordToken = (email) => async (dispatch) => {
  try {
    dispatch({ type: USER_PASSWORD_RESET_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    await axios.post("/api/accounts/password_reset/", { email: email }, config);

    dispatch({ type: USER_PASSWORD_RESET_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_PASSWORD_RESET_FAIL,
      payload:
        error.response && error.response.data.email // django-rest-passwordreset response
          ? error.response.data.email
          : error.message,
    });
  }
};

export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_PASSWORD_TOKEN_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    await axios.post(
      `/api/accounts/password_reset/confirm/?token=${token}`,
      {
        token: token,
        password: password,
      },
      config
    );

    dispatch({ type: USER_PASSWORD_TOKEN_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_PASSWORD_TOKEN_FAIL,
      payload:
        error.response && error.response.data.email
          ? error.response.data.email
          : error.message,
    });
  }
};

export const updateUserDetails = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/accounts/user_detail/${user.id}`,
      user,
      config
    );

    dispatch({
      type: USER_UPDATE_DETAILS_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
