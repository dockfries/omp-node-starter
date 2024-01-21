/*
   https://github.com/katursis/Pawn.RakNet/issues/53
   This is a polyfill that is complex to write to make samp-node compatible to call raknet.
*/

new Float:float3[3];
new Float:float4[4];
new string[4096];
new string8[8];
new string32[32];

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
    GET_NUMBER_OF_BITS_ALLOCATED = 18
};

forward RakNetReadStringArray(index);
public RakNetReadStringArray(index)
{
	return string[index];
}

forward RakNetReadString8Array(index);
public RakNetReadString8Array(index)
{
	return string8[index];
}

forward RakNetReadString32Array(index);
public RakNetReadString32Array(index)
{
	return string32[index];
}

forward Float:RakNetReadFloat3Array(index);
public Float:RakNetReadFloat3Array(index)
{
	return float3[index];
}

forward Float:RakNetReadFloat4Array(index);
public Float:RakNetReadFloat4Array(index)
{
	return float4[index];
}


forward RakNetReadInt(BitStream:bs, type);
public RakNetReadInt(BitStream:bs, type)
{
	new ret;
	BS_ReadValue(bs, type, ret);
	return ret;
}

forward RakNetReadBits(BitStream:bs, len);
public RakNetReadBits(BitStream:bs, len)
{
	new ret;
	BS_ReadBits(bs, ret, len);
	return ret;
}

forward Float:RakNetReadFloat(BitStream:bs);
public Float:RakNetReadFloat(BitStream:bs)
{
	new Float:ret;
	BS_ReadFloat(bs, ret);
	return ret;
}


forward Float:RakNetReadCompressedFloat(BitStream:bs);
public Float:RakNetReadCompressedFloat(BitStream:bs)
{
	new Float:ret;
	BS_ReadCompressedFloat(bs, ret);
	return ret;
}

forward RakNetReadFloat3(BitStream:bs);
public RakNetReadFloat3(BitStream:bs)
{
	BS_ReadFloat3(bs, float3);
}

forward RakNetReadFloat4(BitStream:bs);
public RakNetReadFloat4(BitStream:bs)
{
	BS_ReadFloat4(bs, float4);
}

forward RakNetReadVector(BitStream:bs);
public RakNetReadVector(BitStream:bs)
{
	BS_ReadVector(bs, float3);
}

forward RakNetReadNormQuat(BitStream:bs);
public RakNetReadNormQuat(BitStream:bs)
{
	BS_ReadNormQuat(bs, float4);
}

forward RakNetReadString8(BitStream:bs);
public RakNetReadString8(BitStream:bs)
{
	for(new i = 0; i < sizeof string8; i++) {
		if(string8[i] == 0) break;
		string8[i] = 0;
	}
	BS_ReadString8(bs, string8);
}

forward RakNetReadString32(BitStream:bs);
public RakNetReadString32(BitStream:bs)
{
	for(new i = 0; i < sizeof string32; i++) {
		if(string32[i] == 0) break;
		string32[i] = 0;
	}
	BS_ReadString32(bs, string32);
}

forward RakNetReadString(BitStream:bs, length);
public RakNetReadString(BitStream:bs,length)
{
	for(new i = 0; i < sizeof string; i++) {
		if(string[i] == 0) break;
		string[i] = 0;
	}
	BS_ReadString(bs, string, length);
}

forward RakNetReadCompressedString(BitStream:bs, length);
public RakNetReadCompressedString(BitStream:bs, length)
{
	for(new i = 0; i < sizeof string; i++) {
		if(string[i] == 0) break;
		string[i] = 0;
	}
	BS_ReadCompressedString(bs, string, length);
}

// write

forward RakNetWriteInt(BitStream:bs, type, value);
public RakNetWriteInt(BitStream:bs, type, value)
{
	return BS_WriteValue(bs, type, value);
}

forward RakNetWriteFloat(BitStream:bs, Float:value);
public RakNetWriteFloat(BitStream:bs, Float:value)
{
	return BS_WriteFloat(bs, value);
}

forward RakNetWriteCompressedFloat(BitStream:bs, Float:value);
public RakNetWriteCompressedFloat(BitStream:bs, Float:value)
{
	return BS_WriteCompressedFloat(bs, value);
}

forward RakNetWriteBits(BitStream:bs, value, len);
public RakNetWriteBits(BitStream:bs, value, len)
{
	return BS_WriteBits(bs, value, len);
}

forward RakNetWriteFloat3(BitStream:bs, Float:array[3]);
public RakNetWriteFloat3(BitStream:bs, Float:array[3])
{
	return BS_WriteFloat3(bs, array);
}

forward RakNetWriteVector(BitStream:bs, Float:array[3]);
public RakNetWriteVector(BitStream:bs, Float:array[3])
{
	return BS_WriteVector(bs, array);
}

forward RakNetWriteFloat4(BitStream:bs, Float:array[4]);
public RakNetWriteFloat4(BitStream:bs, Float:array[4])
{
	return BS_WriteFloat4(bs, array);
}

forward RakNetWriteNormQuat(BitStream:bs, Float:array[4]);
public RakNetWriteNormQuat(BitStream:bs, Float:array[4])
{
	return BS_WriteNormQuat(bs, array);
}

forward RakNetWriteString8(BitStream:bs, array[8]);
public RakNetWriteString8(BitStream:bs, array[8])
{
	return BS_WriteString8(bs, array);
}

forward RakNetWriteString32(BitStream:bs, array[32]);
public RakNetWriteString32(BitStream:bs, array[32])
{
	return BS_WriteString32(bs, array);
}

forward RakNetWriteString(BitStream:bs, array[]);
public RakNetWriteString(BitStream:bs, array[])
{
	return BS_WriteString(bs, array);
}

forward RakNetWriteCompressedString(BitStream:bs, array[]);
public RakNetWriteCompressedString(BitStream:bs, array[])
{
	return BS_WriteCompressedString(bs, array);
}

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
