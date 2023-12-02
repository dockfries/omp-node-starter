import { chooseLanguage } from "@/dialogs/language";
import { ColorEnum } from "@/enums/color";
import { $t } from "@/i18n";
import { logger } from "@/logger";
import { Player, PlayerEvent } from "@infernus/core";

PlayerEvent.onConnect(async ({ player, next }) => {
  await chooseLanguage(player);
  player.sendClientMessage(
    ColorEnum.PrimaryBlue,
    $t("player.hello", [player.getName()], player.locale)
  );
  player.sendClientMessage(
    ColorEnum.Warn,
    $t("player.version", [player.getVersion()], player.locale)
  );
  player.sendClientMessage(
    ColorEnum.White,
    $t("player.ip", [player.getIp()], player.locale)
  );
  player.sendClientMessage(
    ColorEnum.White,
    $t("player.ping", [player.getPing()], player.locale)
  );
  player.sendClientMessage(
    ColorEnum.White,
    $t("player.rawIp", [player.getRawIp()], player.locale)
  );
  return next();
});

PlayerEvent.onSpawn(({ player, next }) => {
  player.setPos(1536.8569, -1688.5819, 13.5469);
  return next();
});

PlayerEvent.onDisconnect(({ player, reason, next }) => {
  Player.getInstances().forEach((p) => {
    p.sendClientMessage(
      ColorEnum.White,
      $t("player.disconnect", [player.getName(), reason], player.locale)
    );
  });
  return next();
});

PlayerEvent.onCommandError(({ player, command, error, next }) => {
  player.sendClientMessage(
    ColorEnum.Danger,
    $t("command.error", [command, error.code, error.msg], player.locale)
  );
  next();
  return true;
});

PlayerEvent.onKeyStateChange(({ player, newKeys, oldKeys, next }) => {
  player.sendClientMessage(
    ColorEnum.White,
    $t(
      "player.keyStateChange",
      [player.getName(), Date.now(), newKeys, oldKeys],
      player.locale
    )
  );
  return next();
});

PlayerEvent.onPause(({ player, pausedAt, next }) => {
  logger.info($t("player.pause", [player.getName(), pausedAt], player.locale));
  return next();
});

PlayerEvent.onResume(({ player, diff, next }) => {
  const msg = $t("player.resume", [player.getName(), diff], player.locale);
  logger.info(msg);
  player.sendClientMessage(ColorEnum.White, msg);
  return next();
});
