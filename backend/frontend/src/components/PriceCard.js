import React, { useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

const PriceCard = ({ orderObj = null }) => {
  const [subtotal, setSubtotal] = useState((0).toFixed(2));
  const [shipping, setShipping] = useState((0).toFixed(2));
  const [total, setTotal] = useState((0).toFixed(2));

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    // get display prices from cartItems before an order has been created.
    // cart clears after an order is made.
    // get display prices from order once order has been created.
    // Stripe payment amount are set in backend to prevent frontend manipulation.
    if (cartItems.length > 0) {
      const tempSubtotal = cartItems.reduce(
        (acc, item) => acc + Number(item.price) * Number(item.qty),
        0
      );
      const tempShipping = cartItems.some((item) => item.itemType === "paper")
        ? tempSubtotal >= 50
          ? 0
          : 5
        : 0;
      setSubtotal(tempSubtotal.toFixed(2));
      setShipping(tempShipping.toFixed(2));
      setTotal((tempSubtotal + tempShipping).toFixed(2));
    } else if (orderObj) {
      setSubtotal(orderObj.subtotal_price);
      setShipping(orderObj.shipping_price);
      setTotal(orderObj.total_price);
    }
  }, [cartItems, orderObj]);

  return (
    <Card>
      <Card.Header>
        <h3>Cart Totals</h3>
      </Card.Header>
      <Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Sub-total:</strong> £{subtotal}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Shipping:</strong> £{shipping}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
      <Card.Footer>
        <div className="lead">Total: </div>
        <div>£{total}</div>
      </Card.Footer>
    </Card>
  );
};

export default PriceCard;
