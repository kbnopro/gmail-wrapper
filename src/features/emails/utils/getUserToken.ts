import { db } from "@/server/db";

import { getGoogleAccessToken } from "../api/getGoogleAccessToken";

export const getUserToken = async (userId: string) => {
  try {
    const [googleAccount] = await db.account.findMany({
      where: { userId: userId, provider: "google" },
    });
    if (
      !googleAccount?.expires_at ||
      googleAccount.expires_at * 1000 < Date.now()
    ) {
      // If the access token has expired, try to refresh it
      if (!googleAccount?.refresh_token) {
        console.error(
          "Error refreshing token. The refresh token does not exist.",
        );
        return null;
      }

      const newTokens = await getGoogleAccessToken(googleAccount.refresh_token);

      await db.account.update({
        data: {
          access_token: newTokens.access_token,
          expires_at: Math.floor(Date.now() / 1000 + newTokens.expires_in),
          refresh_token: newTokens.refresh_token ?? googleAccount.refresh_token,
        },
        where: {
          provider_providerAccountId: {
            provider: "google",
            providerAccountId: googleAccount.providerAccountId,
          },
        },
      });
      return newTokens.access_token;
    }
    return googleAccount.access_token;
  } catch (e) {
    console.error(e);
    return null;
  }
};
