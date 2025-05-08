import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import { getMessages } from "../utils/getMessages";
import { sendMessage } from "../utils/sendMessage";
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
  send: protectedProcedure
    .input(
      z.object({
        type: z.enum(["none", "send", "reply", "forward"]),
        recipients: z.array(z.string()),
        subject: z.string(),
        html: z.string(),
        replyContext: z
          .object({
            references: z.string(),
            inReplyTo: z.string(),
            threadId: z.string(),
          })
          .optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return sendMessage({
        userId: ctx.session.user.id,
        username: ctx.session.user.name!,
        email: ctx.session.user.email!,
        ...input,
      });
    }),
});
