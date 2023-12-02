import { ColorEnum } from "@/enums/color";
import { $t } from "@/i18n";
import { PlayerEvent } from "@infernus/core";

PlayerEvent.onCommandText(
  ["r", "reg", "register"],
  ({ player, subcommand, next }) => {
    player.sendClientMessage(
      ColorEnum.White,
      $t("command.reg", [subcommand], player.locale)
    );
    return next();
  }
);

PlayerEvent.onCommandText(["l", "login"], ({ player, subcommand, next }) => {
  player.sendClientMessage(
    ColorEnum.White,
    $t("command.login", [subcommand], player.locale)
  );
  return next();
});
