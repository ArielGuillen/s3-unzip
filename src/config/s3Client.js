import * as dotenv from "dotenv";
dotenv.config();

import { S3Client } from "@aws-sdk/client-s3";

const s3Config = {
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};


export const s3 = new S3Client(s3Config);
