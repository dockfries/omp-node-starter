import { $t } from "@/i18n";
import { logger } from "@/logger";
import { Dialog, DialogStylesEnum, PlayerEvent } from "@infernus/core";

// middleware supports async callbacks, but it doesn't care about the return value, whether you return true/false/next ()
PlayerEvent.onCommandText("help", async ({ player, next }) => {
  const res = await new Dialog({
    style: DialogStylesEnum.MSGBOX,
    caption: $t("dialog.help.caption", null, player.locale),
    info: $t("dialog.help.info", null, player.locale),
    button1: $t("dialog.help.button1", null, player.locale),
  }).show(player);

  logger.info(res);
  return next();
});
