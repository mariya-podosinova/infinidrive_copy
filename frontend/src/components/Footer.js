import React from "react";
import { Row, Col, Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col>
            <p className="text-center m-3">
              Copyright © 2021 Infinity Works Company
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
