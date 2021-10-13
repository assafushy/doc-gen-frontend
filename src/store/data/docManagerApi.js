import axios from "axios";
import C from "../constants";
import { v4 as uuidv4 } from "uuid";

const headers = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
};

export const getBucketFileList = async (bucketName) => {
  try {
    //!!bucket name validation should be a functio in doc manager
    bucketName = bucketName.replace("_", "-");
    let res = await axios.get(
      `${C.minio_url}/getFileList?bucketName=${bucketName}`,
      headers
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
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
