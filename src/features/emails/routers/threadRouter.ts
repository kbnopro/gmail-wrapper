import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import { getThreadList } from "../queries/getThreadList";

export const threadRouter = createTRPCRouter({
  getList: protectedProcedure
    .input(z.object({ page: z.number() }))
    .query(({ input, ctx }) => {
      return getThreadList({ userId: ctx.session.user.id, page: input.page });
    }),
});
