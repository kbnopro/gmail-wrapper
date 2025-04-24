import { db } from "@/server/db";

export const getThreadList = async ({
  userId,
  page,
}: {
  userId: string;
  page: number;
}) => {
  const limit = 50;
  const offset = (page - 1) * 50;
  return db.threadList.findMany({
    where: {
      ownerId: userId,
    },
    take: limit,
    skip: offset,
  });
};
