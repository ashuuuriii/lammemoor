import "@testing-library/jest-dom";

import { orderCreateReducer } from "./orderReducers";

import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_RESET,
} from "../constants/orderContants";

const initialState = {};

describe("Test orderCreateReduce", () => {
  let state;

  beforeEach(() => {
    state = { ...initialState, products: [] };
  });

  it("test ORDER_CREATE_REQUEST", () => {
    const expectedState = { loading: true };

    const reducer = orderCreateReducer(state, { type: ORDER_CREATE_REQUEST });
    expect(reducer).toEqual(expectedState);
  });

  it("test ORDER_CREATE_SUCCESS", () => {
    const expectedData = "order data";
    const expectedState = {
      loading: false,
      success: true,
      order: expectedData,
    };

    const reducer = orderCreateReducer(state, {
      type: ORDER_CREATE_SUCCESS,
      payload: expectedData,
    });
    expect(reducer).toEqual(expectedState);
  });

  it("ORDER_CREATE_FAIL", () => {
    const expectedData = "failed messsage";
    const expectedState = { loading: false, error: expectedData };

    const reducer = orderCreateReducer(state, {
      type: ORDER_CREATE_FAIL,
      payload: expectedData,
    });
    expect(reducer).toEqual(expectedState);
  });

  it("ORDER_CREATE_RESET", () => {
    const expectedState = {};

    const reducer = orderCreateReducer(state, {
      type: ORDER_CREATE_RESET,
    });
    expect(reducer).toEqual(expectedState);
  });
});
