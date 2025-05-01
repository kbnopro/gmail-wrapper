import { ThreadBody } from "@/features/emails/components/ThreadBody";
import { TopThreadBar } from "@/features/emails/components/TopThreadBar";
import { api, HydrateClient } from "@/trpc/server";

const Page = async ({ params }: { params: Promise<{ threadId: string }> }) => {
  const { threadId } = await params;

  void api.thread.getPage.prefetch({ threadId });
  void api.message.getAll.prefetch({ threadId });

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white">
      <HydrateClient>
        <TopThreadBar threadId={threadId} />
        <ThreadBody threadId={threadId} />
      </HydrateClient>
    </div>
  );
};

export default Page;
