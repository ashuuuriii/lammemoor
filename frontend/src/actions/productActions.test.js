import "@testing-library/jest-dom";
import moxios from "moxios";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import { getProductsList } from "./productActions";

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from "../constants/productConstants";

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
  });

  it("products data succesfully returned", () => {
    const expectedListData = [
      {
        id: 0,
        name: "prod1",
        image: "http://image-url/1",
        pdf: "http://pdf-url/1",
        category: 1,
        description: "description",
        rating: 3.5,
        n_reviews: 6,
        price: 12.75,
        pdf_price: 10.0,
        n_stock: 1,
        created_at: "timestamp",
        user: 1,
      },
      {
        id: 1,
        name: "prod2",
        image: "http://image-url/2",
        pdf: "http://pdf-url/2",
        category: 5,
        description: "description",
        rating: 2.5,
        n_reviews: 6,
        price: 10.75,
        pdf_price: 6.0,
        n_stock: 3,
        created_at: "timestamp",
        user: 1,
      },
    ];

    moxios.wait(function () {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [
          {
            id: 0,
            name: "prod1",
            image: "http://image-url/1",
            pdf: "http://pdf-url/1",
            category: 1,
            description: "description",
            rating: 3.5,
            n_reviews: 6,
            price: 12.75,
            pdf_price: 10.0,
            n_stock: 1,
            created_at: "timestamp",
            user: 1,
          },
          {
            id: 1,
            name: "prod2",
            image: "http://image-url/2",
            pdf: "http://pdf-url/2",
            category: 5,
            description: "description",
            rating: 2.5,
            n_reviews: 6,
            price: 10.75,
            pdf_price: 6.0,
            n_stock: 3,
            created_at: "timestamp",
            user: 1,
          },
        ],
      });
    });

    const expectedActions = [
      { type: PRODUCT_LIST_REQUEST },
      {
        type: PRODUCT_LIST_SUCCESS,
        payload: expectedListData,
      },
    ];

    return store.dispatch(getProductsList()).then(() => {
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
  });

  it("products data raises an error", () => {
    const expectedListData = "Request failed with status code 404";
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
      { type: PRODUCT_LIST_REQUEST },
      {
        type: PRODUCT_LIST_FAIL,
        payload: expectedListData,
      },
    ];

    return store.dispatch(getProductsList()).then(() => {
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
  });
});
