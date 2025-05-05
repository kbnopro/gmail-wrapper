import { redirect } from "next/navigation";

import { RefreshTokenError } from "@/features/emails/components/RefreshTokenError";
import { ThreadsTable } from "@/features/emails/components/ThreadTable";
import { TopThreadListBar } from "@/features/emails/components/TopThreadListBar";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";

const Page = async ({ params }: { params: Promise<{ page: string }> }) => {
  const session = await auth();
  const { page } = await params;
  if (!session) redirect("/login");
  const refreshTokenError = session.error === "RefreshTokenError";
  const pageInt = parseInt(page);
  if (isNaN(pageInt)) {
    throw new Error("Invalid page");
  }
  void api.thread.getList.prefetch({ page: pageInt, search: "" });
  void api.thread.count.prefetch({ search: "" });

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white">
      {refreshTokenError && <RefreshTokenError />}
      <HydrateClient>
        <TopThreadListBar page={pageInt} />
        <ThreadsTable email={session.user.email!} page={pageInt} />
      </HydrateClient>
    </div>
  );
};

export default Page;
