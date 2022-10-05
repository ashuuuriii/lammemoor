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
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
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
              <LinkContainer to="/cart">
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
