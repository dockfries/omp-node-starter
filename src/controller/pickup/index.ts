import { ColorEnum } from "@/enums/color";
import { DynamicPickup, DynamicPickupEvent } from "@infernus/core";

const cone = new DynamicPickup({
  modelId: 19135,
  type: 1,
  x: 1536.8569,
  y: -1688.5819,
  z: 13.5469,
  streamDistance: 20,
  worldId: 0,
  interiorId: 0,
});

DynamicPickupEvent.onPlayerPickUp(({ player, pickup }) => {
  if (pickup.id === cone.id) {
    player.sendClientMessage(
      ColorEnum.WhiteNumber,
      `You touched a cone, id: ${pickup.id}`
    );
  }
  return true;
});

export { cone };
