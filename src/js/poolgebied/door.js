import { Actor, CollisionType, Scene, Shape, Vector } from "excalibur";
import { Resources } from "../resources.js";
import { Player } from "../player.js";

export class PoolDoor extends Actor {
    constructor(engine) {
        super({ width: Resources.TropenDoor.width, height: Resources.TropenDoor.height, collisionType: CollisionType.Passive })
    }

    onInitialize(engine, event) {
        this.graphics.use(Resources.TropenDoor.toSprite());
        this.pos = new Vector(500, 450);
        this.scale = new Vector(0.87, 0.87);

        let bijDeur = false;

        this.on("collisionstart", (evt) => {
            if (evt.other.owner instanceof Player) {
                bijDeur = true;
            }
        });

        this.on("collisionend", (evt) => {
            if (evt.other.owner instanceof Player) {
                bijDeur = false;
            }
        });

        engine.input.keyboard.on('press', (evt) => {
            if (evt.key === 'Enter' && bijDeur) {
                engine.goToScene('game');
                setTimeout(() => {
                    this.canUseDoor = true;
                }, 2000);
            }
        });
    }
}