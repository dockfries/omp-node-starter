import { join } from "path";
import pino from "pino";

export const logger = pino({
  transport: {
    targets: [
      {
        target: "pino-pretty",
        options: {
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
        },
      },
      {
        target: "pino-roll",
        options: {
          file: join("logs", "log"),
          mkdir: true,
          frequency: "daily",
          limit: {
            count: 3,
          },
          dateFormat: "yyyy-MM-dd",
        },
      },
    ],
  },
});

process.on("uncaughtException", (err) => {
  logger.error(err);
});
