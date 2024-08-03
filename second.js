import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from "fs";
const s3Client = new S3({
  region: "ap-south-1",
  // nodejs user from =>which is sub user/sub admin from Root user

  // credentials for node js user access key
  credentials: {
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
  },
});

async function putObject(fileName, readStream) {
  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: "privatefirstbucket",
      Key: `uploads/user-uploads/${fileName}`,
      Body: readStream,
    },
  });
  const logoUploadResponse = await upload.done();
  return logoUploadResponse;
}

export async function invoke(fileName, readStream) {
  const data = await putObject(fileName, readStream);
  return data;
}
