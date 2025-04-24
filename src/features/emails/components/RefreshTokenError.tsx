import { auth, signIn } from "@/server/auth";

const LoginButton = async () => {
  const session = await auth();
  if (!session) {
    return <></>;
  }
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", undefined, {
          prompt: "consent",
          login_hint: session.user.email ?? "",
        });
      }}
    >
      <button
        type="submit"
        className="flex w-full items-center justify-start gap-2 rounded-md bg-blue-500 p-1 px-2 text-white"
      >
        <div>Sign in again</div>
      </button>
    </form>
  );
};

export const RefreshTokenError = () => {
  return (
    <div className="flex h-10 w-full items-center justify-center gap-1 font-semibold text-gray-700">
      Token expired. <LoginButton /> to sync mails.
    </div>
  );
};
