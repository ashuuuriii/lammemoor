import "@testing-library/jest-dom";

import { productListReducer } from "./productReducers";

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
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
