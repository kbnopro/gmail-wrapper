import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import { getThreadList } from "../utils/getThreadList";
import { syncMessages } from "../utils/syncMessages";

export const messageRouter = createTRPCRouter({
  getList: protectedProcedure
    .input(z.object({ page: z.number() }))
    .query(({ input, ctx }) => {
      return getThreadList({ userId: ctx.session.user.id, page: input.page });
    }),
  syncMessage: protectedProcedure.mutation(({ ctx }) => {
    return syncMessages(ctx.session.user.id);
  }),
});
