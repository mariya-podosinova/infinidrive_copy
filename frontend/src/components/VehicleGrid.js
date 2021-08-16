import React from "react";
import Container from "react-bootstrap/Container";
import VehicleCard from "./VehicleCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const VehicleGrid = ({ vehicles, limit, highlights }) => {
  return (
    <>
      <Container className="my-2">
        <Row md={"auto"}>
          {vehicles.flatMap((vehicle, i) => {
            if (!limit || i < limit) {
              return [
                <Col
                  key={vehicle.id}
                  sm={highlights && i < highlights ? 12 : 12}
                  md={highlights && i < highlights ? 12 : 6}
                  lg={highlights && i < highlights ? 12 : 4}
                  className="ml-auto mr-auto"
                >
                  <VehicleCard vehicle={vehicle} />
                  {highlights && i < highlights && (
                    <h4 className="mt-5 mb-2 text-center">
                      Here's some more you may like
                    </h4>
                  )}
                </Col>,
              ];
            }
            return [];
          })}
        </Row>
      </Container>
    </>
  );
};

export default VehicleGrid;
