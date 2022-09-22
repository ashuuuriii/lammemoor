import "@testing-library/jest-dom";

import {
  userLoginReducer,
  userRegisterReducer,
  userPasswordResetReducer,
  userPasswordTokenReducer,
  userUpdateDetailsReducer,
} from "../reducers/userReducers";
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
} from "../constants/userConstants";

const initialState = { userInfo: null };

describe("Test userLoginReducer", () => {
  let state;

  beforeEach(() => {
    state = {};
  });

  it("test USER_LOGIN_REQUEST", () => {
    const expectedState = { loading: true };

    const reducer = userLoginReducer(state, { type: USER_LOGIN_REQUEST });
    expect(reducer).toEqual(expectedState);
  });

  it("test USER_LOGIN_SUCCESS", () => {
    const expectedData = "success data";
    const expectedState = { loading: false, userInfo: expectedData };

    const reducer = userLoginReducer(state, {
      type: USER_LOGIN_SUCCESS,
      payload: expectedData,
    });
    expect(reducer).toEqual(expectedState);
  });

  it("test USER_LOGIN_FAILURE", () => {
    const expectedData = "failed data";
    const expectedState = { loading: false, error: expectedData };

    const reducer = userLoginReducer(state, {
      type: USER_LOGIN_FAILURE,
      payload: expectedData,
    });
    expect(reducer).toEqual(expectedState);
  });

  it("test USER_LOGIN_REQUEST", () => {
    const expectedState = {};

    const reducer = userLoginReducer(state, { type: USER_LOGOUT });
    expect(reducer).toEqual(expectedState);
  });
});

describe("Test userRegisterReducer", () => {
  let state;

  beforeEach(() => {
    state = {};
  });

  it("test USER_REGISTER_REQUEST", () => {
    const expectedState = { loading: true };

    const reducer = userRegisterReducer(state, { type: USER_REGISTER_REQUEST });
    expect(reducer).toEqual(expectedState);
  });

  it("test USER_REGISTER_SUCCESS", () => {
    const expectedData = "success data";
    const expectedState = { loading: false, userInfo: expectedData };

    const reducer = userRegisterReducer(state, {
      type: USER_REGISTER_SUCCESS,
      payload: expectedData,
    });
    expect(reducer).toEqual(expectedState);
  });

  it("test USER_REGISTER_FAIL", () => {
    const expectedData = "failed data";
    const expectedState = { loading: false, error: expectedData };

    const reducer = userRegisterReducer(state, {
      type: USER_REGISTER_FAIL,
      payload: expectedData,
    });
    expect(reducer).toEqual(expectedState);
  });

  it("test USER_LOGIN_REQUEST", () => {
    const expectedState = {};

    const reducer = userRegisterReducer(state, { type: USER_LOGOUT });
    expect(reducer).toEqual(expectedState);
  });
});

describe("Test userPasswordResetReducer", () => {
  let state;

  beforeEach(() => {
    state = {};
  });

  it("test USER_PASSWORD_RESET_REQUEST", () => {
    const expectedState = { loading: true };

    const reducer = userPasswordResetReducer(state, {
      type: USER_PASSWORD_RESET_REQUEST,
    });
    expect(reducer).toEqual(expectedState);
  });

  it("test USER_PASSWORD_RESET_SUCCESS", () => {
    const expectedData = true;
    const expectedState = { loading: false, success: expectedData };

    const reducer = userPasswordResetReducer(state, {
      type: USER_PASSWORD_RESET_SUCCESS,
      payload: expectedData,
    });
    expect(reducer).toEqual(expectedState);
  });

  it("test USER_PASSWORD_RESET_FAIL", () => {
    const expectedData = "failed data";
    const expectedState = { loading: false, error: expectedData };

    const reducer = userPasswordResetReducer(state, {
      type: USER_PASSWORD_RESET_FAIL,
      payload: expectedData,
    });
    expect(reducer).toEqual(expectedState);
  });

  it("test USER_PASSWORD_RESET_RESET", () => {
    const expectedState = {};

    const reducer = userPasswordResetReducer(state, {
      type: USER_PASSWORD_RESET_RESET,
    });
    expect(reducer).toEqual(expectedState);
  });
});

describe("Test userPasswordTokenReducer", () => {
  let state;

  beforeEach(() => {
    state = {};
  });

  it("test USER_PASSWORD_TOKEN_REQUEST", () => {
    const expectedState = { loading: true };

    const reducer = userPasswordTokenReducer(state, {
      type: USER_PASSWORD_TOKEN_REQUEST,
    });
    expect(reducer).toEqual(expectedState);
  });

  it("test USER_PASSWORD_TOKEN_SUCCESS", () => {
    const expectedData = true;
    const expectedState = { loading: false, success: expectedData };

    const reducer = userPasswordTokenReducer(state, {
      type: USER_PASSWORD_TOKEN_SUCCESS,
      payload: expectedData,
    });
    expect(reducer).toEqual(expectedState);
  });

  it("test USER_PASSWORD_TOKEN_FAIL", () => {
    const expectedData = "failed data";
    const expectedState = { loading: false, error: expectedData };

    const reducer = userPasswordTokenReducer(state, {
      type: USER_PASSWORD_TOKEN_FAIL,
      payload: expectedData,
    });
    expect(reducer).toEqual(expectedState);
  });

  it("test USER_PASSWORD_TOKEN_RESET", () => {
    const expectedState = {};

    const reducer = userPasswordTokenReducer(state, {
      type: USER_PASSWORD_TOKEN_RESET,
    });
    expect(reducer).toEqual(expectedState);
  });
});

describe("Test userUpdateDetailsReducer", () => {
  let state;

  beforeEach(() => {
    state = {};
  });

  it("test USER_UPDATE_DETAILS_REQUEST", () => {
    const expectedState = { loading: true };

    const reducer = userUpdateDetailsReducer(state, {
      type: USER_UPDATE_DETAILS_REQUEST,
    });
    expect(reducer).toEqual(expectedState);
  });

  it("test USER_UPDATE_DETAILS_SUCCESS", () => {
    const expectedData = "success data";
    const expectedState = {
      loading: false,
      success: true,
      userInfo: expectedData,
    };

    const reducer = userUpdateDetailsReducer(state, {
      type: USER_UPDATE_DETAILS_SUCCESS,
      payload: expectedData,
    });
    expect(reducer).toEqual(expectedState);
  });

  it("test UUSER_UPDATE_DETAILS_FAIL", () => {
    const expectedData = "failed data";
    const expectedState = { loading: false, error: expectedData };

    const reducer = userUpdateDetailsReducer(state, {
      type: USER_UPDATE_DETAILS_FAIL,
      payload: expectedData,
    });
    expect(reducer).toEqual(expectedState);
  });

  it("test USER_UPDATE_DETAILS_RESET", () => {
    const expectedState = {};

    const reducer = userUpdateDetailsReducer(state, {
      type: USER_UPDATE_DETAILS_RESET,
    });
    expect(reducer).toEqual(expectedState);
  });
});
