import {
  ArrowPathIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

export const TopEmailBar = () => {
  return (
    <div className="flex h-12 w-full items-center justify-between px-3">
      <button className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100">
        <ArrowPathIcon className="size-5" />
      </button>
      <div className="flex h-full w-fit items-center gap-2">
        <div className="text-xs text-gray-500">12-34 of 5678 </div>
        <div className="flex size-10 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100">
          <ChevronLeftIcon className="size-3 text-gray-700" strokeWidth={2.5} />
        </div>
        <div className="flex size-10 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100">
          <ChevronRightIcon
            className="size-3 text-gray-700"
            strokeWidth={2.5}
          />
        </div>
      </div>
    </div>
  );
};
