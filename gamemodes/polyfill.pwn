/*
    A polyfill that makes the string arguments in the existing sa:mp callback function return to the samp-node event as byte arrays.
	Author: dockfries
*/

#include <open.mp>
#include <streamer>
#include <samp-node>

main() {}

forward OnClientMessage(color, text[]);
public OnClientMessage(color, text[]) {
    return SAMPNode_CallEvent("OnClientMessageI18n", color, text, strlen(text));
}

public OnDialogResponse(playerid, dialogid, response, listitem, inputtext[]) {
    return SAMPNode_CallEvent("OnDialogResponseI18n", playerid, dialogid, response, listitem, inputtext, strlen(inputtext));
}

forward OnNPCDisconnect(reason[]);
public OnNPCDisconnect(reason[]) {
    return SAMPNode_CallEvent("OnNPCDisconnectI18n", reason, strlen(reason));
}

public OnPlayerCommandText(playerid, cmdtext[]) {
    return SAMPNode_CallEvent("OnPlayerCommandTextI18n", playerid, cmdtext, strlen(cmdtext));
}

public OnPlayerText(playerid, text[]) {
    return SAMPNode_CallEvent("OnPlayerTextI18n", playerid, text, strlen(text));
}

public OnRconCommand(cmd[]) {
    return SAMPNode_CallEvent("OnRconCommandI18n", cmd, strlen(cmd));
}

public OnRconLoginAttempt(ip[], password[], success) {
    return SAMPNode_CallEvent("OnRconLoginAttemptI18n", ip, strlen(ip), password, strlen(password), success);
}