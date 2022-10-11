import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../actions/userActions";

import logo from "../assets/images/logo.png";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [cartFull, setCartFull] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0) {
      setCartFull(false);
    } else {
      setCartFull(true);
    }
  }, [cartItems]);

  return (
    <header>
      <Navbar
        bg="primary"
        variant="dark"
        collapseOnSelect
        fixed="top"
        expand="md"
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="brand-font">
              <Image src={logo} width="30" height="30" fluid className="mx-2" />
              Lammermoor
            </Navbar.Brand>
          </LinkContainer>
          <div className="d-flex">
            <Nav>
              <LinkContainer to="/cart" className="d-block d-md-none mx-3">
                <Nav.Link>
                  {cartFull ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      class="bi bi-cart-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      class="bi bi-cart"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                  )}
                </Nav.Link>
              </LinkContainer>
            </Nav>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </div>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/shop">
                <Nav.Link>Shop</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/about">
                <Nav.Link>About Us</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/contact">
                <Nav.Link>Contact Us</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav>
              <LinkContainer to="/cart" className="d-none d-md-block">
                <Nav.Link>
                  {cartFull ? (
                    <i className="bi bi-cart-fill"></i>
                  ) : (
                    <i className="bi bi-cart"></i>
                  )}
                  Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title="Manage Account" id={userInfo.first_name}>
                  <NavDropdown.Header>
                    <div>Hello,</div>
                    <div className="lead">{userInfo.first_name}</div>
                  </NavDropdown.Header>
                  <LinkContainer to="/accounts/manage">
                    <NavDropdown.Item>Your Account</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/accounts/orders">
                    <NavDropdown.Item>Your Orders</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="bi bi-person"></i>Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
