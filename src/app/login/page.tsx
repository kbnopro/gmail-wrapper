import { redirect } from "next/navigation";

import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { auth, signIn } from "@/server/auth";

const Page = async () => {
  const session = await auth();
  if (session) {
    return redirect("/");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-blue-950 text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          App name by
          {" "}
          <span className="text-sky-500">Name</span>
        </h1>
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-4">
            <form
              action={async () => {
                "use server";
                await signIn("google", { redirectTo: "/" });
              }}
            >
              <button
                className="cursor-pointer rounded-full bg-white/10 px-4 py-3 font-semibold no-underline transition hover:bg-white/20"
                type="submit"
              >
                <div className="flex items-center justify-center gap-3">
                  <GoogleIcon width={32} height={32} />
                  <div className="h-fit">
                    Sign in with Google
                  </div>
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
