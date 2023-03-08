import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

import * as dotenv from "dotenv";
import JSZip from "jszip";

import { s3 } from "./config/s3Client.js";

dotenv.config();

async function unzipAndUpload() {
  const sourceBucket = process.env.S3_BUCKET_NAME;
  const sourceKey = process.env.S3_PATH + "lenna.zip";
  const destinationPrefix = process.env.S3_PATH;

  // Download the zip file from the Bucket of Origin
  const input = {
    Bucket: sourceBucket,
    Key: sourceKey,
  };
  try {
    const command = new GetObjectCommand(input);
    const { Body: data } = await s3.send(command);

    // Decompresses the zip file in memory
    const chunks = [];
    for await (const chunk of data) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // Decompresses the zip file in memory
    const zip = await JSZip.loadAsync(buffer);
    const files = zip.file(/.*/);

    // itera on the files extracted and open to the destination bucket
    for (const file of files) {
      const filename = file.name;
      const fileData = await file.async("nodebuffer");
      const destinationKey = `${destinationPrefix}${filename}`;

      const command = new PutObjectCommand({
        Bucket: sourceBucket,
        Key: destinationKey,
        Body: fileData,
        ACL: "public-read",
      });
      await s3.send(command);

      console.log(`File Uploaded to ${destinationKey}`);
    }
  } catch (error) {
    console.log(error);
  }
  
}

unzipAndUpload().catch((err) => {
  console.error(err);
});
