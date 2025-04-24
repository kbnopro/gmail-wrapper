import { redirect } from "next/navigation";

import { AccountButton } from "@/components/AccountButton";
import { RefreshTokenError } from "@/features/emails/components/RefreshTokenError";
import { SearchBar } from "@/features/emails/components/SearchBar";
import { TopEmailBar } from "@/features/emails/components/TopEmailBar";
import { auth } from "@/server/auth";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/login");
  const refreshTokenError = session.error === "RefreshTokenError";

  return (
    <div className="flex h-screen max-h-screen w-full flex-col">
      <div className="flex h-16 w-full shrink-0 items-center">
        <SearchBar />
        <div className="flex grow justify-end px-2 md:px-4">
          <AccountButton />
        </div>
      </div>
      <div className="h-full w-full overflow-hidden rounded-2xl bg-white">
        {refreshTokenError && <RefreshTokenError />}
        <TopEmailBar />
      </div>
    </div>
  );
};

export default Page;
