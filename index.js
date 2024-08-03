import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import dotenv from "dotenv";
dotenv.config(); // This loads the environment variables from the .env file

const s3Client = new S3Client({
  region: "ap-south-1",
  // nodejs user from =>which is sub user/sub admin from Root user

  // credentials for node js user access key
  credentials: {
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
  },
});

async function getObjectURL(key) {
  // key is file name which is inside bucket
  const command = new GetObjectCommand({
    Bucket: "privatefirstbucket", // bucket name
    Key: key,
  });

  const url = await getSignedUrl(s3Client, command);
  return url;
}

async function putObject(fileName, contentType) {
  const command = new PutObjectCommand({
    Bucket: "privatefirstbucket",
    Key: `uploads/user-uploads/${fileName}`,
    ContentType: contentType,
  });

  const url = await getSignedUrl(s3Client, command);

  return url;
}

async function invoke() {
  const url = await getObjectURL(
    "uploads/user-uploads/video-1722688553413.mp4"
  );
  console.log("URL is ", url);

  // put object upload image
  // const url = await putObject(`image-${Date.now()}.jpeg`, "image/jpeg");
  // console.log("URL is for put object run in postman ", url);
  // put object upload video
  // const url = await putObject(`video-${Date.now()}.mp4`, "video/mp4");
  // console.log("URL is for put object run in postman ", url);
}

invoke();
