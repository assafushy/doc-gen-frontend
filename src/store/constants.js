let minio_endPoint = 
  window.location.hostname !== "localhost"
    ? "MINIO-ENDPOINT-PLACEHOLDER"
    : "localhost";

let minio_url =
  window.location.hostname !== "localhost"
    ? "MINIO-URL-PLACEHOLDER"
    : `http://s3:9000`;


let jsonDocument_url =
  window.location.hostname !== "localhost"
    ? "BACKEND-URL-PLACEHOLDER-ContentControl"
    : "http://localhost:3001/jsonDocument";

let AwsAccessKeyId = 
  window.location.hostname !== "localhost"
    ? "MINIO-ACCESS-ID-PLACEHOLDER"
    : "your-root-user"

let AwsSecretAccessKey = 
  window.location.hostname !== "localhost"
    ? "MINIO-SECRET-ACCESS-KEY-PLACEHOLDER"
    : "your-root-password"

  let AwsRegion =
    window.location.hostname !== "localhost"
    ? "AWS-REGION-PLACEHOLDER" 
    : "ap-southeast-1"

let C = {
  jsonDocument_url,
  minio_url,
  minio_endPoint,
  AwsAccessKeyId,
  AwsSecretAccessKey,
  AwsRegion
};

export default C;
