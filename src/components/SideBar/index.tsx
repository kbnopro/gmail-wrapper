import { EnvelopeIcon } from "@heroicons/react/24/outline";

import { ComposeButton } from "./ComposeButton";
import { NavigationLinks } from "./NavigationLinks";

export const SideBar = () => {
  return (
    <div className="flex h-full w-64 shrink-0 flex-col items-start">
      <div className="flex h-16 w-full items-center gap-4 px-3">
        <span className="text-xl font-bold text-gray-700">Gmail Wrapper</span>
      </div>
      <div className="flex w-full grow flex-col gap-4 pt-2">
        <div className="px-3">
          <ComposeButton />
        </div>
        <div className="flex h-fit w-full flex-col">
          <NavigationLinks href="/emails/1" mainHref="/email">
            <EnvelopeIcon strokeWidth={2.5} className="size-5"></EnvelopeIcon>
            <div className="relative h-fit text-sm font-bold">Emails</div>
          </NavigationLinks>
        </div>
      </div>
    </div>
  );
};
