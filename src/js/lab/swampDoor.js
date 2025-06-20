import { Actor, CollisionType, Scene, Shape, Vector } from "excalibur";
import { Resources } from "../resources.js";
import { Player } from "../player.js";

export class SwampDoor extends Actor {
    constructor(engine) {
        super({ width: Resources.SwampDoor.width, height: Resources.SwampDoor.height, collisionType: CollisionType.Fixed })
    }

    onInitialize(engine) {
        this.graphics.use(Resources.SwampDoor.toSprite());
        this.pos = new Vector(300, 90);
        this.scale = new Vector(0.60, 0.60);

        this.on('collisionstart', (evt) => {
            if (evt.other.owner instanceof Player) {
                evt.other.owner.isNearDoor = true;
                evt.other.owner.doorTargetScene = 'moeras';
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