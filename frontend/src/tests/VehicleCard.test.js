import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import VehicleCard from "../components/VehicleCard";

describe("VehicleCard component", () => {
  let container = null;

  const dummyVehicle = {
    id: "1",
    name: "Spaceship",
    image: "../images/1.JPG",
    description:
      "A spacecraft is a vehicle or machine designed to fly in outer space. A type of artificial satellite, spacecraft are used for a variety of purposes, including communications, Earth observation, meteorology, navigation, space colonization, planetary exploration, and transportation of humans and cargo.",
    price: 30,
    tags: {
      speed: 5,
      price: 5,
      real: 0,
      smartness: 2,
      daredevil: 6,
    },
  }

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it("renders the correct description text", () => {
    expect.hasAssertions();

    act(() => {
      render(<VehicleCard description={dummyVehicle.description} />, container);
    });

    expect(container.textContent).toBe("A spacecraft is a vehicle or machine designed to fly in outer space. A type of artificial satellite, spacecraft are used for a variety of purposes, including communications, Earth observation, meteorology, navigation, space colonization, planetary exploration, and transportation of humans and cargo.");
  });

});
