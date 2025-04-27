import { MAX_THREAD_PER_PAGE } from "@/config";
import { db } from "@/server/db";

export const getThreadList = async ({
  userId,
  page,
}: {
  userId: string;
  page: number;
}) => {
  const limit = MAX_THREAD_PER_PAGE;
  const offset = (page - 1) * limit;
  const data = await db.threadList.findMany({
    where: {
      ownerId: userId,
    },
    take: limit,
    skip: offset,
    orderBy: {
      internalDate: "desc",
    },
  });
  return data;
};
