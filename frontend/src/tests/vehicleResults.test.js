import { getResults } from "../vehicleResults";

const mockVehicles = [
  {
    id: "1",
    name: "Spaceship",
    image: "../images/1.JPG",
    description:
      "A spacecraft is a vehicle or machine designed to fly in outer space. A type of artificial satellite, spacecraft are used for a variety of purposes, including communications, Earth observation, meteorology, navigation, space colonization, planetary exploration, and transportation of humans and cargo.",
    price: 30,
    tags: {
      speed: 10,
      real: 0,
    },
  },
  {
    id: "2",
    name: "Big Tree Man",
    image: "../images/1.JPG",
    description:
      "A spacecraft is a vehicle or machine designed to fly in outer space. A type of artificial satellite, spacecraft are used for a variety of purposes, including communications, Earth observation, meteorology, navigation, space colonization, planetary exploration, and transportation of humans and cargo.",
    price: 30,
    tags: {
      speed: 0,
      real: 10,
    },
  },
];

describe("recommendedVehicle...", () => {
  it("should return smallest difference, which with this test data is Spaceship", () => {
    //Arrange
    const mockAnswers = [{ speed: 10 }, { real: 6 }];
    //Act
    const results = getResults(mockVehicles, mockAnswers);
    //Assert
    expect(results[0]).toBe(mockVehicles[0]);
  });

  it("should return vehicle with index 0, if both have the same tags", () => {
    //Arrange
    const mockAnswers = [{ speed: 10 }, { real: 6 }];
    const mockVehicles2 = [
      {
        id: "1",
        name: "Spaceship",
        image: "../images/1.JPG",
        description:
          "A spacecraft is a vehicle or machine designed to fly in outer space. A type of artificial satellite, spacecraft are used for a variety of purposes, including communications, Earth observation, meteorology, navigation, space colonization, planetary exploration, and transportation of humans and cargo.",
        price: 30,
        tags: {
          speed: 10,
          real: 0,
        },
      },
      {
        id: "2",
        name: "Big Tree Man",
        image: "../images/1.JPG",
        description:
          "A spacecraft is a vehicle or machine designed to fly in outer space. A type of artificial satellite, spacecraft are used for a variety of purposes, including communications, Earth observation, meteorology, navigation, space colonization, planetary exploration, and transportation of humans and cargo.",
        price: 30,
        tags: {
          speed: 10,
          real: 0,
        },
      },
    ];
    //Act
    const results = getResults(mockVehicles2, mockAnswers);

    //Assert
    expect(results).toStrictEqual(mockVehicles2);
  });
});
