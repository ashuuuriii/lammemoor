import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Container,
  Button,
  Row,
  Col,
  Card,
  ListGroup,
  Image,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { HashLink } from "react-router-hash-link";

import Loader from "../components/Loader";
import Message from "../components/Message";
import { getOrderDetail } from "../actions/orderActions";

const OrderDetailScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderId = useParams().id;
  const orderDetail = useSelector((state) => state.orderDetail);
  const { loading, order, error } = orderDetail;

  useEffect(() => {
    dispatch(getOrderDetail(orderId));
  }, [dispatch, orderId]);

  return (
    <Container className="pt-4">
      <Button onClick={() => navigate(-1)}>Go back</Button>
      <h1 className="my-3">Order Details</h1>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {order && (
        <Row className="mx-0">
          <Row>
            Ordered on {order.created_at.substring(0, 10)} | Order # {order.id}
          </Row>
          <Row>
            <Card>
              <Card.Body>
                <Row>
                  <Col md={3}>
                    <p className="my-1">
                      <strong>Delivery Address</strong>
                    </p>
                    {order.shipping_address ? (
                      <div>
                        <p className="my-1">
                          {order.shipping_address.first_name}{" "}
                          {order.shipping_address.last_name}
                        </p>
                        <p className="my-1">{order.shipping_address.address}</p>
                        <p className="my-1">{order.shipping_address.city}</p>
                        <p className="my-1">{order.shipping_address.country}</p>
                        <p className="my-1">
                          {order.shipping_address.postal_code}
                        </p>
                      </div>
                    ) : (
                      <p>By email</p>
                    )}
                  </Col>
                  <Col md={3}>
                    <p className="my-1">
                      <strong>Is paid?</strong>
                    </p>
                    <p className="my-1">{order.is_paid ? "Yes" : "No"}</p>
                    <p className="my-1">
                      <strong>Is delivered?</strong>
                    </p>
                    <p className="my-1">{order.is_delivered ? "Yes" : "No"}</p>
                  </Col>
                  <Col md={6}>
                    <Row>
                      <strong>Order Summary</strong>
                    </Row>
                    <Row>
                      <Col>
                        <p className="my-1">Item(s) subtotal:</p>
                        <p className="my-1">Shipping:</p>
                        <p className="my-1">
                          <strong>Total:</strong>
                        </p>
                      </Col>
                      <Col>
                        <p className="my-1">£{order.subtotal_price}</p>
                        <p className="my-1">£{order.shipping_price}</p>
                        <p className="my-1">£{order.total_price}</p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Row>
          <Row>
            <Card className="my-3">
              <ListGroup variant="flush">
                {order.order_items.map((item) => (
                  <ListGroup.Item key={item.id}>
                    <Row className="align-items-center">
                      <Col xs={6} md={2}>
                        <Image src={item.image} alt={item.name} fluid />
                      </Col>
                      <Col xs={6} md={6}>
                        <Link to={`/products/${item.id}`}>
                          <p className="lead my-0">{item.name}</p>
                        </Link>
                        {item.type === "pdf" ? (
                          <p className="my-1">E-pattern</p>
                        ) : (
                          <p className="my-1">Paper pattern</p>
                        )}
                        <p className="my-1">
                          Quantity:{" "}
                          {item.type === "pdf" ? "-" : item.purchased_qty}
                        </p>
                        <p className="my-1">Price: £{item.price}</p>
                      </Col>
                      <Col md={4}>
                        <Row>
                          <Button className="mt-3" variant="primary">
                            Problem with order
                          </Button>
                        </Row>
                        <HashLink
                          to={`/product/${item.product}/#review-section`}
                          style={{ "text-decoration": "none" }}
                        >
                          <Row>
                            <Button
                              type="button"
                              className="my-3"
                              variant="secondary"
                            >
                              Write a review
                            </Button>
                          </Row>
                        </HashLink>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </Row>
        </Row>
      )}
    </Container>
  );
};

export default OrderDetailScreen;
