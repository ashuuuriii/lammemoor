import "@testing-library/jest-dom";

import {
  productListReducer,
  productDetailsReducer,
  productReviewCreateReducer,
} from "./productReducers";

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_REVIEW_CREATE_REQUEST,
  PRODUCT_REVIEW_CREATE_SUCCESS,
  PRODUCT_REVIEW_CREATE_FAIL,
  PRODUCT_REVIEW_CREATE_RESET,
} from "../constants/productConstants";

const initialState = { userInfo: null };

describe("Test productListReducer", () => {
  let state;

  beforeEach(() => {
    state = { ...initialState, products: [] };
  });

  it("test PRODUCT_LIST_REQUEST", () => {
    const expectedState = { loading: true, products: [] };

    const reducer = productListReducer(state, { type: PRODUCT_LIST_REQUEST });
    expect(reducer).toEqual(expectedState);
  });

  it("test PRODUCT_LIST_SUCCESS", () => {
    const expectedData = "success data";
    const expectedState = { loading: false, products: expectedData };

    const reducer = productListReducer(state, {
      type: PRODUCT_LIST_SUCCESS,
      payload: expectedData,
    });
    expect(reducer).toEqual(expectedState);
  });

  it("test UPRODUCT_LIST_FAIL", () => {
    const expectedData = "failed data";
    const expectedState = { loading: false, error: expectedData };

    const reducer = productListReducer(state, {
      type: PRODUCT_LIST_FAIL,
      payload: expectedData,
    });
    expect(reducer).toEqual(expectedState);
  });
});

describe("Test productDetailsReducer", () => {
  let state;

  beforeEach(() => {
    state = { product: { reviews: []} };
  });

  it("test PRODUCT_DETAILS_REQUEST", () => {
    const expectedState = { loading: true, ...state };

    const reducer = productDetailsReducer(state, {
      type: PRODUCT_DETAILS_REQUEST,
    });
    expect(reducer).toEqual(expectedState);
  });

  it("test PRODUCT_DETAILS_SUCCESS", () => {
    const expectedData = "success data";
    const expectedState = { loading: false, product: expectedData };

    const reducer = productDetailsReducer(state, {
      type: PRODUCT_DETAILS_SUCCESS,
      payload: expectedData,
    });
    expect(reducer).toEqual(expectedState);
  });

  it("test PRODUCT_DETAILS_FAIL", () => {
    const expectedData = "failed data";
    const expectedState = { loading: false, error: expectedData };

    const reducer = productDetailsReducer(state, {
      type: PRODUCT_DETAILS_FAIL,
      payload: expectedData,
    });
    expect(reducer).toEqual(expectedState);
  });
});

describe("Test productReviewCreateReducer", () => {
  let state;

  beforeEach(() => {
    state = { ...initialState, product: { reviews: [] } };
  });

  it("test PRODUCT_REVIEW_CREATE_REQUEST", () => {
    const expectedState = { loading: true };

    const reducer = productReviewCreateReducer(state, {
      type: PRODUCT_REVIEW_CREATE_REQUEST,
    });
    expect(reducer).toEqual(expectedState);
  });

  it("test PRODUCT_REVIEW_CREATE_SUCCESS", () => {
    const expectedState = { loading: false, success: true };

    const reducer = productReviewCreateReducer(state, {
      type: PRODUCT_REVIEW_CREATE_SUCCESS,
    });
    expect(reducer).toEqual(expectedState);
  });

  it("test PRODUCT_REVIEW_CREATE_FAIL", () => {
    const expectedData = "failed data";
    const expectedState = { loading: false, error: expectedData };

    const reducer = productReviewCreateReducer(state, {
      type: PRODUCT_REVIEW_CREATE_FAIL,
      payload: expectedData,
    });
    expect(reducer).toEqual(expectedState);
  });

  it("test PRODUCT_REVIEW_CREATE_RESET", () => {
    const expectedState = {};

    const reducer = productReviewCreateReducer(state, {
      type: PRODUCT_REVIEW_CREATE_RESET,
    });
    expect(reducer).toEqual(expectedState);
  });
});
