import { db } from "@/server/db";

export const getThreadCount = async ({
  userId,
  search,
}: {
  userId: string;
  search: string;
}) => {
  const res = await db.$queryRaw<{ count: BigInteger }[]>`
    SELECT COUNT(1) FROM
      (
      SELECT DISTINCT "threadId"
        FROM "Message"
      WHERE 
        (content LIKE ${`%${search}%`} OR subject LIKE ${`%${search}%`})
        AND "ownerId" = ${userId}
      )
`;
  return Number(res[0]!.count);
};
