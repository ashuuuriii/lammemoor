import "@testing-library/jest-dom";
import moxios from "moxios";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import {
  getProductsList,
  getProductDetails,
  createReview,
} from "./productActions";

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

const mockStore = configureMockStore([thunk]);
const initialState = { userLogin: { userInfo: "token123" } };

describe("Test getProductsList action", () => {
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

    return store.dispatch(getProductsList("?page=1&category=1&category=5")).then(() => {
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

describe("Test getProductDetails action", () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it("product data succesfully returned", () => {
    const expectedDetailData = [
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
        ],
      });
    });

    const expectedActions = [
      { type: PRODUCT_DETAILS_REQUEST },
      {
        type: PRODUCT_DETAILS_SUCCESS,
        payload: expectedDetailData,
      },
      { type: PRODUCT_REVIEW_CREATE_RESET },
    ];

    return store.dispatch(getProductDetails(0)).then(() => {
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
  });

  it("product data raises an error", () => {
    const expectedDetailData = "Request failed with status code 404";
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
      { type: PRODUCT_DETAILS_REQUEST },
      {
        type: PRODUCT_DETAILS_FAIL,
        payload: expectedDetailData,
      },
    ];

    return store.dispatch(getProductDetails(0)).then(() => {
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
  });
});

describe("Test createReview action", () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it("review succesfully create", () => {
    const expectedMessage = { detail: "success" };

    moxios.wait(function () {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: [
          {
            detail: "success",
          },
        ],
      });
    });

    const expectedActions = [
      { type: PRODUCT_REVIEW_CREATE_REQUEST },
      {
        type: PRODUCT_REVIEW_CREATE_SUCCESS,
      },
    ];

    return store
      .dispatch(createReview({ product_id: 2, rating: 3 }))
      .then(() => {
        const actualActions = store.getActions();
        expect(actualActions).toEqual(expectedActions);
      });
  });

  it("review already exists raises an error", () => {
    const expectedDetailData = "error";
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
      { type: PRODUCT_REVIEW_CREATE_REQUEST },
      {
        type: PRODUCT_REVIEW_CREATE_FAIL,
        payload: expectedDetailData,
      },
    ];

    return store
      .dispatch(createReview({ product_id: 2, rating: 3 }))
      .then(() => {
        const actualActions = store.getActions();
        expect(actualActions).toEqual(expectedActions);
      });
  });
});
