import { GameMode } from "@infernus/core";
import {
  onIncomingPacket,
  onIncomingRPC,
  onOutgoingPacket,
  onOutgoingRPC,
} from "@infernus/raknet";
import "./commands";
import { logger } from "./logger";
import { $t } from "./i18n";
import { cone } from "./controller/pickup";
import "./controller/player";

// raknet callbacks
// if you do not register, it will block all rpc and packets
onIncomingPacket(({ next }) => {
  return next();
});

onIncomingRPC(({ next }) => {
  return next();
});

onOutgoingPacket(({ next }) => {
  return next();
});

onOutgoingRPC(({ next }) => {
  return next();
});

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
