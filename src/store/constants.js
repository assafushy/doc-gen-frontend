let jsonDocument_url =
  window.location.hostname !== "localhost"
    ? "BACKEND-URL-PLACEHOLDER-ContentControl"
    : "http://localhost:3001";

let C = {
  jsonDocument_url
};

export default C;