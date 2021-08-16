import React, { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LinkContainer } from "react-router-bootstrap";
import {
  faWarehouse,
  faShoppingCart,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
// import { cartCount } from "../localStorage";
import { CartContext } from "../App";

const Header = () => {
  const cart = useContext(CartContext);

  return (
    <header className="home-z">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <FontAwesomeIcon className="mx-3" icon={faRocket} size="lg" />
              InfiniDrive
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  Cart
                  <FontAwesomeIcon
                    className="mx-3"
                    icon={faShoppingCart}
                    size="lg"
                  />
                  <span className="badge" id="lblCartCount">
                    {cart.cart.size > 0 ? cart.cart.size : ""}
                  </span>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/vehicles">
                <Nav.Link>
                  All
                  <FontAwesomeIcon
                    className="mx-3"
                    icon={faWarehouse}
                    size="lg"
                  />
                </Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav>
              <LinkContainer to="/questions">
                <Nav.Link className="btn btn-outline-warning mx-2 my-1">
                  Help Me Choose
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
//rafce
