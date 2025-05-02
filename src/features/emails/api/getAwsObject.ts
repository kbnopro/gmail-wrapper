import { GetObjectCommand } from "@aws-sdk/client-s3";
import { env } from "@env";

import { s3Client } from "@/server/aws";

export const getAwsObject = async ({ key }: { key: string }) => {
  const { Body } = await s3Client.send(
    new GetObjectCommand({
      Key: key,
      Bucket: env.AWS_BUCKET_NAME,
    }),
  );
  return (await Body?.transformToString("utf-8")) ?? "";
};
