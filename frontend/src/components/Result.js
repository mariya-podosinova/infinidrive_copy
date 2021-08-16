import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { getResults } from "../vehicleResults";
import Loading from "./Loading";
import VehicleGrid from "./VehicleGrid";
import useLoader from "../useLoader";
import { fetchVehicles } from "../api";
import localVehicles from "../vehicles";
import { Container } from "react-bootstrap";

const isProd = process.env.NODE_ENV === "production";

const Result = () => {
  const location = useLocation();
  const { rawAnswers } = location.state;
  const [sortedVehicles, setSortedVehicles] = useState([]);
  const [isLoading, vehicles] = useLoader(fetchVehicles, localVehicles, isProd);

  useEffect(() => {
    const sortedVehicles = getResults(vehicles, rawAnswers);
    setSortedVehicles(sortedVehicles);
  }, [rawAnswers, vehicles]);

  return isLoading ? (
    <Loading />
  ) : (
    <Container>
      <h4 className="text-center ml-auto mr-auto p-2 my-4">
        We found the BEST match for you!
      </h4>
      <VehicleGrid vehicles={sortedVehicles} highlights={1} limit={4} />
    </Container>
  );
};

export default Result;
