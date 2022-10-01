import "@testing-library/jest-dom";

import {
  orderCreateReducer,
  orderPaymentIntentReducer,
  orderDetailReducer,
} from "./orderReducers";

import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_RESET,
  ORDER_PAYMENT_INTENT_REQUEST,
  ORDER_PAYMENT_INTENT_SUCCESS,
  ORDER_PAYMENT_INTENT_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_RESET,
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

describe("Test orderPaymentIntentReducer", () => {
  let state;

  beforeEach(() => {
    state = initialState;
  });

  it("test ORDER_PAYMENT_INTENT_REQUEST", () => {
    const expectedState = { loading: true };

    const reducer = orderPaymentIntentReducer(state, {
      type: ORDER_PAYMENT_INTENT_REQUEST,
    });
    expect(reducer).toEqual(expectedState);
  });

  it("test ORDER_PAYMENT_INTENT_SUCCESS", () => {
    const clientSecret = "secretkey";
    const expectedState = {
      loading: false,
      clientSecret: clientSecret,
    };

    const reducer = orderPaymentIntentReducer(state, {
      type: ORDER_PAYMENT_INTENT_SUCCESS,
      payload: { clientSecret },
    });
    expect(reducer).toEqual(expectedState);
  });

  it("ORDER_PAYMENT_INTENT_FAIL", () => {
    const expectedData = "failed messsage";
    const expectedState = { loading: false, error: expectedData };

    const reducer = orderPaymentIntentReducer(state, {
      type: ORDER_PAYMENT_INTENT_FAIL,
      payload: expectedData,
    });
    expect(reducer).toEqual(expectedState);
  });
});

describe("Test orderDetailReducer", () => {
  let state;

  beforeEach(() => {
    state = initialState;
  });

  it("test ORDER_DETAILS_REQUEST", () => {
    const expectedState = { loading: true };

    const reducer = orderDetailReducer(state, {
      type: ORDER_DETAILS_REQUEST,
    });
    expect(reducer).toEqual(expectedState);
  });

  it("test OORDER_DETAILS_SUCCESS", () => {
    const expectedOrder = { id: 1, total_price: 1.26 };
    const expectedState = {
      loading: false,
      order: expectedOrder,
    };

    const reducer = orderDetailReducer(state, {
      type: ORDER_DETAILS_SUCCESS,
      payload: expectedOrder,
    });
    expect(reducer).toEqual(expectedState);
  });

  it("test ORDER_DETAILS_FAIL", () => {
    const expectedData = "failed messsage";
    const expectedState = { loading: false, error: expectedData };

    const reducer = orderDetailReducer(state, {
      type: ORDER_DETAILS_FAIL,
      payload: expectedData,
    });
    expect(reducer).toEqual(expectedState);
  });

  it("test ORDER_DETAILS_RESET", () => {
    const expectedState = {};

    const reducer = orderDetailReducer(state, {
      type: ORDER_DETAILS_RESET,
    });
    expect(reducer).toEqual(expectedState);
  });
});
