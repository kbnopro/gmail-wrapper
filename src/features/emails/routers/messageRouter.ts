import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import { syncMessages } from "../utils/syncMessages";

export const messageRouter = createTRPCRouter({
  sync: protectedProcedure.mutation(({ ctx }) => {
    return syncMessages(ctx.session.user.id);
  }),
});
