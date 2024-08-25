"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, memo } from "react";

import { getQueryClient } from "@/libs/query";

const Provider = ({ children }: Readonly<{ children: ReactNode }>) => {
  const queryClient = getQueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default memo(Provider);
