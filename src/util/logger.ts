import winston from "winston";

export const logger = winston.createLogger({
  level: "debug",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({
          all: true,
        }),
        winston.format.timestamp({
          format: "YY-MM-DD HH:mm:ss.SSS",
        }),
        winston.format.prettyPrint(),
        winston.format.splat(),
        winston.format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
    }),
  ],
});

export function setLogLevel(displayLogs: boolean) {
  logger.transports[0].level = displayLogs ? "debug" : "info";
}
