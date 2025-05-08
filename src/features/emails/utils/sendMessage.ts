import MailComposure from "nodemailer/lib/mail-composer";

import { sendGoogleMessage } from "../api/sendGoogleMessage";
import { getUserToken } from "./getUserToken";
import { syncMessages } from "./syncMessages";

interface SendData {
  type: "none" | "send" | "reply" | "forward";
  userId: string;
  email: string;
  username: string;
  recipients: string[];
  subject: string;
  html: string;
  replyContext?: {
    references: string;
    inReplyTo: string;
    threadId: string;
  };
}

export const sendMessage = async ({
  type,
  userId,
  username,
  email,
  recipients,
  html,
  subject,
  replyContext,
}: SendData) => {
  const token = await getUserToken(userId);
  if (!token) {
    // TODO: Handle error getting token
    return;
  }

  const mailObject = new MailComposure({
    from: {
      name: username,
      address: email,
    },
    to: recipients,
    html: html,
    subject: subject,
    references: type == "reply" ? replyContext?.references : undefined,
    inReplyTo: type == "reply" ? replyContext?.inReplyTo : undefined,
  }).compile();
  const rawBody = (await mailObject.build()).toString("base64");
  console.log((await mailObject.build()).toString());
  const res = await sendGoogleMessage({
    token,
    message: {
      raw: rawBody,
      threadId: type == "reply" ? replyContext?.threadId : undefined,
    },
  });
  await syncMessages(userId);
  return res;
};
