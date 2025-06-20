import { Actor, CollisionType, Scene, Shape, Vector } from "excalibur";
import { Resources } from "../resources.js";
import { Player } from "../player.js";

export class SavanneDoor extends Actor {
    constructor(engine) {
        super({ width: Resources.SavanneDoor.width, height: Resources.SavanneDoor.height, collisionType: CollisionType.Passive })
    }

    onInitialize(engine) {
        this.graphics.use(Resources.SavanneDoor.toSprite());
        this.pos = new Vector(900, 90);
        this.scale = new Vector(1.25, 1.25);

        this.on('collisionstart', (evt) => {
            if (evt.other.owner instanceof Player) {
                evt.other.owner.isNearDoor = true;
                evt.other.owner.doorTargetScene = 'savanne';
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