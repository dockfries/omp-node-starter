import { ColorEnum } from "@/enums/color";
import { CharsetEnum, LanguageEnum } from "@/enums/language";
import { $t, locales, localesTitle } from "@/i18n";
import { Dialog, DialogStylesEnum, Player } from "@infernus/core";

export const chooseLanguage = async (p: Player) => {
  const currLocale = p.locale as LanguageEnum;

  const info = Object.values(localesTitle).reduce(
    (prev, curr, idx: number): string => {
      return `${prev}${idx + 1}.${curr[currLocale]}\n`;
    },
    ""
  );

  const { listItem: localeIdx } = await new Dialog({
    style: DialogStylesEnum.LIST,
    caption: "Please select the interface language",
    info,
    button1: "ok",
  }).show(p);

  // windows system use ansi
  const charsets = Object.values(CharsetEnum);
  const { listItem: charsetIdx } = await new Dialog({
    style: DialogStylesEnum.LIST,
    caption: "Please select your system's charset",
    info: charsets.reduce(
      (prev: string, curr: CharsetEnum, idx: number): string => {
        return `${prev}${idx + 1}.${curr}\n`;
      },
      ""
    ),
    button1: "ok",
  }).show(p);

  const locale = Object.keys(locales)[localeIdx] as LanguageEnum;
  p.locale = locale;
  p.charset = charsets[charsetIdx];
  p.sendClientMessage(
    ColorEnum.White,
    $t("dialog.lang.change", [localesTitle[locale][locale]], p.locale)
  );
};
