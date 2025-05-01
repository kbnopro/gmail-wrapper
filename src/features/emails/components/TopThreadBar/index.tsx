import { BackButton } from "./BackButton";

export const TopThreadBar = ({ threadId }: { threadId: string }) => {
  return (
    <div className="flex h-12 w-full items-center justify-between px-3">
      <BackButton threadId={threadId} />
    </div>
  );
};
