import { Button, Row, Col, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const CartItem = (props) => {
  return (
    <Row className="m-2">
      <Col md={6}>
        <Image
          src={props.image}
          alt={props.name}
          fluid
          rounded
          className="rounded border border-warning"
        />
      </Col>
      <Col md={6} className="d-flex justify-content-between flex-column">
        <Row className="d-flex justify-content-between flex-column">
          <h5 className="m-2 text-warning">{props.name}</h5>
          <Row className="m-2">
            <Image
              src="../images/ib-icon.png"
              alt="infinibucks"
              width="40"
              height="40"
            />
            <h4>{props.price}</h4>
          </Row>
          <Row className="m-2">
            <Button
              variant="outline-warning"
              className="rounded border border-warning px-2"
              onClick={() => props.deleteItem()}
            >
              <FontAwesomeIcon className="mx-1" icon={faTrash} /> Remove
            </Button>
          </Row>
        </Row>
      </Col>
    </Row>
  );
};

export default CartItem;
