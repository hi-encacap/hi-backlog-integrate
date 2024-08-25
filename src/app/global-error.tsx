"use client";

import * as Sentry from "@sentry/nextjs";
import Error from "next/error";
import { memo, useEffect } from "react";

interface GlobalErrorProps {
  error: Error;
}

const GlobalError = ({ error }: GlobalErrorProps) => {
  const isDev = process.env.NODE_ENV === "development";

  useEffect(() => {
    if (isDev) return;

    Sentry.captureException(error);
  }, [error, isDev]);

  return (
    <html lang="en">
      <body>
        <Error statusCode={null as unknown as never} />
      </body>
    </html>
  );
};

export default memo(GlobalError);
