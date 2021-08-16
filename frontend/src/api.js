export const fetchVehicles = async () => {
  const response = await fetch("/api/vehicles")
  const data = await response.json(); // Should parse the response body
  return data
}

export const fetchQuestions = async () => {
  const response = await fetch("/api/questions")
  const data = await response.json(); // Should parse the response body
  return data
}