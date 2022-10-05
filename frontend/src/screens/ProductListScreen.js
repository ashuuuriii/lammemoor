import React, { useState, useEffect } from "react";
import { Row, Col, Button, Offcanvas, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { getProductsList } from "../actions/productActions";
import ProductCard from "../components/ProductCard";
import Paginator from "../components/Paginator";
import { PRODUCT_CATEGORIES } from "../constants/productConstants";

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const currPath = window.location.pathname;

  const [search, setSet] = useSearchParams();
  const pageNumber = search.get("page") ? search.get("page") : "";

  const productList = useSelector((state) => state.productList);
  const { products, page, pages } = productList;

  const [showCanvas, setShowCanvas] = useState(false);
  const [checkedItems, setCheckItems] = useState([]);

  const handleOpenCanvas = () => setShowCanvas(true);
  const handleCloseCanvas = () => setShowCanvas(false);
  const handleClearButton = () => setCheckItems([]);

  const handleFilteredItems = (e) => {
    const { checked, id } = e.target;
    if (checked) {
      setCheckItems([...checkedItems, PRODUCT_CATEGORIES[id]]);
    } else {
      setCheckItems(
        checkedItems.filter((item) => item !== PRODUCT_CATEGORIES[id])
      );
    }
  };

  useEffect(() => {
    let queryStr = `?page=${pageNumber}`;

    if (checkedItems) {
      for (let checked of checkedItems) {
        queryStr += `&category=${checked}`;
      }
    }

    dispatch(getProductsList(queryStr));
  }, [dispatch, pageNumber, checkedItems]);

  return (
    <div className="pt-4">
      <h1>Shop</h1>
      <Row>
        <div>
          <Button onClick={handleOpenCanvas} size="sm" variant="primary">
            Filter
          </Button>
        </div>
      </Row>
      <Row>
        {typeof products != "string" ? (
          products.map((product) => (
            <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
              <ProductCard product={product} />
            </Col>
          ))
        ) : (
          <p className="my-3">There are no products in this category yet.</p>
        )}
      </Row>
      <Row className="pt-5">
        <Paginator path={currPath} page={page} pages={pages} arrows />
      </Row>

      <Offcanvas show={showCanvas} onHide={handleCloseCanvas}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            {Object.keys(PRODUCT_CATEGORIES).map((cat) => (
              <Form.Check
                type="checkbox"
                id={cat}
                key={cat}
                label={cat}
                checked={checkedItems.indexOf(PRODUCT_CATEGORIES[cat]) >= 0}
                onChange={handleFilteredItems}
              />
            ))}
            <Button
              type="button"
              variant="danger"
              className="my-3 text-light"
              onClick={handleClearButton}
            >
              Clear
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default ProductListScreen;
