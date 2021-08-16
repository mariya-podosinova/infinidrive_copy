const checkoutMessages = [
  "You've made a great choice!",
  "Thank you, no refunds",
  "Be careful of the killer bug which overheats your neuralink",
  "Lots of malware attacks recently, Are we sure that's not a trojan horse?",
];

export const randomCheckoutMessage = () =>
  checkoutMessages[Math.floor(Math.random() * checkoutMessages.length)];
