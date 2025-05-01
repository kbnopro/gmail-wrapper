import { PutObjectCommand } from "@aws-sdk/client-s3";
import { env } from "@env";

import { s3Client } from "@/server/aws";

export const putAwsObject = async ({
  key,
  body,
  contentType,
}: {
  key: string;
  body: string;
  contentType: string;
}) => {
  const res = await s3Client.send(
    new PutObjectCommand({
      Key: key,
      Bucket: env.AWS_BUCKET_NAME,
      Body: body,
      ContentType: contentType,
    }),
  );
  return res;
};
