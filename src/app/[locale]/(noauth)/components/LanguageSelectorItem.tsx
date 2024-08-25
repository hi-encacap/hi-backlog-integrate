"use client";

import { snakeCase } from "lodash";
import { useLocale, useTranslations } from "next-intl";
import { memo, useCallback, useMemo } from "react";
import { twMerge } from "tailwind-merge";

import { usePathname, useRouter } from "@/hooks";

interface LanguageSelectorItemProps {
  lang: string;
}

const LanguageSelectorItem = ({ lang }: LanguageSelectorItemProps) => {
  const t = useTranslations("home");
  const locale = useLocale();
  const isCurrent = useMemo(() => lang === locale, [locale, lang]);
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = useCallback(() => {
    if (isCurrent) {
      return;
    }

    router.push(pathname, { locale: lang });
    router.refresh();
  }, [isCurrent, lang, pathname, router]);

  return (
    <button
      className={twMerge("hover:text-blue-500", isCurrent && "text-blue-500")}
      type="button"
      onClick={handleClick}
    >
      {t(snakeCase(lang.toLowerCase()))}
    </button>
  );
};

export default memo(LanguageSelectorItem);
