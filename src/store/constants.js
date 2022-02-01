let jsonDocument_url =
  window.location.hostname !== "localhost"
    ? `http://${window.location.hostname}:3001`
    : "http://localhost:3001";

let C = {
  jsonDocument_url,
};

export default C;
