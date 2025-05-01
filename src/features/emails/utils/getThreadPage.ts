import { TRPCError } from "@trpc/server";

import { MAX_THREAD_PER_PAGE } from "@/config";
import { db } from "@/server/db";

export const getThreadPage = async ({
  threadId,
  userId,
}: {
  threadId: string;
  userId: string;
}) => {
  const thread = await db.threadList.findFirstOrThrow({
    where: {
      threadId: threadId,
    },
    select: {
      internalDate: true,
      ownerId: true,
    },
  });
  if (userId != thread.ownerId) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Not the owner",
    });
  }
  const count = await db.threadList.count({
    where: {
      internalDate: {
        gt: thread.internalDate,
      },
    },
  });
  return count / MAX_THREAD_PER_PAGE + 1;
};
