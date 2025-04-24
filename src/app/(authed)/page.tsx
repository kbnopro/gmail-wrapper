import { redirect } from "next/navigation";

import { auth } from "@/server/auth";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/login");

  redirect("/emails/1");
};

export default Page;
