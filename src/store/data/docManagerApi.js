import axios from "axios";
import C from "../constants";
import { v4 as uuidv4 } from "uuid";
import { promisify } from "util";

var Minio = require("minio");

const headers = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
};

export const getBucketFileList = async (bucketName, isExternalUrl = false) => {
  let url;
  try {
    url = `${C.jsonDocument_url}/minio/bucketFileList/${bucketName}?isExternalUrl=${isExternalUrl}`;
    let res = await makeRequest(url, undefined, undefined, headers);
    return res.bucketFileList;
  } catch (e) {}
};

export const getJSONContentFromFile = async (bucketName, fileName) => {
  let url;
  try {
    url = `${C.jsonDocument_url}/minio/ContentFromFile/${bucketName}/${fileName}`;
    let res = await makeRequest(url, undefined, undefined, headers);
    return res.contentFromFile;
  } catch (e) {}
};

export const createIfBucketDoesentExsist = async (bucketName) => {
  let url;
  let data = { bucketName };
  try {
    url = `${C.jsonDocument_url}/minio/createBucket`;
    let response = await makeRequest(url, "post", data, headers);

    // Instantiate the minio client with the endpoint and access keys
    var minioClient = new Minio.Client({
        endPoint: 'localhost',
        port: 9000,
        useSSL: false,  // if you have not enabled https, set useSSL as false
        accessKey: 'your-root-user',
        secretKey: 'your-root-password'
    });

    // Define the lifecycle policy
    const lifecycleConfig = {
        Rule: [{
            "ID": "Expire after one day",
            "Status": "Enabled",
            "Filter": {
                "Prefix": "",
            },
            "Expiration": {
                "Days": 1,
            }
        }]
    };

    // Promisify the getBucketLifecycle and setBucketLifecycle functions
    const getBucketLifecyclePromise = promisify(minioClient.getBucketLifecycle).bind(minioClient);
    const setBucketLifecyclePromise = promisify(minioClient.setBucketLifecycle).bind(minioClient);

    let existingLifecycleConfig;

    try {
        // Try to get the existing lifecycle configuration
        existingLifecycleConfig = await getBucketLifecyclePromise(bucketName);
    } catch (err) {
        // Handle specific error for no lifecycle configuration
        if (err.code === 'NoSuchLifecycleConfiguration') {
            console.log(`No lifecycle policy found for bucket '${bucketName}'. Setting up a new one.`);
            await setBucketLifecyclePromise(bucketName, lifecycleConfig);
        } else {
            // Log other errors
            console.error(err);
        }
    }

    // If there is a lifecycle configuration, it's left unchanged
    if (existingLifecycleConfig) {
        console.log(`Lifecycle policy already exists for bucket '${bucketName}'. Not making any changes.`);
    }

    return response;
  } catch (e) {
    console.error(e);
  }
};


const makeRequest = async (
  url,
  requestMethod = "get",
  data = {},
  customHeaders = {}
) => {
  let config = {
    headers: customHeaders,
    method: requestMethod,
    data: data,
  };
  let json;
  try {
    let result = await axios(url, config);
    json = JSON.parse(JSON.stringify(result.data));
  } catch (e) {
    console.log(`error making request to the api`);
    console.log(e);
    console.log(JSON.stringify(e.data));
  }
  return json;
};

export const sendDocumentTogenerator = async (docJson) => {
  try {
    docJson.documentId = uuidv4();
    let res = await axios.post(
      `${C.jsonDocument_url}/jsonDocument/create`,
      docJson,
      headers
    );
    window.currentdoc = docJson.documentId;
    return res.data;
  } catch (err) {
    return [];
  }
};