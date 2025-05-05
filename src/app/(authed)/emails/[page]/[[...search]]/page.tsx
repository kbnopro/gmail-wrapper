import { redirect } from "next/navigation";

import { RefreshTokenError } from "@/features/emails/components/RefreshTokenError";
import { ThreadsTable } from "@/features/emails/components/ThreadTable";
import { TopThreadListBar } from "@/features/emails/components/TopThreadListBar";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";

const Page = async ({
  params,
}: {
  params: Promise<{ page: string; search?: string[] }>;
}) => {
  const session = await auth();
  const { page, search } = await params;
  if (!session) redirect("/login");
  const refreshTokenError = session.error === "RefreshTokenError";
  const pageInt = parseInt(page);
  if (isNaN(pageInt)) {
    throw new Error("Invalid page");
  }
  if (search && search.length > 1) {
    redirect(`/emails/${page}/${search[0]!}`);
  }
  const searchString = decodeURIComponent(search?.at(0) ?? "");
  await api.thread.getList.prefetch({ page: pageInt, search: searchString });
  await api.thread.count.prefetch();

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white">
      {refreshTokenError && <RefreshTokenError />}
      <HydrateClient>
        <TopThreadListBar page={pageInt} search={searchString} />
        <ThreadsTable
          email={session.user.email!}
          page={pageInt}
          search={searchString}
        />
      </HydrateClient>
    </div>
  );
};

export default Page;
