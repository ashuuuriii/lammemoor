import React, { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  OverlayTrigger,
  Tooltip,
  Button,
  ListGroup,
  Image,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import Loader from "../components/Loader";
import Paginator from "../components/Paginator";
import { getOrdersList } from "../actions/orderActions";
import "../custom_properties.css";

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const currPath = window.location.pathname;

  const pageNumber = search ? search.split("=")[1] : 1;

  const orderList = useSelector((state) => state.orderList);
  const { loading, orders, page, pages } = orderList;

  useEffect(() => {
    dispatch(getOrdersList(`?page=${pageNumber}`));
  }, [dispatch, pageNumber]);

  return (
    <Container className="pt-4">
      <h1>Your Orders</h1>
      {loading && <Loader />}
      {orders && (
        <Row>
          {orders.map((order) => (
            <Card key={order.id} className="my-3">
              <Card.Header>
                <Row className="small-txt">
                  <Col md={2} className="d-none d-md-block">
                    <Row className="text-uppercase">Order Placed</Row>
                    <Row>{order.created_at.substring(0, 10)}</Row>
                  </Col>
                  <Col md={2} className="d-none d-md-block">
                    <Row className="text-uppercase">Total</Row>
                    <Row>£{order.total_price}</Row>
                  </Col>
                  <Col md={6} className="d-none d-md-block">
                    <Row className="text-uppercase">Dispatched to</Row>
                    {order.shipping_address ? (
                      <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip>
                            <p>
                              <strong>
                                {order.shipping_address.first_name}{" "}
                                {order.shipping_address.last_name}
                              </strong>
                            </p>
                            <p>{order.shipping_address.address}</p>
                            <p>{order.shipping_address.city}</p>
                            <p>{order.shipping_address.country}</p>
                            <p>{order.shipping_address.postal_code}</p>
                          </Tooltip>
                        }
                      >
                        <Button className="btn-to-link btn-no-padding small-txt">
                          {order.shipping_address.first_name}{" "}
                          {order.shipping_address.last_name}
                        </Button>
                      </OverlayTrigger>
                    ) : (
                      <Row>Email</Row>
                    )}
                  </Col>
                  <Col md={2}>
                    <Row className="text-uppercase">Order # {order.id}</Row>
                    <Link to={`/accounts/orders/${order.id}`}>
                      <Row>View order details</Row>
                    </Link>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
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
                          {order.type === "pdf" ? (
                            <p>E-pattern</p>
                          ) : (
                            <p>Paper pattern</p>
                          )}
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
              </Card.Body>
            </Card>
          ))}
        </Row>
      )}
      <Paginator path={currPath} pages={pages} page={page} arrows />
    </Container>
  );
};

export default OrderListScreen;
