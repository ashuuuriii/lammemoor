import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
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
            <Navbar.Brand>Lammermoor</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/shop">
                <Nav.Link>Shop</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/blog">
                <Nav.Link>Blog</Nav.Link>
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
                  <i className="bi bi-cart"></i>Cart
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="bi bi-person"></i>Login
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
