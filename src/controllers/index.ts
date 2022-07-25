import {
  OnGameModeInit,
  OnGameModeExit,
  OnPlayerConnect,
  OnPlayerCommandText,
  SendClientMessageToAll,
} from "samp-node-lib";

import CmdBus from "@/utils/CmdBus";

import Color from "@/enums/color";

import "@/commands";
import $t from "@/utils/i18n";

class GameMode {
  private static instance: GameMode;
  private initialized: boolean = false;
  private constructor() {}
  public static getInstance(): GameMode {
    if (!GameMode.instance) GameMode.instance = new GameMode();
    return GameMode.instance;
  }

  public init(func: () => void): void {
    if (this.initialized) {
      throw new Error($t("error.initTwice"));
    }
    this.initialized = true;

    OnGameModeInit(() => {
      // delay to next event loop
      setTimeout(() => func());
    });

    OnGameModeExit(() => {
      if (!this.initialized) return;
      this.initialized = false;
    });

    OnPlayerCommandText((player, cmdtext): number => {
      /* 
        Use eventBus to observe and subscribe to level 1 instructions, support string and array pass, array used for alias.
        Pass the split instruction through call array deconstruction or apply
        The first step is to extract the cmdtext with the re into an array, such as /car 411
        There may be many Spaces in the middle, but remove them all
      */
      const regCmdtext = cmdtext.match(/[^/\s]+/gi);
      if (regCmdtext === null || regCmdtext.length === 0) {
        player.SendClientMessage(Color.yellow, $t("error.commandFormat"));
        return 1;
      }
      const exist: boolean = CmdBus.emit(
        player,
        regCmdtext[0],
        regCmdtext.splice(1)
      );
      if (!exist) {
        player.SendClientMessage(
          Color.white,
          $t("error.commandUndefined", [cmdtext])
        );
      }
      return 1;
    });

    OnPlayerConnect((player) => {
      // There should be a better way to get names than passing in length as in the past
      const name: string = player.GetPlayerName(24);
      SendClientMessageToAll(Color.blue, $t("server.welcome", [name]));
      player.SendClientMessage(
        Color.white,
        $t("server.greet", [name, player.playerid])
      );
    });
  }
}

export { GameMode };
