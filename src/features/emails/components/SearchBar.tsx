import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export const SearchBar = () => {
  return (
    <div className="ml-2 flex size-fit h-11 w-full max-w-2xl items-center gap-3 rounded-full bg-slate-200/70 px-5">
      <MagnifyingGlassIcon className="size-[18px]" strokeWidth={2} />
      <div className="text-md h-fit text-gray-500">Search mail</div>
    </div>
  );
};
