import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import { getThreadCount } from "../utils/getThreadCount";
import { getThreadList } from "../utils/getThreadList";
import { getThreadPage } from "../utils/getThreadPage";

export const threadRouter = createTRPCRouter({
  getList: protectedProcedure
    .input(z.object({ page: z.number(), search: z.string() }))
    .query(({ input, ctx }) => {
      return getThreadList({
        userId: ctx.session.user.id,
        page: input.page,
        search: input.search,
      });
    }),
  count: protectedProcedure
    .input(z.object({ search: z.string() }))
    .query(({ ctx, input }) => {
      return getThreadCount({
        userId: ctx.session.user.id,
        search: input.search,
      });
    }),
  getPage: protectedProcedure
    .input(z.object({ threadId: z.string() }))
    .query(({ ctx, input }) => {
      return getThreadPage({
        threadId: input.threadId,
        userId: ctx.session.user.id,
      });
    }),
});
