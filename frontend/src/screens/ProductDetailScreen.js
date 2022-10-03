import React, { useEffect, useState } from "react";
import { Row, Col, Image, Button, ListGroup, Form } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader";
import CartAdder from "../components/CartAdder";
import Rating from "../components/Rating";
import Message from "../components/Message";
import { getProductDetails, createReview } from "../actions/productActions";
import { PRODUCT_CATEGORIES } from "../constants/productConstants";

const ProductDetailScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [rating, setRating] = useState("0");
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const productId = useParams().id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: reviewLoading,
    success,
    error: reviewError,
  } = productReviewCreate;

  const redirectUrl = `/login?redirect=/product/${productId}`;

  const userInfo = localStorage.getItem("userInfo");

  const submitHandler = (e) => {
    e.preventDefault();
    if (rating === "0") {
      setMessage("You must select a rating.");
    } else {
      setMessage("");
      const review = {
        product_id: productId,
        rating: rating,
        title: title,
        comment: comment,
      };
      dispatch(createReview(review));
    }
  };

  useEffect(() => {
    dispatch(getProductDetails(productId));
  }, [dispatch, productId]);

  return (
    <div className="pt-4">
      <Button onClick={() => navigate(-1)}>Go back</Button>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="mt-3">
          <h1>{error}</h1>
          <div>
            Sorry, an error has occurred. We'll get this fixed as soon as
            possible.
          </div>
        </div>
      ) : (
        <div className="my-3">
          <h1 className="d-lg-none d-md-block">{product.name}</h1>
          <Row>
            <Col md={12} lg={6} className="my-3">
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={12} lg={6}>
              <h1 className="d-none d-lg-block">{product.name}</h1>
              <p>
                <strong>Category: </strong>
                {Object.keys(PRODUCT_CATEGORIES).find(
                  (key) => PRODUCT_CATEGORIES[key] === product.category
                )}
              </p>
              <Rating
                value={product.rating}
                text={`(${product.n_reviews} customer reviews)`}
                color={"#000"}
              />
              <p className="mt-3">{product.description}</p>
              <h2>Purchase Options</h2>
              <CartAdder product={product} />
            </Col>
          </Row>
          <Row>
            <h2>Reviews</h2>
            <ListGroup variant="flush">
              {product.reviews.length > 0 ? (
                product.reviews.map((review) => (
                  <ListGroup.Item key={review.id}>
                    <p className="lead mb-1">{review.title}</p>
                    <p className="my-0">{review.name}</p>
                    <Rating value={review.rating} color={"#000"} />
                    <p className="my-0">{review.created_at.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))
              ) : (
                <ListGroup.Item>
                  <p>There are no reviews for this item yet.</p>
                </ListGroup.Item>
              )}
              <ListGroup.Item id="review-section">
                <h3>Write a review</h3>
                {message && <Message variant="danger">{message}</Message>}
                {reviewLoading && <Loader />}
                {success && (
                  <Message variant="success">
                    Thank you for your review.
                  </Message>
                )}
                {reviewError && (
                  <Message variant="danger">{reviewError}</Message>
                )}
                {userInfo ? (
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId="rating">
                      <Form.Label>Rating (required)</Form.Label>
                      <Form.Select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="0">Please select...</option>
                        <option value="1">Poor</option>
                        <option value="2">Fair</option>
                        <option value="3">Good</option>
                        <option value="4">Very Good</option>
                        <option value="5">Excellent</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="title">
                      <Form.Label>Review Title (optional)</Form.Label>
                      <Form.Control
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="reviewBody">
                      <Form.Label>Review (optional)</Form.Label>
                      <Form.Control
                        as="textarea"
                        row="5"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </Form.Group>
                    <Button
                      type="submit"
                      className="my-3 d-none d-lg-block"
                      disabled={success}
                    >
                      Submit
                    </Button>
                    <Row className="d-lg-none d-block mx-0">
                      <Button type="submit" className="my-3" disabled={success}>
                        Submit
                      </Button>
                    </Row>
                  </Form>
                ) : (
                  <Message variant="info">
                    Please <Link to={redirectUrl}>login</Link> to write a
                    review.
                  </Message>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Row>
        </div>
      )}
    </div>
  );
};

export default ProductDetailScreen;
