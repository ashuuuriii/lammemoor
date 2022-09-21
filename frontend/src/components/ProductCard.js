import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import ProductModal from "./ProductModal";

import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <Card className="my-3 p-3" style={{ height: "100%" }}>
      <Link to={`/product/${product.id}`}>
        <div className="image-holder">
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
          <Card.Text>${product.price}</Card.Text>
        )}
      </Card.Body>
      <Card.Footer>
        <LinkContainer to={`/product/${product.id}`}>
          <Button>Select Options</Button>
        </LinkContainer>
      </Card.Footer>
    </Card>
  );
};

export default ProductCard;
