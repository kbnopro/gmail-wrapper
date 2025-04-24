import { env } from "@env";

export const getGoogleAccessToken = async (refreshToken: string) => {
  // https://accounts.google.com/.well-known/openid-configuration
  // We need the `token_endpoint`.
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    body: new URLSearchParams({
      client_id: env.AUTH_GOOGLE_ID,
      client_secret: env.AUTH_GOOGLE_SECRET,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    console.error(await response.json());
    throw new Error("Error resetting token");
  }

  return (await response.json()) as {
    access_token: string;
    expires_in: number;
    refresh_token?: string;
  };
};
