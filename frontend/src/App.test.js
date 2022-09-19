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
import Header from "./components/Header";
import Footer from "./components/Footer";

jest.mock("./screens/HomeScreen");
jest.mock("./screens/LoginScreen");
jest.mock("./screens/RegistrationScreen");
jest.mock("./screens/PasswordResetScreen");
jest.mock("./screens/PasswordResetTokenScreen");
jest.mock("./components/Header");
jest.mock("./components/Footer");

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
});
