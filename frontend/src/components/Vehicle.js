import React, { useState, useContext } from "react";
import { Container, Col, Row, Image, Button } from "react-bootstrap";
import vehicles from "../vehicles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { CartContext } from "../App";
import Message from "./Message";

const Vehicle = ({ match }) => {
  const vehicle = vehicles.find((item) => item.id === match.params.id);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const history = useHistory();

  const [isActive, setActive] = useState(false);
  const handleClickAnimation = () => {
    setActive(!isActive);
  };

  const { addToCart, isAdded } = useContext(CartContext);

  return (
    <Container className="my-4">
      {isAdded(vehicle.id) ? <Message>Added to the cart</Message> : ""}
      <Row>
        <h3 className="text-center ml-auto mr-auto m-4 p-2">
          This is the vehicle of your dreams!
        </h3>
      </Row>
      <h2 className="text-warning">{vehicle.name}</h2>
      <Row>
        <Col md={5}>
          <p>{vehicle.description}</p>
          <h3>
            Price:{" "}
            <Image
              src="../images/ib-icon.png"
              alt={vehicle.name}
              width="40"
              height="40"
            />
            {vehicle.price}
          </h3>
          <h5 className="py-3">Main Features:</h5>
          {Object.entries(vehicle.tags)
            .filter((tag) => tag[1] > 5)
            .map((tag, i) => (
              <span key={i} className="p-1 m-1">
                {capitalizeFirstLetter(tag[0])}{" "}
              </span>
            ))}

          <Button
            variant="secondary"
            className="rounded border border-warning btn btn-warning p-3 btn-lg btn-block try-now-btn"
            onClick={handleClickAnimation}
          >
            Try Now!
          </Button>
          <Button
            variant="outline-warning"
            className="btn p-2 my-3 rounded border border-warning"
            onClick={() => history.goBack()}
          >
            Go Back
          </Button>
          <Button
            variant="outline-warning"
            className="mx-2"
            onClick={() => addToCart(vehicle.id)}
            disabled={isAdded(vehicle.id)}
          >
            {isAdded(vehicle.id) ? (
              <>
                <FontAwesomeIcon className="mx-2" icon={faThumbsUp} size="lg" />{" "}
                Added
              </>
            ) : (
              <>
                <FontAwesomeIcon
                  className="mx-2"
                  icon={faShoppingCart}
                  size="lg"
                />{" "}
                Add to Cart
              </>
            )}
          </Button>
        </Col>
        <Col md={7}>
          <Image
            src={vehicle.image}
            alt={vehicle.name}
            rounded
            fluid
            className={
              isActive
                ? "animate__animated animate__zoomOutUp"
                : "rounded border border-warning my-1"
            }
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Vehicle;
