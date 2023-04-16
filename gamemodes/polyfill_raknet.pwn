/*
    A polyfill that makes the string arguments in the existing sa:mp callback function return to the samp-node event as byte arrays.
	This file supports raknet for omp.
	
	Author: dockfries
*/

#include <open.mp>
#include <Pawn.RakNet>
#include <streamer>
#include <samp-node>

main() {}

enum E_RakNetNatives {
    SEND_PACKET = 0,
    SEND_RPC = 1,
    EMULATE_INCOMING_PACKET = 2,
    EMULATE_INCOMING_RPC = 3,
    NEW = 4,
    NEW_COPY = 5,
    DELETE = 6,
    RESET = 7,
    RESET_READ_POINTER = 8,
    RESET_WRITE_POINTER = 9,
    IGNORE_BITS = 10,
    SET_WRITE_OFFSET = 11,
    GET_WRITE_OFFSET = 12,
    SET_READ_OFFSET = 13,
    GET_READ_OFFSET = 14,
    GET_NUMBER_OF_BITS_USED = 15,
    GET_NUMBER_OF_BYTES_USED = 16,
    GET_NUMBER_OF_UNREAD_BITS = 17,
    GET_NUMBER_OF_BITS_ALLOCATED = 18,
    WRITE_VALUE = 19,
    READ_VALUE = 20
};

forward RakNetNatives(...);

public RakNetNatives(...)
{
    new E_RakNetNatives:function_id = E_RakNetNatives:getarg(0);	
    new BitStream:bs = BitStream:getarg(0, 1);
	
    switch (function_id) 
    {
        case SEND_PACKET:
            return PR_SendPacket(bs, getarg(0, 2), PR_PacketPriority:getarg(0, 3), PR_PacketReliability:getarg(0, 4), getarg(0, 5));
        case SEND_RPC:
            return PR_SendRPC(bs, getarg(0, 2), getarg(0, 3), PR_PacketPriority:getarg(0, 4), PR_PacketReliability:getarg(0, 5), getarg(0, 6));
        case EMULATE_INCOMING_PACKET:
            return PR_EmulateIncomingPacket(bs, getarg(0, 2));
        case EMULATE_INCOMING_RPC:
            return PR_EmulateIncomingRPC(bs, getarg(0, 2), getarg(0, 3));
        case NEW:
            return _:BS_New();
        case NEW_COPY:
            return _:BS_NewCopy(bs);
        case DELETE:
            return BS_Delete(bs);
        case RESET:
            return BS_Reset(bs);
        case RESET_READ_POINTER:
            return BS_ResetReadPointer(bs);
        case RESET_WRITE_POINTER:
            return BS_ResetWritePointer(bs);
        case IGNORE_BITS:
            return BS_IgnoreBits(bs, getarg(0, 2));
        case SET_WRITE_OFFSET:
            return BS_SetWriteOffset(bs, getarg(0, 2));
        case GET_WRITE_OFFSET:
            {
                new offset;
                BS_GetWriteOffset(bs, offset);
                return offset;
            }
        case SET_READ_OFFSET:
            return BS_SetReadOffset(bs, getarg(0, 2));
        case GET_READ_OFFSET:
            {
                new offset;
                BS_GetReadOffset(bs, offset);
                return offset;
            }
        case GET_NUMBER_OF_BITS_USED:
            {
                new count;
                BS_GetNumberOfBitsUsed(bs, count);
                return count;
            }
        case GET_NUMBER_OF_BYTES_USED:
            {
                new count;
                BS_GetNumberOfBytesUsed(bs, count);
                return count;
            }
        case GET_NUMBER_OF_UNREAD_BITS:
            {
                new count;
                BS_GetNumberOfUnreadBits(bs, count);
                return count;
            }
        case GET_NUMBER_OF_BITS_ALLOCATED:
            {
                new count;
                BS_GetNumberOfBitsAllocated(bs, count);
                return count;
            }
        case WRITE_VALUE:
        {
            new placeholder = getarg(0, 4);
            if (placeholder > 0) 
            {
                BS_WriteValue(bs, getarg(0, 2), getarg(0, 3), placeholder);
            } 
            else 
            {
                BS_WriteValue(bs, getarg(0, 2), getarg(0, 3));
            }
            return true;
        }
        case READ_VALUE:
        {
			new ret;
	        new placeholder = getarg(0, 3);
            if (placeholder > 0) 
            {
                BS_ReadValue(bs, getarg(0, 2), ret, placeholder);
            } 
            else 
            {
                BS_ReadValue(bs, getarg(0, 2), ret);
            }
            return ret;		
        }
    }
    return false;
}

public OnIncomingPacket(playerid, packetid, BitStream:bs) {
	return SAMPNode_CallEvent("OnIncomingPacket", playerid, packetid, _:bs);
}

public OnIncomingRPC(playerid, rpcid, BitStream:bs) {
	return SAMPNode_CallEvent("OnIncomingRPC", playerid, rpcid, _:bs);
}

public OnOutgoingPacket(playerid, packetid, BitStream:bs) {
	return SAMPNode_CallEvent("OnOutgoingPacket", playerid, packetid, _:bs);
}

public OnOutgoingRPC(playerid, rpcid, BitStream:bs) {
	return SAMPNode_CallEvent("OnOutgoingRPC", playerid, rpcid, _:bs);
}

forward OnClientMessage(color, text[]);
public OnClientMessage(color, text[]) {
    return SAMPNode_CallEvent("OnClientMessageI18n", color, text, strlen(text));
}

forward OnNPCDisconnect(reason[]);
public OnNPCDisconnect(reason[]) {
    return SAMPNode_CallEvent("OnNPCDisconnectI18n", reason, strlen(reason));
}

public OnDialogResponse(playerid, dialogid, response, listitem, inputtext[]) {
    return SAMPNode_CallEvent("OnDialogResponseI18n", playerid, dialogid, response, listitem, inputtext, strlen(inputtext));
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