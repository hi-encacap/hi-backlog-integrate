import pino, { LoggerOptions, TransportTargetOptions } from "pino";

import { env } from "./env";

const logtailSourceToken = env.NEXT_APP_LOGTAIL_SOURCE_TOKEN;
const isDev = process.env.NODE_ENV === "development";

const options: TransportTargetOptions = {
  target: "pino-pretty",
  options: {
    colorize: true,
    levelFirst: true,
    ignore: "pid,hostname",
  },
};

if (!isDev && logtailSourceToken) {
  options.target = "@logtail/pino";
  options.options = {
    sourceToken: logtailSourceToken,
  };
}

const transport = pino.transport(options) as LoggerOptions;
const logger = pino(transport);

export { logger };
