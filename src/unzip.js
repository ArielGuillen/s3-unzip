import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

import JSZip from "jszip";
import mime from "mime-types";
import * as dotenv from "dotenv";
dotenv.config();

import { s3, bucketName } from "./config/s3Client.js";

export async function unzipS3File(path, filename) {
  const zipFile = await unzip(path, filename);
  await upload(zipFile, path, filename);
}

async function unzip(path, filename) {

  // Download the zip file from the Bucket of Origin
  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: `${process.env.S3_PATH}${path}${filename}.zip`,
    });
    const { Body: data } = await s3.send(command);

    // Decompresses the zip file in memory
    const chunks = [];
    for await (const chunk of data) 
      chunks.push(chunk);
    
    const buffer = Buffer.concat(chunks);
    return buffer;
  } catch (error) {
    console.log(error);
  }
}

async function upload(buffer, path, zipname) {
  try {
    // Decompresses the zip file in memory
    const zip = await JSZip.loadAsync(buffer);
    const files = zip.file(/.*/);

    // itera on the files extracted and open to the destination bucket
    for (const file of files) {
      const filename = file.name;
      const fileData = await file.async("nodebuffer");
      const mimeType = mime.lookup(file.name) || 'application/octet-stream';
      const destinationKey = `${process.env.S3_PATH}${path}${zipname}/${filename}`;

      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: destinationKey,
        Body: fileData,
        ContentType: mimeType,
        ACL: "public-read",
      });
      await s3.send(command);

      console.log(`File ${filename} successfully unzipped and uploaded`);
    }
  } catch (error) {
    console.log(error);
  }
}