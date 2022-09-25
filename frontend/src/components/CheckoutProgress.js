import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutProgress = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/cart">
            <Nav.Link>
              Cart
              <div className="text-center">
                <i className="bi bi-check-circle"></i>
              </div>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            Cart
            <div className="text-center">
              <i className="bi bi-circle"></i>
            </div>
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/order">
            <Nav.Link>
              Shipping
              <div className="text-center">
                <i className="bi bi-check-circle"></i>
              </div>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            Shipping
            <div className="text-center">
              <i className="bi bi-circle"></i>
            </div>
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/order/confirm">
            <Nav.Link className="last">
              Confirm
              <div className="text-center">
                <i className="bi bi-check-circle"></i>
              </div>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            Confirm
            <div className="text-center">
              <i className="bi bi-circle"></i>
            </div>
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
            <Nav.Link className="last">
              Payment
              <div className="text-center">
                <i className="bi bi-check-circle"></i>
              </div>
            </Nav.Link>
        ) : (
          <Nav.Link disabled>
            Payment
            <div className="text-center">
              <i className="bi bi-circle"></i>
            </div>
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutProgress;
