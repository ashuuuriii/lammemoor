import React, { useEffect } from "react";
import { Row, Col, Container, Image, Button, Carousel } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getProductsList } from "../actions/productActions";
import FadeInScroll from "../components/FadeInScroll";

import fashion from "../assets/images/f6998.jpg";
import line from "../assets/images/line.png";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  useEffect(() => {
    dispatch(getProductsList("?new=3"));
  }, [dispatch]);

  return (
    <Container className="pt-4">
      <Row className="justify-content-center align-items-center fadein">
        <Col className="md-5 text-center text-md-start">
          <h1>
            <div className="display-1 brand-font">Lammermoor</div>
            <div className="display-5 text-muted">
              Sewing patterns of the Victorian and Edwardian periods.
            </div>
          </h1>
          <p className="lead my-4 text-muted">
            Historical costuming made simple. Your one stop shop for Victorian
            era costuming.
          </p>
          <LinkContainer to="/shop">
            <Button className="btn btn-secondary btn-lg mb-4 text-light">
              Shop Now
            </Button>
          </LinkContainer>
        </Col>
        <Col className="text-center d-md-block" sm={12} md={12} lg={5}>
          <Image
            src={fashion}
            fluid
            alt="Fashion, Journal de Demoiselles, 1858."
          ></Image>
        </Col>
      </Row>
      <Row className="my-5 py-5 d-none d-md-block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          class="bi bi-caret-down-fill"
          viewBox="0 0 16 16"
        >
          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
        </svg>
      </Row>
      <FadeInScroll>
        <Row style={{ "margin-top": "10vh" }}>
          <div className="text-center">
            <Image src={line} width="100" fluid className="my-5" />
            <h2>Welcome to Lammermoor</h2>
            <p>
              Lammermoor is dedicated to providing historically accurate
              patterns for hobbyists and professionals alike. Our patterns
              drafted to fit the modern body using historical techniques. They
              are not modern interpretations of what historical garments looked
              like. These patterns are perfect for reenactments and theatre
              costumes.
            </p>
            <Image src={line} width="100" fluid className="my-5" />
          </div>
        </Row>
      </FadeInScroll>
      <FadeInScroll>
        <Row className="my-3">
          <h2>New Patterns</h2>
          <Carousel>
            {products.map((product) => (
              <Carousel.Item className="my-3">
                <Row className="justify-content-center align-items-center">
                  <Col
                    className="text-center d-md-block"
                    sm={12}
                    md={12}
                    lg={5}
                  >
                    <Image src={product.image} fluid alt={product.name}></Image>
                  </Col>
                  <Col className="md-5 text-center text-md-start">
                    <Link to={`/product/${product.id}`} className="lead">
                      {product.name}
                    </Link>
                    {product.pdf_price ? (
                      <p>
                        £{product.pdf_price} - £{product.price}
                      </p>
                    ) : (
                      <p>${product.price}</p>
                    )}
                  </Col>
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        </Row>
      </FadeInScroll>
    </Container>
  );
};

export default HomeScreen;
