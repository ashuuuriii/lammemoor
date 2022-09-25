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
  USER_UPDATE_ADDRESS_REQUEST,
  USER_UPDATE_ADDRESS_SUCCESS,
  USER_UPDATE_ADDRESS_FAIL,
  USER_REMOVE_ADDRESS_REQUEST,
  USER_REMOVE_ADDRESS_SUCCESS,
  USER_REMOVE_ADDRESS_FAIL,
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
  dispatch({ type: USER_GET_ADDRESSES_RESET });
  dispatch({ type: USER_GET_ADDRESS_DETAIL_RESET });

  localStorage.removeItem("cartAddress");
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

export const getUserAddresses = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_GET_ADDRESSES_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/accounts/addresses/", config);

    dispatch({
      type: USER_GET_ADDRESSES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_GET_ADDRESSES_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const addNewAddress = (address) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_ADD_ADDRESS_REQUEST,
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

    const { data } = await axios.post(
      `/api/accounts/addresses/`,
      address,
      config
    );

    dispatch({
      type: USER_ADD_ADDRESS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_ADD_ADDRESS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getUserAddressDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_GET_ADDRESS_DETAIL_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/accounts/addresses/${id}`, config);

    dispatch({
      type: USER_GET_ADDRESS_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_GET_ADDRESS_DETAIL_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateAddress = (id, address) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_ADDRESS_REQUEST,
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

    await axios.put(`/api/accounts/addresses/${id}/`, address, config);

    dispatch({
      type: USER_UPDATE_ADDRESS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_ADDRESS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const removeAddress =
  (id, inAddressBook) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_REMOVE_ADDRESS_REQUEST,
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

      await axios.put(
        `/api/accounts/addresses/remove/${id}`,
        { in_address_book: inAddressBook },
        config
      );

      dispatch({
        type: USER_REMOVE_ADDRESS_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: USER_REMOVE_ADDRESS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
