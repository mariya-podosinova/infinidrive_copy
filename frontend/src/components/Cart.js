import React, { useContext, useState } from "react";
import { Button, Container, Row, Col, ListGroup, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import vehicles from "../vehicles";
import CartItem from "./CartItem";
import Message from "./Message";
import { getCart } from "../localStorage";
import { CartContext } from "../App";
import CheckoutModal from "./CheckoutModal";
import { randomCheckoutMessage } from "../message";

const Cart = () => {
  const [message, setMessage] = useState("");
  const [isActive, setActive] = useState(false);
  const cartArray = Array.from(getCart());
  const history = useHistory();
  const cart = useContext(CartContext);
  const disable = cart.cart.size < 1 ? true : false;
  const [modalShow, setModalShow] = useState(false);

  const handleClickAnimation = () => {
    setActive(!isActive);
    setMessage(randomCheckoutMessage());
  };

  return (
    <Container>
      <Row>
        <Col lg="12">
          <h3 className="my-4">Shopping Cart</h3>
        </Col>
        <Col md={8}>
          {cartArray.length === 0 ? (
            <Message variant="info">
              Your cart is empty <Link to="/vehicles">Go Back</Link>
            </Message>
          ) : (
            <ListGroup>
              {cartArray.map((item, id) => {
                return (
                  <ListGroup.Item
                    className={
                      isActive
                        ? "animate__animated animate__zoomOut"
                        : "border border-dark"
                    }
                    key={vehicles[item].id}
                  >
                    <CartItem
                      image={vehicles[item].image}
                      name={vehicles[item].name}
                      price={vehicles[item].price}
                      deleteItem={() => {
                        cart.removeFromCart(vehicles[item].id);
                      }}
                    />
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          )}
          <Button
            variant="outline-warning"
            className="btn p-2 my-3 rounded border border-warning"
            onClick={() => history.goBack()}
          >
            Go Back
          </Button>
        </Col>
        <Col md={4}>
          <Row>
            <h4 className="p-4">
              Total:{" "}
              <Image
                src="../images/ib-icon.png"
                alt="infinibucks"
                width="40"
                height="40"
              />
              {cartArray.reduce(function (acc, item) {
                return acc + vehicles[item].price;
              }, 0)}
            </h4>

            <Button
              variant="secondary"
              className="rounded btn-warning p-2 btn-block btn-lg"
              disabled={disable}
              onClick={() => {
                setModalShow(true);
              }}
            >
              Checkout
            </Button>

            <CheckoutModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              onClick={() => handleClickAnimation()}
            />
          </Row>
          {message !== "" && (
            <Row className="my-3 justify-content-center text-center">
              <Message>{message}</Message>
              <Message variant="secondary">
                <a download={true} href="../badcert.pdf">
                  Download your Vehicles here
                </a>
              </Message>
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
