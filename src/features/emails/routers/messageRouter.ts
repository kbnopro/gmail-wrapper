import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import { getMessages } from "../utils/getMessages";
import { syncMessages } from "../utils/syncMessages";

export const messageRouter = createTRPCRouter({
  sync: protectedProcedure.mutation(({ ctx }) => {
    return syncMessages(ctx.session.user.id);
  }),
  getAll: protectedProcedure
    .input(z.object({ threadId: z.string() }))
    .query(({ ctx, input }) => {
      return getMessages({
        threadId: input.threadId,
        userId: ctx.session.user.id,
      });
    }),
});
