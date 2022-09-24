import React, { useEffect } from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader";
import CartAdder from "../components/CartAdder";
import Rating from "../components/Rating";
import { getProductDetails } from "../actions/productActions";
import { PRODUCT_CATEGORIES } from "../constants/productConstants";

const ProductDetailScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productId = useParams().id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(getProductDetails(productId));
  }, [dispatch, productId]);

  // TODO: add reviews section
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
              <p>{product.description}</p>
              <h2>Purchase Options</h2>
              <CartAdder product={product} />
            </Col>
          </Row>
          <Row>
            <h2>Reviews</h2>
          </Row>
        </div>
      )}
    </div>
  );
};

export default ProductDetailScreen;
