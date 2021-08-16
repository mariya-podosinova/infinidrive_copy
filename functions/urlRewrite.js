function handler(event) {
  var req = event.request;
  var uri = req.uri;
  if (uri.endsWith("/") || !uri.includes(".")) req.uri = "/index.html"; // Always redirect to root index.html
  return req;
}
