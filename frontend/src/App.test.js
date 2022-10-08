import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import PasswordResetScreen from "./screens/PasswordResetScreen";
import PasswordResetTokenScreen from "./screens/PasswordResetTokenScreen";
import ManageAccountScreen from "./screens/ManageAccountScreen";
import EditAddressScreen from "./screens/EditAddressScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import CartScreen from "./screens/CartScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderConfirmScreen from "./screens/OrderConfirmScreen";
import OrderListScreen from "./screens/OrderListScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PaymentConfirmScreen from "./screens/PaymentConfirmScreen";
import ContactScreen from "./screens/ContactScreen";
import NotFoundScreen from "./screens/NotFoundScreen";
import AboutScreen from "./screens/AboutScreen";

import Header from "./components/Header";
import Footer from "./components/Footer";

jest.mock("./screens/HomeScreen");
jest.mock("./screens/LoginScreen");
jest.mock("./screens/RegistrationScreen");
jest.mock("./screens/PasswordResetScreen");
jest.mock("./screens/PasswordResetTokenScreen");
jest.mock("./components/Header");
jest.mock("./components/Footer");
jest.mock("./screens/ManageAccountScreen");
jest.mock("./screens/EditAddressScreen");
jest.mock("./screens/ProductListScreen");
jest.mock("./screens/ProductDetailScreen");
jest.mock("./screens/CartScreen");
jest.mock("./screens/OrderScreen");
jest.mock("./screens/OrderConfirmScreen");
jest.mock("./screens/OrderListScreen");
jest.mock("./screens/OrderDetailScreen");
jest.mock("./screens/PaymentScreen");
jest.mock("./screens/PaymentConfirmScreen");
jest.mock("./screens/ContactScreen");
jest.mock("./screens/NotFoundScreen");
jest.mock("./screens/AboutScreen");

describe("Test app routing", () => {
  it("should render header navbar and homepage on default route", () => {
    Header.mockImplementation(() => <div>Page Header Mock</div>);
    HomeScreen.mockImplementation(() => <div>Homescreen Mock</div>);
    Footer.mockImplementation(() => <div>Page Footer Mock</div>);
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Page Header Mock")).toBeInTheDocument();
    expect(screen.getByText("Homescreen Mock")).toBeInTheDocument();
    expect(screen.getByText("Page Footer Mock")).toBeInTheDocument();
  });

  it("should render header navbar and login screen on /login route", () => {
    Header.mockImplementation(() => <div>Page Header Mock</div>);
    LoginScreen.mockImplementation(() => <div>LoginScreen Mock</div>);
    Footer.mockImplementation(() => <div>Page Footer Mock</div>);
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Page Header Mock")).toBeInTheDocument();
    expect(screen.getByText("LoginScreen Mock")).toBeInTheDocument();
    expect(screen.getByText("Page Footer Mock")).toBeInTheDocument();
  });

  it("should render header navbar and registration screen on /register route", () => {
    Header.mockImplementation(() => <div>Page Header Mock</div>);
    RegistrationScreen.mockImplementation(() => (
      <div>RegistrationScreen Mock</div>
    ));
    Footer.mockImplementation(() => <div>Page Footer Mock</div>);
    render(
      <MemoryRouter initialEntries={["/register"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Page Header Mock")).toBeInTheDocument();
    expect(screen.getByText("RegistrationScreen Mock")).toBeInTheDocument();
  });

  it("should render header navbar and password reset screen on /accounts/password_reset/ route", () => {
    Header.mockImplementation(() => <div>Page Header Mock</div>);
    PasswordResetScreen.mockImplementation(() => (
      <div>PasswordResetScreen Mock</div>
    ));
    Footer.mockImplementation(() => <div>Page Footer Mock</div>);
    render(
      <MemoryRouter initialEntries={["/accounts/password_reset/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Page Header Mock")).toBeInTheDocument();
    expect(screen.getByText("PasswordResetScreen Mock")).toBeInTheDocument();
    expect(screen.getByText("Page Footer Mock")).toBeInTheDocument();
  });

  it("should render header navbar and password reset token screen on /accounts/password_reset/reset route", () => {
    Header.mockImplementation(() => <div>Page Header Mock</div>);
    PasswordResetTokenScreen.mockImplementation(() => (
      <div>PasswordResetTokenScreen Mock</div>
    ));
    Footer.mockImplementation(() => <div>Page Footer Mock</div>);
    render(
      <MemoryRouter
        initialEntries={["/accounts/password_reset/reset?token=123"]}
      >
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Page Header Mock")).toBeInTheDocument();
    expect(
      screen.getByText("PasswordResetTokenScreen Mock")
    ).toBeInTheDocument();
    expect(screen.getByText("Page Footer Mock")).toBeInTheDocument();
  });

  it("should render header navbar and manage account screen on accounts/manage/", () => {
    Header.mockImplementation(() => <div>Page Header Mock</div>);
    ManageAccountScreen.mockImplementation(() => (
      <div>ManageAccountScreen Mock</div>
    ));
    Footer.mockImplementation(() => <div>Page Footer Mock</div>);
    render(
      <MemoryRouter initialEntries={["/accounts/manage/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Page Header Mock")).toBeInTheDocument();
    expect(screen.getByText("ManageAccountScreen Mock")).toBeInTheDocument();
    expect(screen.getByText("Page Footer Mock")).toBeInTheDocument();
  });

  it("should render header navbar and edit address screen on /edit_address/:id", () => {
    Header.mockImplementation(() => <div>Page Header Mock</div>);
    EditAddressScreen.mockImplementation(() => (
      <div>EditAddressScreen Mock</div>
    ));
    Footer.mockImplementation(() => <div>Page Footer Mock</div>);
    render(
      <MemoryRouter initialEntries={["/edit_address/1"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Page Header Mock")).toBeInTheDocument();
    expect(screen.getByText("EditAddressScreen Mock")).toBeInTheDocument();
    expect(screen.getByText("Page Footer Mock")).toBeInTheDocument();
  });

  it("should render header navbar and product list screen on /shop/", () => {
    Header.mockImplementation(() => <div>Page Header Mock</div>);
    ProductListScreen.mockImplementation(() => (
      <div>ProductListScreen Mock</div>
    ));
    Footer.mockImplementation(() => <div>Page Footer Mock</div>);
    render(
      <MemoryRouter initialEntries={["/shop/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Page Header Mock")).toBeInTheDocument();
    expect(screen.getByText("ProductListScreen Mock")).toBeInTheDocument();
    expect(screen.getByText("Page Footer Mock")).toBeInTheDocument();
  });

  it("should render header navbar and product detail screen on /product/:id", () => {
    Header.mockImplementation(() => <div>Page Header Mock</div>);
    ProductDetailScreen.mockImplementation(() => (
      <div>ProductDetailScreen Mock</div>
    ));
    Footer.mockImplementation(() => <div>Page Footer Mock</div>);
    render(
      <MemoryRouter initialEntries={["/product/1"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Page Header Mock")).toBeInTheDocument();
    expect(screen.getByText("ProductDetailScreen Mock")).toBeInTheDocument();
    expect(screen.getByText("Page Footer Mock")).toBeInTheDocument();
  });

  it("should render header navbar and cart screen on /cart/", () => {
    Header.mockImplementation(() => <div>Page Header Mock</div>);
    CartScreen.mockImplementation(() => <div>CartScreen Mock</div>);
    Footer.mockImplementation(() => <div>Page Footer Mock</div>);
    render(
      <MemoryRouter initialEntries={["/cart/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Page Header Mock")).toBeInTheDocument();
    expect(screen.getByText("CartScreen Mock")).toBeInTheDocument();
    expect(screen.getByText("Page Footer Mock")).toBeInTheDocument();
  });

  it("should render header navbar and order screen screen on /order/", () => {
    Header.mockImplementation(() => <div>Page Header Mock</div>);
    OrderScreen.mockImplementation(() => <div>OrderScreen Mock</div>);
    Footer.mockImplementation(() => <div>Page Footer Mock</div>);
    render(
      <MemoryRouter initialEntries={["/order/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Page Header Mock")).toBeInTheDocument();
    expect(screen.getByText("OrderScreen Mock")).toBeInTheDocument();
    expect(screen.getByText("Page Footer Mock")).toBeInTheDocument();
  });

  it("should render header navbar and order confirm screen on /order/confirm", () => {
    Header.mockImplementation(() => <div>Page Header Mock</div>);
    OrderConfirmScreen.mockImplementation(() => (
      <div>OrderConfirmScreen Mock</div>
    ));
    Footer.mockImplementation(() => <div>Page Footer Mock</div>);
    render(
      <MemoryRouter initialEntries={["/order/confirm"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Page Header Mock")).toBeInTheDocument();
    expect(screen.getByText("OrderConfirmScreen Mock")).toBeInTheDocument();
    expect(screen.getByText("Page Footer Mock")).toBeInTheDocument();
  });

  it("should render header navbar and order list screen on /accounts/orders/", () => {
    Header.mockImplementation(() => <div>Page Header Mock</div>);
    OrderListScreen.mockImplementation(() => <div>OrderListScreen Mock</div>);
    Footer.mockImplementation(() => <div>Page Footer Mock</div>);
    render(
      <MemoryRouter initialEntries={["/accounts/orders/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Page Header Mock")).toBeInTheDocument();
    expect(screen.getByText("OrderListScreen Mock")).toBeInTheDocument();
    expect(screen.getByText("Page Footer Mock")).toBeInTheDocument();
  });

  it("should render header navbar and order detail screen on accounts/orders/:id", () => {
    Header.mockImplementation(() => <div>Page Header Mock</div>);
    OrderDetailScreen.mockImplementation(() => (
      <div>OrderDetailScreen Mock</div>
    ));
    Footer.mockImplementation(() => <div>Page Footer Mock</div>);
    render(
      <MemoryRouter initialEntries={["/accounts/orders/1"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Page Header Mock")).toBeInTheDocument();
    expect(screen.getByText("OrderDetailScreen Mock")).toBeInTheDocument();
    expect(screen.getByText("Page Footer Mock")).toBeInTheDocument();
  });

  it("should render header navbar and payment screen on order/payment", () => {
    Header.mockImplementation(() => <div>Page Header Mock</div>);
    PaymentScreen.mockImplementation(() => <div>PaymentScreen Mock</div>);
    Footer.mockImplementation(() => <div>Page Footer Mock</div>);
    render(
      <MemoryRouter initialEntries={["/order/payment/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Page Header Mock")).toBeInTheDocument();
    expect(screen.getByText("PaymentScreen Mock")).toBeInTheDocument();
    expect(screen.getByText("Page Footer Mock")).toBeInTheDocument();
  });

  it("should render header navbar and payment confirm screen on /order/payment/payment_confirm/:id", () => {
    Header.mockImplementation(() => <div>Page Header Mock</div>);
    PaymentConfirmScreen.mockImplementation(() => (
      <div>PaymentConfirmScreen Mock</div>
    ));
    Footer.mockImplementation(() => <div>Page Footer Mock</div>);
    render(
      <MemoryRouter initialEntries={["/order/payment/payment_confirm/1"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Page Header Mock")).toBeInTheDocument();
    expect(screen.getByText("PaymentConfirmScreen Mock")).toBeInTheDocument();
    expect(screen.getByText("Page Footer Mock")).toBeInTheDocument();
  });

  it("should render header navbar and contact screen on /contact", () => {
    Header.mockImplementation(() => <div>Page Header Mock</div>);
    ContactScreen.mockImplementation(() => <div>ContactScreen Mock</div>);
    Footer.mockImplementation(() => <div>Page Footer Mock</div>);
    render(
      <MemoryRouter initialEntries={["/contact"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Page Header Mock")).toBeInTheDocument();
    expect(screen.getByText("ContactScreen Mock")).toBeInTheDocument();
    expect(screen.getByText("Page Footer Mock")).toBeInTheDocument();
  });

  it("should render header navbar and 404 screen on /*", () => {
    Header.mockImplementation(() => <div>Page Header Mock</div>);
    NotFoundScreen.mockImplementation(() => <div>NotFoundScreen Mock</div>);
    Footer.mockImplementation(() => <div>Page Footer Mock</div>);
    render(
      <MemoryRouter initialEntries={["/invalid_path"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Page Header Mock")).toBeInTheDocument();
    expect(screen.getByText("NotFoundScreen Mock")).toBeInTheDocument();
    expect(screen.getByText("Page Footer Mock")).toBeInTheDocument();
  });

  it("should render header navbar and about screen on /about", () => {
    Header.mockImplementation(() => <div>Page Header Mock</div>);
    AboutScreen.mockImplementation(() => <div>AboutScreen Mock</div>);
    Footer.mockImplementation(() => <div>Page Footer Mock</div>);
    render(
      <MemoryRouter initialEntries={["/about/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Page Header Mock")).toBeInTheDocument();
    expect(screen.getByText("AboutScreen Mock")).toBeInTheDocument();
    expect(screen.getByText("Page Footer Mock")).toBeInTheDocument();
  });
});
