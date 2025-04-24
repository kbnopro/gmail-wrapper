import { PencilIcon } from "@heroicons/react/24/outline";

export const ComposeButton = () => {
  return (
    <div className="flex size-fit cursor-pointer items-center gap-3 rounded-xl bg-sky-200/90 px-5 py-4 text-gray-800">
      <PencilIcon className="size-5" strokeWidth={2} />
      <div className="text-sm font-semibold">Compose</div>
    </div>
  );
};
