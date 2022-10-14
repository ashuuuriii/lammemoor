import React, { useEffect } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { Container, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";

import PriceCard from "../components/PriceCard";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrderDetail } from "../actions/orderActions";

const PaymentConfirmScreen = () => {
  const dispatch = useDispatch();

  const { search } = useLocation();
  const success = search.split("redirect_status=")[1] === "succeeded";
  const { id: orderId } = useParams();

  const orderDetail = useSelector((state) => state.orderDetail);
  const { loading, order, error } = orderDetail;

  useEffect(() => {
    dispatch(getOrderDetail(orderId));
  }, [dispatch, orderId]);

  return (
    <>
      <Helmet>
        <title>Order Confirmed</title>
      </Helmet>
      <Container className="pt-4">
        <h1>Confirmation</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading ? (
          <Loader />
        ) : order ? (
          <Row>
            <Row>
              {success ? (
                <Row>
                  <Row>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="60"
                      height="60"
                      fill="currentColor"
                      className="bi bi-check2-circle text-success d-none d-md-block"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                      <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                    </svg>
                  </Row>
                  <Row>
                    <h2 className="text-center text-success my-3">
                      <i className="bi bi-check2-circle d-md-none"></i> Thank
                      you for your order
                    </h2>
                  </Row>
                </Row>
              ) : (
                <Row>
                  <Row>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="60"
                      height="60"
                      fill="currentColor"
                      className="bi bi-x-circle text-danger d-none d-md-block"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </Row>
                  <Row>
                    <h2 className="text-center text-danger my-3">
                      <i className="bi bi-x-circle d-md-none text-danger"></i>{" "}
                      Payment Failed
                    </h2>
                  </Row>
                </Row>
              )}
            </Row>
            <Row>
              <ListGroup variant="flush" className="my-3">
                {order.order_items.map((item) => (
                  <ListGroup.Item key={order.id}>
                    <Row className="align-items-center">
                      <Col xs={6} md={2}>
                        <Link to={`/product/${item.product}`}>
                          <Image src={item.image} alt={item.name} fluid />
                        </Link>
                      </Col>
                      <Col xs={6} md={10}>
                        <Row className="lead">{item.name}</Row>
                        <Row>
                          {item.type === "pdf" ? "E-pattern" : "Paper pattern"}
                        </Row>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Row>
            <Row>
              <Col md={8} className="my-3">
                <Card>
                  <Card.Header>
                    <h3>Shipping to</h3>
                  </Card.Header>
                  <Card.Body>
                    {order.shipping_address ? (
                      <div>
                        <div>
                          <strong>Name: </strong>
                          {order.shipping_address.first_name}{" "}
                          {order.shipping_address.last_name}
                        </div>
                        {order.shipping_address.phone_number ? (
                          <div>
                            <strong>Phone Number: </strong>
                            {order.shipping_address.phone_number}
                          </div>
                        ) : null}
                        <div>
                          <strong>Address:</strong>
                          <div>
                            {order.shipping_address.address},{" "}
                            {order.shipping_address.city}
                          </div>
                          <div>{order.shipping_address.country}</div>
                        </div>
                        {order.shipping_address.postal_code ? (
                          <div>
                            <strong>Postal Code: </strong>
                            {order.shipping_address.postal_code}
                          </div>
                        ) : null}
                      </div>
                    ) : (
                      <Row>
                        <p>
                          Your e-patterns have been dispatched to your account
                          email <strong>{order.user}</strong>
                        </p>
                        <p>
                          It may take a few minutes for your patterns to arrive
                          in your email.
                        </p>
                      </Row>
                    )}
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="my-3">
                <PriceCard orderObj={order} />
              </Col>
            </Row>
          </Row>
        ) : null}
      </Container>
    </>
  );
};

export default PaymentConfirmScreen;
//test : http://localhost:3000/order/payment/payment_confirm/69?payment_intent=pi_3Ln4JbDeRNtpFM5D13YpXP0N&payment_intent_client_secret=pi_3Ln4JbDeRNtpFM5D13YpXP0N_secret_ipfvLLEWzUim0Y65MmlYzeyfj&redirect_status=succeeded
