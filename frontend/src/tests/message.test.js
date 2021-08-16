import { randomCheckoutMessage } from "../message";

test("`randomCheckoutMessage()` returns a checkout message", () => {
  expect(randomCheckoutMessage()).toBeTruthy();
});
