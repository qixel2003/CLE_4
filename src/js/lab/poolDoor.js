import { Actor, CollisionType, Scene, Shape, Vector } from "excalibur";
import { Resources } from "../resources.js";
import { Player } from "../player.js";

export class PoolDoor extends Actor {
    constructor(engine) {
        super({ width: Resources.PoolDoor.width, height: Resources.PoolDoor.height, collisionType: CollisionType.Passive })
    }

    onInitialize(engine) {
        this.graphics.use(Resources.PoolDoor.toSprite());
        this.pos = new Vector(700, 90);
        this.scale = new Vector(1.25, 1.25);

        this.on('collisionstart', (evt) => {
            if (evt.other.owner instanceof Player) {
                evt.other.owner.isNearDoor = true;
                evt.other.owner.doorTargetScene = 'pool';
            }
        });
        this.on('collisionend', (evt) => {
            if (evt.other.owner instanceof Player) {
                evt.other.owner.isNearDoor = false;
                evt.other.owner.doorTargetScene = null;
            }
        });
    }
}