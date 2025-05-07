import MailComposure from "nodemailer/lib/mail-composer";

import { sendGoogleMessage } from "../api/sendGoogleMessage";
import { getUserToken } from "./getUserToken";
import { syncMessages } from "./syncMessages";

interface SendData {
  userId: string;
  email: string;
  username: string;
  recipients: string[];
  subject: string;
  html: string;
}

export const sendMessage = async ({
  userId,
  username,
  email,
  recipients,
  html,
  subject,
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
  }).compile();
  const rawBody = (await mailObject.build()).toString("base64");
  const res = await sendGoogleMessage({
    token,
    message: {
      raw: rawBody,
    },
  });
  await syncMessages(userId);
  return res;
};
