import axios from "axios";
import C from "../constants";
import { v4 as uuidv4 } from "uuid";

var Minio = require("minio");

const headers = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
};

export const getBucketFileList = async (bucketName) => {
  return new Promise((resolve, reject) => {
    const s3Client = new Minio.Client({
      endPoint: C.minio_url,
      port: 9000,
      useSSL: false,
      accessKey: "your-root-user",
      secretKey: "your-root-password",
    });
    try {
      let objects = [];
      bucketName = bucketName.replace("_", "-");
      let stream = s3Client.listObjectsV2(bucketName);
      stream.on("data", (obj) => {
        objects.push(obj);
      });
      stream.on("end", (obj) => {
        resolve(objects);
      });
      stream.on("error", (obj) => {
        throw new Error(obj);
      });
      console.log(objects);
      return objects;
    } catch (err) {
      console.log(err);
      reject([]);
    }
  });
};

export const getJSONContentFromFile = async (fileUrl) => {
  try {
    console.log(fileUrl);
    return await axios.get(fileUrl, headers);
  } catch (err) {
    console.log(err);
    return {};
  }
};

export const sendDocumentTogenerator = async (docJson) => {
  try {
    docJson.documentId = uuidv4();
    let res = await axios.post(
      `${C.jsonDocument_url}/create`,
      docJson,
      headers
    );
    window.currentdoc = docJson.documentId;
    return res.data;
  } catch (err) {
    return [];
  }
};
