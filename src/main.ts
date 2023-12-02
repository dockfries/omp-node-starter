import "./commands";
import { GameMode } from "@infernus/core";
import { logger } from "./logger";
import { $t } from "./i18n";
import { cone } from "./controller/pickup";
import "./controller/player";

GameMode.onInit(({ next }) => {
  cone.create();
  logger.info($t("server.running"));
  return next();
});

GameMode.onExit(({ next }) => {
  logger.info($t("server.exit"));
  return next();
});

GameMode.onIncomingConnection(({ next, playerId, ipAddress, port }) => {
  logger.info($t("server.incoming", [playerId, ipAddress, port]));
  return next();
});

GameMode.onRconCommand(({ cmd, next }) => {
  logger.info($t("server.rcon.command", [cmd]));
  return next();
});

GameMode.onRconLoginAttempt(({ ip, password, success, next }) => {
  logger.info($t("server.rcon.attempt", [ip, password, success]));
  return next();
});
