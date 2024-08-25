import { ReactNode, memo } from "react";

import { redirect } from "@/libs/i18n";
import { auth } from "@/utils/auth";

const AuthLayout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  const session = await auth();

  if (!session) {
    return redirect("/auth/login");
  }

  return children as JSX.Element;
};

export default memo(AuthLayout);
