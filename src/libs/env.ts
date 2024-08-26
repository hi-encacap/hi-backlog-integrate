import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_API_BASE_URL: z.string(),
    NEXT_PUBLIC_SITE_URL: z.string(),
    NEXT_PUBLIC_NULAB_CLIENT_ID: z.string(),
    NEXT_PUBLIC_NULAB_BASE_URL: z.string(),
    NEXT_PUBLIC_LOGTAIL_SOURCE_TOKEN: z.string(),
  },
  server: {
    NEXT_APP_NULAB_CLIENT_SECRET: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_LOGTAIL_SOURCE_TOKEN: process.env.NEXT_PUBLIC_LOGTAIL_SOURCE_TOKEN,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_NULAB_CLIENT_ID: process.env.NEXT_PUBLIC_NULAB_CLIENT_ID,
    NEXT_PUBLIC_NULAB_BASE_URL: process.env.NEXT_PUBLIC_NULAB_BASE_URL,
    NEXT_APP_NULAB_CLIENT_SECRET: process.env.NEXT_APP_NULAB_CLIENT_SECRET,
  },
});
