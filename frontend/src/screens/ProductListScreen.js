import React, { useState, useEffect } from "react";
import { Row, Button, Offcanvas, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";


const ProductListScreen = () => {
  const dispatch = useDispatch();

  const [showCanvas, setShowCanvas] = useState(false);
  const [checkedItems, setCheckItems] = useState([]);

  const handleOpenCanvas = () => setShowCanvas(true);
  const handleCloseCanvas = () => setShowCanvas(false);

  const handleFilteredItems = (e) => {
    const { checked, id } = e.target;
    if (checked) {
      setCheckItems([...checkedItems, id]);
    } else {
      setCheckItems(checkedItems.filter((item) => item !== id));
    }
  };

  useEffect(() => {
    // dispatch product api call here
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
      <Row></Row>
      <Offcanvas show={showCanvas} onHide={handleCloseCanvas}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            {[
              "1840s",
              "1850s",
              "1860s",
              "1870s",
              "1880s",
              "1890s",
              "Edwardian",
            ].map((cat) => (
              <Form.Check
                type="checkbox"
                id={cat}
                key={cat}
                label={cat}
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
