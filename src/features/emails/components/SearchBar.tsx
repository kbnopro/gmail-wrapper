"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import { useSearchStore } from "../stores/searchString";

export const SearchBar = () => {
  const searchString = useSearchStore((state) => state.searchString);
  const setSearchString = useSearchStore((state) => state.setSearchString);
  const [isTyping, setIsTyping] = useState(false);
  if (isTyping) {
    return (
      <div className="ml-2 flex size-fit h-11 w-full max-w-2xl cursor-text items-center gap-3 rounded-full border bg-white px-5 text-gray-800 shadow-md">
        <MagnifyingGlassIcon className="size-[18px]" strokeWidth={2} />
        <input
          autoFocus
          className="w-full focus:outline-0"
          onBlur={() => {
            setIsTyping(false);
          }}
          defaultValue={searchString}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              setIsTyping(false);
              setSearchString(e.currentTarget.value);
            }
          }}
        />
      </div>
    );
  }
  return (
    <button
      onClick={() => {
        setIsTyping(true);
      }}
      className="ml-2 flex size-fit h-11 w-full max-w-2xl cursor-text items-center gap-3 rounded-full bg-slate-200/70 px-5 text-gray-800"
    >
      <MagnifyingGlassIcon className="size-[18px]" strokeWidth={2} />
      {searchString.length ? (
        <div className="text-md h-fit text-gray-800">{searchString}</div>
      ) : (
        <div className="text-md h-fit text-gray-500">Search mail</div>
      )}
    </button>
  );
};
