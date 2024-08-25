import { ReactNode, memo } from "react";

import type { Metadata } from "next";

import { configService } from "@/services/server";
import "../styles/global.scss";

export const generateMetadata = async (): Promise<Metadata> => {
  const { title, favicon } = await configService.getBaseConfigs();

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    icons: {
      icon: favicon,
    },
  };
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return children;
};

export default memo(RootLayout);
