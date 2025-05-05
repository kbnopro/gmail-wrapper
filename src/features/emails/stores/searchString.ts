import { create } from "zustand";

export const useSearchStore = create<{
  searchString: string;
  setSearchString: (searchString: string) => void;
}>((set) => ({
  searchString: "",
  setSearchString: (searchString: string) =>
    set(() => ({ searchString: searchString })),
}));
