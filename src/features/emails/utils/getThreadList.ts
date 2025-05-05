import { MAX_THREAD_PER_PAGE } from "@/config";
import { db } from "@/server/db";

type ReturnType = {
  id: string;
  internalDate: Date;
  subject: string;
  snippet: string;
  threadId: string;
  ownerId: string;
  receiver: string;
  sender: string;
}[];

export const getThreadList = async ({
  userId,
  page,
  search,
}: {
  userId: string;
  page: number;
  search: string;
}) => {
  const limit = MAX_THREAD_PER_PAGE;
  const offset = (page - 1) * limit;
  if (!search.length) {
    return await db.threadList.findMany({
      where: {
        ownerId: userId,
      },
      take: limit,
      skip: offset,
      orderBy: {
        internalDate: "desc",
      },
      omit: {
        content: true,
      },
    });
  }
  return db.$queryRaw<ReturnType>`
      SELECT
        id, "internalDate", "subject", "snippet", tl."threadId", "ownerId", receiver, sender
      FROM
        "ThreadList" tl INNER JOIN
        (
          SELECT DISTINCT "threadId"
          FROM "Message"
          WHERE content LIKE ${`%${search}%`} OR subject LIKE ${`%${search}%`}
        ) tr ON tl."threadId" = tr."threadId";
  `;
};
