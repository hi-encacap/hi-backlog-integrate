import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

import { appConfig } from "@/utils/config";

export default getRequestConfig(async ({ locale }) => {
  if (!appConfig.locales.includes(locale)) {
    notFound();
  }

  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    messages: (await import(`../locales/${locale}.json`)).default,
  };
});

export const {
  Link: IntlLink,
  redirect,
  usePathname: intlUsePathname,
  useRouter: intlUseRouter,
} = createSharedPathnamesNavigation({
  locales: appConfig.locales,
});
