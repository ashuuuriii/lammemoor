import "@testing-library/jest-dom";
import moxios from "moxios";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import { addToCart, removeFromCart } from "./cartActions";

import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

const mockStore = configureMockStore([thunk]);
const initialState = { userLogin: { userInfo: null }, cart: { cartItems: [] } };

describe("Test addToCart action", () => {
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
    const expectedItemData = {
      product: 1,
      name: "prod1",
      image: "http://image",
      price: 5.51,
      nInStock: 2,
      qty: 2,
      itemType: "type",
    };
    jest.spyOn(window.localStorage.__proto__, "setItem");

    moxios.wait(function () {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          id: 1,
          name: "prod1",
          image: "http://image",
          pdf: "http://pdf",
          category: 1,
          description: "description",
          rating: null,
          n_reviews: 0,
          price: 5.51,
          pdf_price: 3.75,
          n_stock: 2,
          created_at: "timestamp",
          user: 1,
        },
      });
    });

    const expectedActions = [
      {
        type: CART_ADD_ITEM,
        payload: expectedItemData,
      },
    ];

    return store.dispatch(addToCart(1, 2, "type")).then(() => {
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "cartItems",
        JSON.stringify(initialState.cart.cartItems)
      );
    });
  });
});

describe("Test removeFromCart action", () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });
  afterEach(() => {
    localStorage.clear();
  });

  it("item is removed", () => {
    const expectedId = 1;
    jest.spyOn(window.localStorage.__proto__, "setItem");

    const expectedActions = [
      {
        type: CART_REMOVE_ITEM,
        payload: expectedId,
      },
    ];

    store.dispatch(removeFromCart(1));
    const actualActions = store.getActions();
    expect(actualActions).toEqual(expectedActions);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cartItems",
      JSON.stringify(initialState.cart.cartItems)
    );
  });
});
