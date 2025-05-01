import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { env } from "@env";

import { s3Client } from "@/server/aws";

export const deleteAwsObject = async ({ key }: { key: string }) => {
  const res = await s3Client.send(
    new DeleteObjectCommand({
      Key: key,
      Bucket: env.AWS_BUCKET_NAME,
    }),
  );
  return res;
};
