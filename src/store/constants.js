let minio_endPoint = 
  window.location.hostname !== "localhost"
    ? ""
    : "localhost";

let minio_url =
  window.location.hostname !== "localhost"
    ? "http://10.180.0.127:3002/minio"
    : `http://s3:9000`;


let jsonDocument_url =
  window.location.hostname !== "localhost"
    ? "http://10.180.0.127:3000/jsonDocument"
    : "http://localhost:3001/jsonDocument";

let C = {
  jsonDocument_url,
  minio_url,
  minio_endPoint
};

export default C;
