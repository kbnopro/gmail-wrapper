import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { redirect } from "next/navigation";

import { auth, signOut } from "@/server/auth";

export const AccountButton = async () => {
  const session = await auth();
  if (!session) redirect("/login");
  return (
    <Popover>
      <PopoverButton className="overflow-hidden rounded-full focus:outline-0">
        {session.user.name ? (
          <div className="flex size-8 items-center justify-center bg-sky-500 text-white">
            <div className="relative top-px grow">{session.user.name[0]}</div>
          </div>
        ) : (
          <></>
        )}
      </PopoverButton>
      <PopoverPanel
        className="z-50 w-72 rounded-lg border border-gray-300 bg-white p-3 shadow-md"
        anchor={{
          to: "bottom end",
          gap: "5px",
        }}
      >
        <div className="flex h-fit w-full flex-col items-stretch justify-start">
          <div className="mb-3 flex h-fit w-full flex-col items-start justify-start border-b border-b-gray-200 pb-3">
            <div className="text-xs text-gray-800">{session.user.name}</div>
            <div className="text-xs text-gray-800">{session.user.email}</div>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button
              type="submit"
              className="flex w-full items-center justify-start gap-2 text-sm text-gray-700"
            >
              <ArrowLeftStartOnRectangleIcon className="size-4" />
              <div className="text-sm">Log out</div>
            </button>
          </form>
        </div>
      </PopoverPanel>
    </Popover>
  );
};
