import createMiddleware from "next-intl/middleware";

import { auth } from "./utils/auth";
import { appConfig } from "./utils/config";

const intlMiddleware = createMiddleware({
  locales: appConfig.locales,
  localePrefix: "as-needed",
  defaultLocale: appConfig.defaultLocale,
});

export default auth(intlMiddleware);

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
