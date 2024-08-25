import { useTranslations } from "next-intl";
import { memo } from "react";

import { appConfig } from "@/utils/config";

import LanguageSelectorItem from "./LanguageSelectorItem";

const LanguageSelector = () => {
  const t = useTranslations("home");

  return (
    <div className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 font-mono backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border  lg:bg-gray-200 lg:p-4 dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:dark:bg-zinc-800/30">
      <div>{t("hello_world_em")}</div>
      <div className="mx-4 flex items-center justify-center space-x-3">
        {appConfig.locales.map((lang, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <LanguageSelectorItem key={index} lang={lang} />
        ))}
      </div>
    </div>
  );
};

export default memo(LanguageSelector);
