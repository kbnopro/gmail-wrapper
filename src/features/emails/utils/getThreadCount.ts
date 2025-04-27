import { db } from "@/server/db";

export const getThreadCount = async (userId: string) => {
  return await db.threadList.count({
    where: {
      ownerId: userId,
    },
  });
};
