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
      endPoint: C.minio_endPoint,
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
        // throw new Error(obj);
        return [];
      });
      return objects;
    } catch (err) {
      console.log(err);
      reject([]);
    }
  });
};

export const getJSONContentFromFile = async (bucketName, fileName) => {
  return new Promise((resolve, reject) => {
    const s3Client = new Minio.Client({
      endPoint: C.minio_endPoint,
      port: 9000,
      useSSL: false,
      accessKey: "your-root-user",
      secretKey: "your-root-password",
    });
    let miniData = "";
    s3Client.getObject(bucketName, fileName, function (err, dataStream) {
      if (err) {
        return console.log(err);
      }
      dataStream.on("data", function (chunk) {
        miniData += chunk;
      });
      dataStream.on("end", function () {
        let cleaned = String(miniData).replace(/(\r\n|\n|\r)/gm, "");
        cleaned = String(cleaned).replace(/ /g, "");
        const json = JSON.parse(cleaned);
        console.log(json);
        return resolve(json);
      });
      dataStream.on("error", function (err) {
        console.log(err);
        return reject(err);
      });
    });
  });
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
