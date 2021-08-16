// import Questionnaire from "./Questionnaire";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Row, Col, Container } from "react-bootstrap";

const Home = () => {
  return (
    <main className="home-bg">
      <Container className="home-z">
        <Row className="d-flex flex-column text-center">
          <Col className="home-header">
            <p>
              We live in perpetual lockdown. Your Neuralink is your path to
              adventure.
            </p>
            <h1>InfiniDrive</h1>
            <h5>Let your imagination drive you</h5>

            <Row className="d-flex justify-content-center align-items-center text-center">
              <p>Made in collaboration with</p>
              <Nav.Link href="https://infinique.infinityworks.academy/">
                <h6>INFINIQUE </h6>
              </Nav.Link>
              <h6>&</h6>
              <Nav.Link href="https://infiniverse.infinityworks.academy/">
                <h6> INFINIVERSE</h6>
              </Nav.Link>
            </Row>


          </Col>
        </Row>
        <Row className="d-flex align-items-center justify-content-center">
          <LinkContainer to="/vehicles">
            <Nav.Link className="btn btn-dark m-2 btn-lg border border-warning font-weight-bold shadow-lg home-button text-nowrap">
              Show Me Everything!
            </Nav.Link>
          </LinkContainer>

          <LinkContainer to="/questions">
            <Nav.Link className="btn btn-dark m-2 btn-lg border border-warning font-weight-bold shadow-lg home-button text-nowrap">
              Help Me Choose!
            </Nav.Link>
          </LinkContainer>
        </Row>
      </Container>
      <div className="clouds"></div>
    </main>
  );
};

export default Home;
