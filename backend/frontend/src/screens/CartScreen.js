import React from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Image,
  Form,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Message from "../components/Message";
import PriceCard from "../components/PriceCard";
import CheckoutProgress from "../components/CheckoutProgress";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const checkoutHandler = () => {
    if (!userInfo) {
      navigate("/login?redirect=/cart");
    } else {
      navigate("/order");
    }
  };

  const removeItemHandler = (id, itemType) => {
    dispatch(removeFromCart(id, itemType));
  };

  return (
    <Container className="pt-4">
      <CheckoutProgress step1 />
      <Row>
        <Col md={8}>
          <h2>Cart</h2>
          {cartItems.length === 0 ? (
            <Message variant="info">Your cart is empty.</Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row className="align-items-center">
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>
                      {item.itemType === "paper"
                        ? "Paper pattern"
                        : "E-pattern"}
                    </Col>
                    <Col md={2}>£{item.price}</Col>
                    <Col md={1}>
                      {item.itemType === "pdf" ? (
                        "-"
                      ) : (
                        <Form.Control
                          as="select"
                          value={item.itemType === "paper" ? item.qty : "-"}
                          onChange={(e) =>
                            dispatch(
                              addToCart(
                                item.product,
                                Number(e.target.value),
                                item.itemType
                              )
                            )
                          }
                        >
                          {[...Array(item.nInStock).keys()].map((x) => (
                            <option value={x + 1} key={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      )}
                    </Col>
                    <Col md={1}>
                      <Button
                        type="button"
                        onClick={() => removeItemHandler(item.product, item.itemType)}
                        variant="danger"
                        className="text-light"
                      >
                        <i className="bi bi-x"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Row>
            <PriceCard />
          </Row>
          <Row>
            <Button
              type="button"
              className="my-3"
              onClick={checkoutHandler}
              disabled={cartItems.length === 0}
            >
              Proceed to checkout
            </Button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CartScreen;
