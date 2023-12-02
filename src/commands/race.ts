import { ColorEnum } from "@/enums/color";
import { $t } from "@/i18n";
import { PlayerEvent } from "@infernus/core";

PlayerEvent.onCommandText("race", ({ player, subcommand, next }) => {
  // subcommand command, means like /race s
  if (subcommand[0] === "s") {
    player.sendClientMessage(
      ColorEnum.White,
      $t("command.next", [subcommand.toString()], player.locale)
    );
    return next();
  }
  return false;
});
