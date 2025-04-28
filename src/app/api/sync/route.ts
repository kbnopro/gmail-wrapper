import { syncMessages } from "@/features/emails/utils/syncMessages";
import { db } from "@/server/db";

export const GET = async () => {
  const users = await db.user.findMany({
    select: {
      id: true,
    },
  });
  users.forEach((user) => {
    void syncMessages(user.id);
  });
};
