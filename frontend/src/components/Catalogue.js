import React from "react";

import VehicleGrid from "./VehicleGrid";
import Loading from "./Loading";
import useLoader from "../useLoader";
import { fetchVehicles } from "../api";
import localVehicles from '../vehicles';

const isProd = process.env.NODE_ENV === "production"

const Catalogue = () => {
  const [isLoading, vehicles] = useLoader(fetchVehicles, localVehicles, isProd);
  return isLoading ? <Loading /> : <VehicleGrid vehicles={vehicles} />
};

export default Catalogue;
