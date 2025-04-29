import { waitUntil } from "@vercel/functions";
import { NextResponse } from "next/server";

import { syncMessages } from "@/features/emails/utils/syncMessages";
import { db } from "@/server/db";

export const GET = async () => {
  const users = await db.user.findMany({
    select: {
      id: true,
    },
  });
  waitUntil(
    Promise.all(
      users.map(async (user) => {
        await syncMessages(user.id);
      }),
    ),
  );
  return NextResponse.json({}, { status: 200 });
};
