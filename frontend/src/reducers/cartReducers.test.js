import "@testing-library/jest-dom";

import { cartReducer } from "./cartReducer";

import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_CLEAR_ITEMS,
} from "../constants/cartConstants";

const initialState = { cartItems: [] };

describe("Test cartReducer", () => {
  let state;

  beforeEach(() => {
    state = initialState;
  });

  it("test CART_ADD_ITEM w/o exist item", () => {
    const newItem = {
      product: 1,
      name: "prod1",
      image: "image",
      price: 5.51,
      nInStock: 2,
      qty: 2,
      itemType: "type",
    };
    const expectedState = { ...state, cartItems: [newItem] };

    const reducer = cartReducer(state, {
      type: CART_ADD_ITEM,
      payload: newItem,
    });
    expect(reducer).toEqual(expectedState);
  });

  it("test test CART_ADD_ITEM w/ exist item", () => {
    const existItem = {
      product: 1,
      name: "prod1",
      image: "image",
      price: 5.51,
      nInStock: 2,
      qty: 2,
      itemType: "type",
    };
    const newItem = {
      product: 1,
      name: "prod1",
      image: "image",
      price: 5.51,
      nInStock: 2,
      qty: 5, // use case: changing quantities
      itemType: "type",
    };
    const expectedState = { ...state, cartItems: [newItem] };

    cartReducer(state, {
      type: CART_ADD_ITEM,
      payload: existItem,
    });
    const reducer = cartReducer(state, {
      type: CART_ADD_ITEM,
      payload: newItem,
    });
    expect(reducer).toEqual(expectedState);
  });

  it("test CART_REMOVE_ITEM", () => {
    const newItem = {
      product: 1,
      name: "prod1",
      image: "image",
      price: 5.51,
      nInStock: 2,
      qty: 2,
      itemType: "type",
    };
    const expectedState = { ...state, cartItems: [] };

    cartReducer(state, {
      type: CART_ADD_ITEM,
      payload: newItem,
    });
    const reducer = cartReducer(state, {
      type: CART_REMOVE_ITEM,
      payload: {id: newItem.product, itemType: newItem.itemType},
    });
    expect(reducer).toEqual(expectedState);
  });

  it("test CART_CLEAR_ITEMS", () => {
    const newItem = {
      product: 1,
      name: "prod1",
      image: "image",
      price: 5.51,
      nInStock: 2,
      qty: 2,
      itemType: "type",
    };
    const expectedState = { ...state, cartItems: [] };

    cartReducer(state, {
      type: CART_ADD_ITEM,
      payload: newItem,
    });
    const reducer = cartReducer(state, {
      type: CART_CLEAR_ITEMS,
    });
    expect(reducer).toEqual(expectedState);
  });
});
