import "@testing-library/jest-dom";
import moxios from "moxios";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import {
  login,
  logout,
  register,
  sendPasswordToken,
  resetPassword,
} from "../actions/userActions";

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
} from "../constants/userConstants";

const mockStore = configureMockStore([thunk]);
const initialState = { userInfo: null };

describe("Test login action", () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
    localStorage.clear();
  });

  it("login credentials are succesfully returned", () => {
    const expectedLoginData = [
      {
        refresh: "token123",
        access: "token123",
        id: 1,
        first_name: "John",
        token: "token123",
      },
    ];
    jest.spyOn(window.localStorage.__proto__, "setItem");

    moxios.wait(function () {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [
          {
            refresh: "token123",
            access: "token123",
            id: 1,
            first_name: "John",
            token: "token123",
          },
        ],
      });
    });

    const expectedActions = [
      { type: USER_LOGIN_REQUEST },
      {
        type: USER_LOGIN_SUCCESS,
        payload: expectedLoginData,
      },
    ];

    return store.dispatch(login("email@email.com", "password")).then(() => {
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "userInfo",
        JSON.stringify(expectedLoginData)
      );
    });
  });

  it("login credentials raises an error", () => {
    const expectedLoginData = "Request failed with status code 401";
    moxios.wait(function () {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: [
          {
            detail: "error",
          },
        ],
      });
    });

    const expectedActions = [
      { type: USER_LOGIN_REQUEST },
      {
        type: USER_LOGIN_FAILURE,
        payload: expectedLoginData,
      },
    ];

    return store.dispatch(login("email@email.com", "password")).then(() => {
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
  });
});

describe("Test logout action", () => {
  const userInfo = [
    {
      refresh: "token123",
      access: "token123",
      id: 1,
      first_name: "John",
      token: "token123",
    },
  ];
  let store;

  beforeEach(() => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    store = mockStore(initialState);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("successful logout", () => {
    const expectedActions = [{ type: USER_LOGOUT }];
    jest.spyOn(window.localStorage.__proto__, "removeItem");

    store.dispatch(logout());
    const actualActions = store.getActions();
    expect(actualActions).toEqual(expectedActions);
    expect(localStorage.removeItem).toHaveBeenCalledWith("userInfo");
  });
});

describe("Test register action", () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it("user succesfully creates an account", () => {
    const expectedRegisterData = [
      {
        id: 1,
        first_name: "John",
        token: "token123",
      },
    ];

    moxios.wait(function () {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [
          {
            id: 1,
            first_name: "John",
            token: "token123",
          },
        ],
      });
    });

    const expectedActions = [
      { type: USER_REGISTER_REQUEST },
      {
        type: USER_REGISTER_SUCCESS,
        payload: expectedRegisterData,
      },
      { type: USER_LOGIN_SUCCESS, payload: expectedRegisterData },
    ];

    return store
      .dispatch(register("John", "Doe", "john@email.com", "Password123"))
      .then(() => {
        const actualActions = store.getActions();
        expect(actualActions).toEqual(expectedActions);
      });
  });

  it("user already exists error", () => {
    const expectedRegisterData = "Request failed with status code 500";
    moxios.wait(function () {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: [
          {
            detail: "error",
          },
        ],
      });
    });

    const expectedActions = [
      { type: USER_REGISTER_REQUEST },
      {
        type: USER_REGISTER_FAIL,
        payload: expectedRegisterData,
      },
    ];

    return store
      .dispatch(register("John", "Doe", "john@email.com", "Password123"))
      .then(() => {
        const actualActions = store.getActions();
        expect(actualActions).toEqual(expectedActions);
      });
  });
});

describe("Test send password token action", () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it("password token request is successful", () => {
    moxios.wait(function () {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [
          {
            status: "ok",
          },
        ],
      });
    });

    const expectedActions = [
      { type: USER_PASSWORD_RESET_REQUEST },
      {
        type: USER_PASSWORD_RESET_SUCCESS,
      },
    ];

    return store.dispatch(sendPasswordToken("email@email.com")).then(() => {
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
  });

  it("account with email does not exist error", () => {
    const expectedTokenData = "Request failed with status code 400";
    moxios.wait(function () {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: [
          {
            email: "error",
          },
        ],
      });
    });

    const expectedActions = [
      { type: USER_PASSWORD_RESET_REQUEST },
      {
        type: USER_PASSWORD_RESET_FAIL,
        payload: expectedTokenData,
      },
    ];

    return store.dispatch(sendPasswordToken("email@email.com")).then(() => {
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
  });
});

describe("Test password reset action", () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it("password has been successfully reset", () => {
    moxios.wait(function () {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [
          {
            status: "ok",
          },
        ],
      });
    });

    const expectedActions = [
      { type: USER_PASSWORD_TOKEN_REQUEST },
      {
        type: USER_PASSWORD_TOKEN_SUCCESS,
      },
    ];

    return store.dispatch(resetPassword("token123", "Password123")).then(() => {
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
  });

  it("invalid token raises an error", () => {
    const expectedResetData = "Request failed with status code 404";
    moxios.wait(function () {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: [
          {
            detail: "error",
          },
        ],
      });
    });

    const expectedActions = [
      { type: USER_PASSWORD_TOKEN_REQUEST },
      {
        type: USER_PASSWORD_TOKEN_FAIL,
        payload: expectedResetData,
      },
    ];

    return store.dispatch(resetPassword("token123", "Password123")).then(() => {
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
  });
});
