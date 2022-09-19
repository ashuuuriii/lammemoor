import React, { useState, useEffect } from "react";
import { Row, Col, Button, Offcanvas, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { getProductsList } from "../actions/productActions";
import ProductCard from "../components/ProductCard";
import { PRODUCT_CATEGORIES } from "../constants/productConstants";

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const [showCanvas, setShowCanvas] = useState(false);
  const [checkedItems, setCheckItems] = useState([]);

  const handleOpenCanvas = () => setShowCanvas(true);
  const handleCloseCanvas = () => setShowCanvas(false);

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
    dispatch(getProductsList());
  }, [dispatch]);

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
        {checkedItems.length > 0
          ? products.map((product) =>
              checkedItems.indexOf(product.category) >= 0 ? (
                <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                  <ProductCard product={product} />
                </Col>
              ) : null
            )
          : products.map((product) => (
              <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <ProductCard product={product} />
              </Col>
            ))}
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
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default ProductListScreen;
