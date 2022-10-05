import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import ProductModal from "./ProductModal";

const ProductCard = ({ product }) => {
  return (
    <Card className="my-3 p-3" style={{ height: "100%" }}>
      <Link to={`/product/${product.id}`}>
        <div className="img-zoom">
          <Card.Img src={product.image} alt={product.name} />
        </div>
      </Link>
      <Card.Body>
        <ProductModal product={product} />
        <Card.Title>{product.name}</Card.Title>
        {product.pdf_price ? (
          <Card.Text>
            £{product.pdf_price} - £{product.price}
          </Card.Text>
        ) : (
          <Card.Text>£{product.price}</Card.Text>
        )}
        {!product.pdf_price && product.n_stock < 1 ? (
          <Badge bg="danger">Currently unavailable</Badge>
        ) : null}
      </Card.Body>
      <Card.Footer>
        <LinkContainer to={`/product/${product.id}`}>
          <Button
            type="button"
            disabled={!product.pdf_price && product.n_stock < 1}
          >
            Select Options
          </Button>
        </LinkContainer>
      </Card.Footer>
    </Card>
  );
};

export default ProductCard;
