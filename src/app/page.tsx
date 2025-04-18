import { redirect } from "next/navigation";

import { auth } from "@/server/auth";
import { signOut } from "@/server/auth";

export default async function Home() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <main>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit" className="p-[1px]">
          Sign out
        </button>
      </form>
      This is home page
    </main>
  );
}
