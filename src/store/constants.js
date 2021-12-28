let minio_url =
  window.location.hostname !== "localhost"
    ? "http://10.180.0.127:3002/minio"
    : "localhost";
let jsonDocument_url =
  window.location.hostname !== "localhost"
    ? "http://10.180.0.127:3000/jsonDocument"
    : "/jsonDocument";

let C = {
  jsonDocument_url,
  minio_url,
  tfs_collection_url: "http://aptfs2018:8080/tfs/TestCollection/",
  PAT: "zzzblgncnspeem2mzlekconi7dkeycvcsr2wxwcfgzmkea24xcwa",
};

export default C;
