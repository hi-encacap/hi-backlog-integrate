import { NextIntlClientProvider, useMessages } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { Be_Vietnam_Pro as BeVietnamPro } from "next/font/google";
import { notFound } from "next/navigation";
import { ReactNode, memo } from "react";

import { appConfig } from "@/utils/config";

import Provider from "../provider";

const beVietnamPro = BeVietnamPro({
  subsets: ["latin"],
  variable: "--font-be-vietnam-pro",
  weight: ["400", "500", "600", "700"],
});

const LocaleLayout = ({
  children,
  params: { locale },
}: Readonly<{ children: ReactNode }> & BasePageProps) => {
  unstable_setRequestLocale(locale);

  if (!appConfig.locales.includes(locale)) notFound();

  const messages = useMessages();

  return (
    <html className={beVietnamPro.variable} lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Provider>{children}</Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export function generateStaticParams() {
  return appConfig.locales.map((locale) => ({ locale }));
}

export default memo(LocaleLayout);
