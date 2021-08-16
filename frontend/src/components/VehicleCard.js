import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { Card, Button, Row, Image } from "react-bootstrap";
import { useContext } from "react";
import { CartContext } from "../App";

const VehicleCard = (props) => {
  const { addToCart, isAdded } = useContext(CartContext);

  return (
    <Card className="my-2 p-2">
      <Card.Img variant="top" src={props.vehicle.image} />
      <Card.Body>
        <Link to={`/vehicles/${props.vehicle.id}`}>
          <Row className="mx-1">
            <Card.Title>{props.vehicle.name}</Card.Title>
            <h5 className="ml-2 text-warning">
              <Image
                src="../images/ib-icon.png"
                alt={props.vehicle.name}
                width="25"
                height="30"
              />
              {props.vehicle.price}
            </h5>
          </Row>
        </Link>
        <Card.Text>{props.vehicle.description}</Card.Text>
        <Link
          to={`/vehicles/${props.vehicle.id}`}
          className="btn btn-outline-warning mr-1"
        >
          Find out more!
        </Link>
        <Button
          variant="outline-warning"
          className="my-1"
          onClick={() => addToCart(props.vehicle.id)}
          disabled={isAdded(props.vehicle.id)}
        >
          {isAdded(props.vehicle.id) ? (
            <FontAwesomeIcon className="mx-2" icon={faThumbsUp} size="lg" />
          ) : (
            <FontAwesomeIcon className="mx-2" icon={faShoppingCart} size="lg" />
          )}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default VehicleCard;
