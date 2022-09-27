import "@testing-library/jest-dom";
import moxios from "moxios";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import { createOrder, fetchPaymentIntent } from "./orderActions";

import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_PAYMENT_INTENT_REQUEST,
  ORDER_PAYMENT_INTENT_SUCCESS,
  ORDER_PAYMENT_INTENT_FAIL,
} from "../constants/orderContants";
import { CART_CLEAR_ITEMS } from "../constants/cartConstants";

const mockStore = configureMockStore([thunk]);
const initialState = {
  userLogin: { userInfo: "token123" },
  cartItems: [
    { product: 1, name: "product1" },
    { product: 2, name: "product2" },
  ],
};

describe("Test createOrder action", () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    moxios.install();
    localStorage.setItem("cartAddress", {
      first_name: "John",
      last_name: "Doe",
      address: "address",
    });
  });
  afterEach(() => {
    moxios.uninstall();
    localStorage.clear();
  });

  it("order successfully created", () => {
    const expectedOrderData = {
      total_price: 30.12,
      subtotal_price: 25.12,
      shipping_price: 5.0,
      shipping_address: {
        first_name: "John",
        last_name: "Doe",
        address: "address",
      },
    };
    jest.spyOn(window.localStorage.__proto__, "removeItem");

    moxios.wait(function () {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          total_price: 30.12,
          subtotal_price: 25.12,
          shipping_price: 5.0,
          shipping_address: {
            first_name: "John",
            last_name: "Doe",
            address: "address",
          },
        },
      });
    });

    const expectedActions = [
      { type: ORDER_CREATE_REQUEST },
      {
        type: ORDER_CREATE_SUCCESS,
        payload: expectedOrderData,
      },
      { type: CART_CLEAR_ITEMS },
    ];

    return store
      .dispatch(
        createOrder({
          shipping_address: {
            first_name: "John",
            last_name: "Doe",
            address: "address",
          },
          order_items: [
            { product: 1, name: "product1" },
            { product: 2, name: "product2" },
          ],
        })
      )
      .then(() => {
        const actualActions = store.getActions();
        expect(actualActions).toEqual(expectedActions);
        expect(localStorage.removeItem).toHaveBeenCalledWith("cartItems");
        expect(localStorage.removeItem).toHaveBeenCalledWith("cartAddress");
      });
  });

  it("no shipping address", () => {
    const expectedAddressData = "error";
    jest.spyOn(window.localStorage.__proto__, "removeItem");

    moxios.wait(function () {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          detail: "error",
        },
      });
    });

    const expectedActions = [
      { type: ORDER_CREATE_REQUEST },
      {
        type: ORDER_CREATE_FAIL,
        payload: expectedAddressData,
      },
    ];

    return store
      .dispatch(
        createOrder({
          shipping_address: {
            first_name: "John",
            last_name: "Doe",
            address: "address",
          },
          order_items: [
            { product: 1, name: "product1" },
            { product: 2, name: "product2" },
          ],
        })
      )
      .then(() => {
        const actualActions = store.getActions();
        expect(actualActions).toEqual(expectedActions);
        expect(localStorage.removeItem).not.toHaveBeenCalled();
      });
  });
});

describe("Test fetchPaymentIntent action", () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it("Payment intent succesfully fetched", () => {
    const expectedPaymentData = {
      clientSecret: "secretkey",
    };

    moxios.wait(function () {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          clientSecret: "secretkey",
        },
      });
    });

    const expectedActions = [
      { type: ORDER_PAYMENT_INTENT_REQUEST },
      {
        type: ORDER_PAYMENT_INTENT_SUCCESS,
        payload: expectedPaymentData,
      },
    ];

    return store.dispatch(fetchPaymentIntent(1)).then(() => {
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
  });

  it("invalid order id", () => {
    const expectedAddressData = "error";

    moxios.wait(function () {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 403,
        response: {
          detail: "error",
        },
      });
    });

    const expectedActions = [
      { type: ORDER_PAYMENT_INTENT_REQUEST },
      {
        type: ORDER_PAYMENT_INTENT_FAIL,
        payload: expectedAddressData,
      },
    ];

    return store.dispatch(fetchPaymentIntent(12)).then(() => {
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
  });
});
