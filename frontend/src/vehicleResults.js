const getAnswers = (rawAnswers) => {
  const result = Object.assign(...rawAnswers);
  return result;
};

const score = (vehicle, answers) => {
  const vehicleTags = Object.entries(vehicle.tags); // [key, value]
  const result = vehicleTags.reduce((acc, [key, value]) => {
    const answerValue = answers[key];
    const difference = Math.abs(answerValue - value);
    return acc + difference;
  }, 0);
  return result;
};

const sortedVehicles = (vehicles, answers) => {
  const sortedVehiclesResult = [...vehicles];
  sortedVehiclesResult.sort((vehicle_a, vehicle_b) => {
    const score_a = score(vehicle_a, answers);
    const score_b = score(vehicle_b, answers);
    return score_a - score_b;
  });
  return sortedVehiclesResult;
};

export const getResults = (vehicles, rawAnswers) => {
  const answers = getAnswers(rawAnswers);
  const sortedVehiclesResult = sortedVehicles(vehicles, answers);
  return sortedVehiclesResult;
};
