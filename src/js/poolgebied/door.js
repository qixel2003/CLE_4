import { Actor, CollisionType, Scene, Shape, Vector, Buttons} from "excalibur";
import { Resources } from "../resources.js";
import { Player } from "../player.js";

export class PoolDoor extends Actor {
    constructor(engine) {
        super({ width: Resources.PoolDoor.width, height: Resources.PoolDoor.height, collisionType: CollisionType.Passive })
        this.bijDeur;
        this.listenerAdded = false;

    }

    onInitialize(engine, event) {
        this.graphics.use(Resources.PoolDoor.toSprite());
        this.pos = new Vector(500, 450);
        this.scale = new Vector(0.60, 0.60);
        this.bijDeur = false;

        this.on("collisionstart", (evt) => {
            if (evt.other.owner instanceof Player) {
                this.bijDeur = true;
            }
        });

        this.on("collisionend", (evt) => {
            if (evt.other.owner instanceof Player) {
                this.bijDeur = false;
            }
        });

        engine.input.keyboard.on('press', (evt) => {
            if (evt.key === 'Enter' && this.bijDeur) {
                engine.goToScene('game');
                setTimeout(() => {
                    this.canUseDoor = true;
                }, 2000);
            }
        });

        // Only add the listener once
        if (!this.listenerAdded) {
            engine.input.keyboard.on('press', (evt) => {
                if (evt.key === 'Enter' && bijDeur) {
                    engine.goToScene('game'); 
                    setTimeout(() => {
                        this.canUseDoor = true;
                    }, 2000);
                }
            });
            this.listenerAdded = true;
        }
    }
    onPreUpdate(engine){
            const gamepad = engine.input.gamepads.at(0);
            if (gamepad.isButtonPressed(Buttons.Face3) && this.bijDeur) {
                engine.goToScene('game');
                setTimeout(() => {
                    this.canUseDoor = true;
                }, 2000);
            }
        }
}