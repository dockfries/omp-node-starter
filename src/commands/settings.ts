import { chooseLanguage } from "@/dialogs/language";
import { ColorEnum } from "@/enums/color";
import { $t } from "@/i18n";
import { PlayerEvent } from "@infernus/core";

PlayerEvent.onCommandText(["language", "lang"], ({ player, next }) => {
  chooseLanguage(player);
  return next();
});

PlayerEvent.onCommandText("isOfficial", ({ player, next }) => {
  const isOfficial = player.isUsingOfficialClient();
  player.sendClientMessage(
    ColorEnum.White,
    $t(
      isOfficial ? "command.official.yes" : "command.official.no",
      null,
      player.locale
    )
  );
  return next();
});
